var canvas, context;
var total = 0;
var percentage;

document.addEventListener("DOMContentLoaded", function(){
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
    showPie(data.segments);

});

request.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});

});

function showPie(values){
  console.log(values);
  canvas = document.querySelector("#myCanvas");
  context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  var cx = (canvas.width/2) - 40;
  var cy = canvas.height/2 ;
  var radius = 110;
  var currentAngle = 0;
  for(var i=0; i<values.length; i++){
    percentage = values[i].value/total;
    var color = values[i].color;
    var endAngle = currentAngle + (percentage * (Math.PI * 2));
    context.moveTo(cx, cy);
    context.beginPath();
    context.fillStyle = color;
    context.arc(cx, cy, radius, currentAngle, endAngle, false);
    context.lineTo(cx, cy);
    context.fill();
    //Now draw the lines that will point to the values
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
    var text = values[i].label;
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
function showSpecs(values){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.moveTo(10, 40);
  context.lineTo(60, 3);
  context.moveTo(60, 3);
  context.lineTo(80, 40);
  context.moveTo(80, 40);
  context.lineTo(10, 40);
  context.stroke();
}



function addButtonListeners(){
     document.querySelector("#btnPie").addEventListener("click", showPie);
    document.querySelector("#btnSpecs").addEventListener("click", showSpecs);
}











