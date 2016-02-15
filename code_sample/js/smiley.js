function drawShape(){
  var canvas = document.getElementById('smiley');
  var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(100,100,100,0,Math.PI*2,true); // Outer circle
    ctx.moveTo(150,110);
    ctx.arc(100,110,50,0,Math.PI,false);   // Mouth
    ctx.moveTo(70,65);
    ctx.arc(60,65,10,0,Math.PI*2,true);  // Left eye
    ctx.moveTo(150,65);
    ctx.arc(140,65,10,0,Math.PI*2,true);  // Right eye
    ctx.stroke();
}