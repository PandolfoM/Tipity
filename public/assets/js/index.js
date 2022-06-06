$(document).ready(function () {
  let serviceVal = $("input[type='radio']:checked").val();
  $(".servicePercent").html(serviceVal);

  $(".billTotalInput").on("input", function () {
    getValues()
  });
});

function getValues() {
  let billInput = $(".billTotalInput").val();
  let serviceVal = $("input[type='radio']:checked").val();
  let getTipTotal = serviceVal * billInput;
  let getTotal = `1.${serviceVal}` * billInput;
  $(".totalTip").html(insertDecimal(getTipTotal));
  $(".totalAmtSpan").html(getTotal.toFixed(2));
  $(".servicePercent").html(serviceVal);
}

function insertDecimal(num) {
  return (num / 100).toFixed(2);
}
