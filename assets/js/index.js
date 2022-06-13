$(document).ready(function () {
  $(".servicePercent").html("5");
  $(".splitAmt").html("1");

  $(".billTotalInput")
    .on("blur change input", function () {
      $(this).val(function (i, input) {
        input = input.replace(/\D/g, "");
        return (input / 100).toFixed(2);
      });
    })
    .trigger("blur");

  $(".billTotalInput").on("input", function () {
    getValues($("#roundUpSwitch").is(":checked"));
  });

  $(".serviceRadio").change(function () {
    getValues($("#roundUpSwitch").is(":checked"));
  });

  $(".splitRadio").change(function () {
    getValues($("#roundUpSwitch").is(":checked"));
  });

  $(".roundUpSwitch").change(function () {
    getValues($("#roundUpSwitch").is(":checked"));
  });
});

function getValues(round) {
  let serviceVal = $(".serviceRadio > input[type='radio']:checked").val();
  let splitVal = $(".splitRadio > input[type='radio']:checked").val();
  let billInput = $(".billTotalInput").val();
  let getTipTotal = serviceVal * billInput;
  let getTotal = `1.${serviceVal}` * billInput;

  if (round) {
    let total = roundUp(getTotal).toFixed(2);
    let totalTip = roundUp(getTipTotal / 100).toFixed(2);
    $(".totalTip").html(totalTip);
    $(".tipPer").html((totalTip / splitVal).toFixed(2));
    $(".totalPer").html((total / splitVal).toFixed(2));
    $(".totalAmtSpan").html(total);
    $(".perWithoutTip > span").html((billInput / splitVal).toFixed(2));
  } else {
    let total = getTotal.toFixed(2);
    let totalTip = (getTipTotal / 100).toFixed(2);
    $(".totalTip").html(totalTip);
    $(".tipPer").html((totalTip / splitVal).toFixed(2));
    $(".totalPer").html((total / splitVal).toFixed(2));
    $(".totalAmtSpan").html(total);
    $(".perWithoutTip > span").html((billInput / splitVal).toFixed(2));
  }

  $(".splitAmt").html(splitVal);
  if (serviceVal == "05") {
    $(".servicePercent").html("5");
  } else {
    $(".servicePercent").html(serviceVal);
  }
}

function clearInputs() {
  $(".totalTip").html("0.00");
  $(".totalPer").html("0.00");
  $(".tipPer").html("0.00");
  $(".totalAmtSpan").html("0.00");
  $(".perWithoutTip > span").html("0.00");
  $(".billTotalInput").val("0.00");
  $(".servicePercent").html("5");
  $("input[type=radio]").prop("checked", function () {
    return this.getAttribute("checked") == "checked";
  });
}

function roundUp(num) {
  return Math.ceil(num);
}
