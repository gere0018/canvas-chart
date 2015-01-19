//Declare my global variables
var canvas, context;
var data;
var total = 0;
var percentage;
var Value;
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
     Value = data.segments;
 }
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
  context.restore();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.restore;
  var cx = (canvas.width/2) - 40;
  var cy = canvas.height/2 ;
  var radius = 110;
  var currentAngle = 0;
  for(var i=0; i<Value.length; i++){
    percentage = Value[i].value/total;
    var color = Value[i].color;
    var endAngle = currentAngle + (percentage * (Math.PI * 2));
    context.moveTo(cx, cy);
    context.beginPath();
    context.fillStyle = color;
    context.arc(cx, cy, radius, currentAngle, endAngle, false);
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
//restoring the original context to clear the transformations i made.
  context.restore();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  for(var i=0;i<Value.length; i++){
      var x = 2 + Math.round(Value[i].value);
      var y = 6 * x +50;
      var color = Value[i].color;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(6*x, y/10);
      context.moveTo(6*x, y/10);
      context.lineTo(8*x, y);
      context.moveTo(8*x, y);
      context.lineTo(x, y);
      context.moveTo(x, y);
      context.lineTo(x, y+20);
      context.moveTo(x, y+20);
      context.lineTo(8*x, y+20);
      context.moveTo(8*x, y+20);
      context.lineTo(8*x, y);
      context.lineWidth = 4;
      context.strokeStyle = color;
      context.stroke();
      var text = Value[i].label;
      if(text=="Stilton"){
          context.font = '6pt Georgia';
      }else{
        context.font = '11pt Georgia';
      }
        context.fillStyle = 'black';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.fillText(text,x+5, y+15);
      switch (i) {
    case 0:
        context.translate(x/2, y/9);
        break;
    case 1:
        context.translate(x/4, y/10);
        break;
    case 2:
        context.translate(x + 30, y/8-10);
        break;
    case 3:
        context.translate(x/8-20, y/10 -30);
        break;
    case 4:
        context.translate(x+140, y+8);
        break;
    case 5:
        context.translate(x/4, y/10);
        break;


    }

  }

}

function addButtonListeners(){
     document.querySelector("#btnPie").addEventListener("click", showPie);
    document.querySelector("#btnSpecs").addEventListener("click", showSpecs);
}











