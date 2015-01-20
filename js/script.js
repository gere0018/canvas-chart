//Declare my global variables
var canvas, context;
var data;
var total = 0;
var percentage;
var Value;
var color;
//upon loading document, make Ajax call to retrieve data and add event listener to buttons.
document.addEventListener("DOMContentLoaded", function () {

  addButtonListeners();

 var request = $.ajax({
  url: "js/cheese.json",
  type: "GET",
  dataType: "json"
});

request.done(function(data){
  console.log(data);
    for(var i=0; i<data.segments.length; i++){
     total +=  data.segments[i].value;
    }
     Value = data.segments;
    //Pie chart will show upon the load of the document.
    showPie();


});

request.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});

});

function showPie(){
  canvas = document.querySelector("#myCanvas");
  context = canvas.getContext("2d");
    //clear canvas if there is any previous inputs.
  context.clearRect(0, 0, canvas.width, canvas.height);
   var cx = (canvas.width/2) - 40;
   var cy = canvas.height/2 ;
   var radius = 110;
   var currentAngle = 0;
   var maxValue = Value[0].value;
   var minValue = Value[0].value;
   for(var i=0; i<Value.length; i++){
      if(maxValue < Value[i].value){
        maxValue = Value[i].value;
      }
      if(minValue > Value[i].value){
        minValue = Value[i].value;
      }
   }

  for(var i=0; i<Value.length; i++){
    percentage = Value[i].value/total;
    color = Value[i].color;
    var endAngle = currentAngle + (percentage * (Math.PI * 2));
    context.moveTo(cx, cy);
    context.beginPath();
    context.fillStyle = color;
      if(Value[i].value == maxValue){
        context.arc(cx, cy, radius*90/100, currentAngle, endAngle, false);
      }else if(Value[i].value == minValue){
        context.arc(cx, cy, radius*110/100, currentAngle, endAngle, false);
      }else{
        context.arc(cx, cy, radius, currentAngle, endAngle, false);
      }

    context.lineTo(cx, cy);
    context.fill();
    //The lines that will point to the values
    context.save();
    context.translate(cx, cy);
    context.strokeStyle = "#000";
    context.lineWidth = 1.5;
    context.beginPath();
    var midAngle = (currentAngle + endAngle)/2;
    context.moveTo(0,0);//this value is to start at the middle of the circle
    //to start further out...
    var dx = Math.cos(midAngle) * (0.5 * radius);
    var dy = Math.sin(midAngle) * (0.5 * radius);
    context.moveTo(dx, dy);
    //ending points for the lines
    var dx = Math.cos(midAngle) * (radius + 20);
    var dy = Math.sin(midAngle) * (radius + 20);
    context.lineTo(dx, dy);
    context.stroke();
    var text = Value[i].label;
    context.font = '12pt Georgia';
    context.fillStyle = 'black';
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    if(text == "Gouda"){
     context.fillText(text, dx - 25, dy - 10);
    }else{
      context.fillText(text, dx + 5, dy + 5);
    }

    //put the canvas back to the original position
    context.restore();
    //update the currentAngle
    currentAngle = endAngle;
  }
}
function showSpecs(){
    var sortedValue = Value.slice();
  sortedValue.sort(function (a, b) {
          if (a.value < b.value) {
            return 1;
          }
          if (a.value > b.value) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
    console.log(sortedValue);
//restoring the original context to clear the transformations i made.
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(var i=0;i<sortedValue.length; i++){
      var x = 2 + Math.round(sortedValue[i].value);
      var y = 6 * x +50;
      color = sortedValue[i].color;
      //draw the triangle for each of the cheese items
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(6*x, y/10);
      context.lineTo(8*x, y);
      context.lineTo(x, y);
      context.closePath();
      context.fillStyle = color;
      context.fill();
      //draw additional rectangle at the bottom.
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x, y+20);
      context.lineTo(8*x, y+20);
      context.lineTo(8*x, y);
      context.closePath();
      context.lineWidth = 2;
      context.fillStyle = "cyan";
      context.fill();
      // add text cheese name inside rectangle
      var text = sortedValue[i].label;
      if(text=="Stilton"){
          context.font = '6pt Georgia';
      }else{
        context.font = '11pt Georgia';
      }
        context.fillStyle = 'black';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.fillText(text,x+5, y+15);

  }
}

function addButtonListeners(){
 document.querySelector("#btnPie").addEventListener("click", showPie);
    document.querySelector("#btnSpecs").addEventListener("click", showSpecs);
}











