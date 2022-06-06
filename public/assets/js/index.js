$(document).ready(function() {
  $(".billTotalInput").on("input",function(){
    let billInput = $('.billTotalInput').val()
    let serviceVal = $("input[type='radio']:checked").val()
    console.log(serviceVal);
    $(".totalAmtSpan").text(billInput)
  })
})