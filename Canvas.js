window.onload = function() {

    /*Set Canvas default size*/
    var w = window.innerWidth;
    var h = window.innerHeight;
  
      document.getElementById("myCanvas").setAttribute("width", w*0.9);
      document.getElementById("myCanvas").setAttribute("height", h*0.80);
  
    /*Canvas resize function*/
    function resizeCanvas() {
      document.getElementById("myCanvas").getAttributeNode("width").value = w*0.9;
      document.getElementById("myCanvas").getAttributeNode("height").value = h*0.85;
    }
  
    window.addEventListener("resize", resizeCanvas);
  
    /*Drawwing on Canvas*/
    ctx = document.getElementById("myCanvas").getContext("2d");
  
    var paint;
  
    var posXY = [];
  
    var radius = 2;
    var color = "#401f58";
  
    function DrawPoints(e) {
  
      x = e.pageX - document.getElementById("myCanvas").offsetLeft;
      y = e.pageY - document.getElementById("myCanvas").offsetTop;
  
      posXY.push({x: x, y: y});
  
      ctx.beginPath();
      ctx.arc(x, y, radius, Math.PI*2, false);
  
      ctx.fillStyle = color;
      ctx.fill();
    }
  
    document.getElementById("myCanvas").addEventListener("mousedown", function(e){
      paint = true;
      DrawPoints(e);
    });
  
    document.getElementById("myCanvas").addEventListener("mousemove", function(e){
      if(paint) {
        DrawPoints(e);
        ctx.lineWidth = 2*radius;
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.lineJoin = ctx.lineCap = "round";
  
        ctx.beginPath();
        ctx.moveTo(posXY[0].x, posXY[0].y);
  
        for(i=1; i<posXY.length; i++){
          ctx.lineTo(posXY[i].x, posXY[i].y);
        }
        ctx.stroke();
      }
    });
  
    document.getElementById("myCanvas").addEventListener("mouseup", function(){
      paint = false;
      posXY = [];
    });
  
    document.getElementById("myCanvas").addEventListener("mouseout", function(){
     paint = false;
     posXY = [];
    });
  
  /*touch support*/
  function touchDraw(e) {
    x = e.touches[0].pageX - document.getElementById("myCanvas").offsetLeft;
    y = e.touches[0].pageY - document.getElementById("myCanvas").offsetTop;
  
    posXY.push({x: x, y: y});
  
    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI*2, false);
  
    ctx.fillStyle = color;
    ctx.fill();
  
    e.preventDefault();
  }
  
  
  document.getElementById("myCanvas").addEventListener("touchstart", function(e){
    paint = true;
    touchDraw(e);
  });
  
  document.getElementById("myCanvas").addEventListener("touchmove", function(e){
    if(paint) {
      touchDraw(e);
      ctx.lineWidth = 2*radius;
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.lineJoin = ctx.lineCap = "round";
  
      ctx.beginPath();
      ctx.moveTo(posXY[0].x, posXY[0].y);
  
      for(i=1; i<posXY.length; i++){
        ctx.lineTo(posXY[i].x, posXY[i].y);
      }
      ctx.stroke();
    }
  });
  
  document.getElementById("myCanvas").addEventListener("touchend", function(){
    paint = false;
    posXY = [];
  });
  
  document.getElementById("myCanvas").addEventListener("touchend", function(){
   paint = false;
   posXY = [];
  });
  
  
  /*Gooey button*/
  function animClear() {
      document.getElementById("one").classList.add("left");
      document.getElementById("two").classList.add("right");
  
    var clear = false;
  
    setTimeout(function(){
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      var clear = true;
  
      if(clear) {
        document.getElementById("one").classList.remove("left");
        document.getElementById("two").classList.remove("right");
      }
    }, 1800);
  }
  
  document.getElementById("one").addEventListener("click", animClear, false);
  
  }