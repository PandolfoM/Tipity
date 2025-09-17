import TextRecognition from "react-native-text-recognition";
import * as FileSystem from "expo-file-system";

export async function extractTotal(
  image_url: string,
  aiExtractTotal: boolean
): Promise<string | null> {
  console.log(aiExtractTotal);
  console.log(image_url);

  if (aiExtractTotal) {
    return await chatgptExtract(image_url);
  } else {
    return await extractBillTotalWithNativeOCR(image_url);
  }
}

async function chatgptExtract(image_url: string): Promise<string | null> {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  image_url = await convertImageToBase64(image_url);

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Extract the total after taxes but before the tip from this receipt image and return just the number:",
            },
            {
              type: "input_image",
              image_url: `data:image/jpeg;base64,${image_url}`,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();
  const content = data.output[0].content[0].text;
  if (content) {
    return content;
  }

  return null;
}

const extractBillTotalWithNativeOCR = async (
  imageUri: string
): Promise<string | null> => {
  try {
    const detectedText = await TextRecognition.recognize(imageUri);

    const validLines = getValidLinesBeforeTipSection(detectedText);

    const likelyTotal = findLikelyTotal(validLines);
    if (likelyTotal !== null) return likelyTotal.toFixed(2);

    const allAmounts = extractAmountsFromLines(validLines);
    if (allAmounts.length === 0) return null;

    const highest = Math.max(...allAmounts);
    return highest.toFixed(2);
  } catch (error) {
    console.error("Error with Native OCR:", error);
    return null;
  }
};

const getValidLinesBeforeTipSection = (lines: string[]): string[] => {
  const tipTriggerRegex =
    /(suggest(ed)? (tip|gratuity))|tip amount|gratuity amount|tip recommended|service charge|\b\d{1,2}%/i;

  const validLines: string[] = [];
  for (const line of lines) {
    if (tipTriggerRegex.test(line)) break;
    if (line.includes("%")) continue;

    validLines.push(line);
  }

  return validLines;
};

const extractAmountsFromLines = (lines: string[]): number[] => {
  const amountRegex = /\$?\s?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})/g;

  return lines.flatMap((line) => {
    const matches = line.match(amountRegex) || [];
    return matches.map((m) => parseFloat(m.replace(/[^0-9.]/g, "")));
  });
};

const findLikelyTotal = (lines: string[]): number | null => {
  const totalKeywords = /total|amount due|balance due/i;

  // Check lines from bottom-up, assuming total is near the bottom
  for (const line of [...lines].reverse()) {
    if (totalKeywords.test(line) && !line.includes("%")) {
      const match = line.match(/\$?\s?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})/);
      if (match) {
        return parseFloat(match[0].replace(/[^0-9.]/g, ""));
      }
    }
  }

  return null;
};

async function convertImageToBase64(uri: string): Promise<string> {
  return await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
}
