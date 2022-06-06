$(document).ready(function () {
  $(".servicePercent").html("5");

  $(".billTotalInput").on("input", function () {
    getValues($("#roundUpSwitch").is(':checked'));
  });

  $(".serviceRadio").change(function () { 
    getValues($("#roundUpSwitch").is(':checked'));
  });

  $(".roundUpSwitch").change(function () { 
    getValues($("#roundUpSwitch").is(':checked'));
  });
});

function getValues(round) {
  let serviceVal = $("input[type='radio']:checked").val();
  let billInput = $(".billTotalInput").val();
  if (round) {
    let getTipTotal = serviceVal * billInput;
    let getTotal = `1.${serviceVal}` * billInput;
    $(".totalTip").html(roundUp(getTipTotal / 100).toFixed(2));
    $(".totalAmtSpan").html(roundUp(getTotal.toFixed(2)));
  } else {
    let getTipTotal = serviceVal * billInput;
    let getTotal = `1.${serviceVal}` * billInput;
    $(".totalTip").html((getTipTotal / 100).toFixed(2));
    $(".totalAmtSpan").html(getTotal.toFixed(2));
  }
  if (serviceVal == "05") {
    $(".servicePercent").html("5");
  } else {
    $(".servicePercent").html(serviceVal);
  }
}

function clearInputs() {
  $(".totalTip").html("0.00");
  $(".totalAmtSpan").html("0.00");
  $(".billTotalInput").val("");
  $(".servicePercent").html("5");
  $("input[type=radio]").prop("checked", function () {
    return this.getAttribute("checked") == "checked";
  });
}

function roundUp(num) {
  return Math.ceil(num)
}