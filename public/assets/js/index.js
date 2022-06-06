$(document).ready(function() {
  $(".billTotalInput").on("input",function(){
    let billInput = $('.billTotalInput').val()
    let serviceVal = $("input[type='radio']:checked").val()
    let getTotal = serviceVal*billInput
    $(".totalAmtSpan").html(insertDecimal(getTotal))
  })
})

function insertDecimal(num) {
  return (num / 100).toFixed(2);
}