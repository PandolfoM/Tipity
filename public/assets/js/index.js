$(document).ready(function () {
  $(".servicePercent").html("5");

  $(".billTotalInput").on("input", function () {
    getValues();
  });
});

function getValues() {
  let billInput = $(".billTotalInput").val();
  let serviceVal = $("input[type='radio']:checked").val();
  let getTipTotal = serviceVal * billInput;
  let getTotal = `1.${serviceVal}` * billInput;
  $(".totalTip").html((getTipTotal / 100).toFixed(2));
  $(".totalAmtSpan").html(getTotal.toFixed(2));
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
