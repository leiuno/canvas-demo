var canvas = document.getElementById('canvas');
var eraser = document.getElementById('eraser');
var context = canvas.getContext('2d');
pageSize()
window.onresize = function(){   //监听用户页面宽高
  pageSize()
}
function pageSize(){
  var pageWidth = document.documentElement.clientWidth;//获取页面宽度
  var pageHeight = document.documentElement.clientHeight;
  canvas.width = pageWidth;
  canvas.height = pageHeight;
}
listenToUser(canvas)
/*
function drawCircle(x,y,radius){
  context.beginPath();
  context.arc(x,y,radius,0,Math.PI*2); // 绘制
  context.fill();
}
*/
function listenToUser(canvas){
  var using = false;
  var lastPoint = {'x':undefined,'y':undefined};
  if(canvas.ontouchstart !== undefined){
    canvas.ontouchstart = function(e){
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      using = true;
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10);
      }else{
        lastPoint = {'x':x,'y':y};    
      }
    }
    canvas.ontouchmove = function(e){
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      if(!using){return}
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10);
      }else{
        var newPoint = {'x':x,'y':y};
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint = newPoint;
      }
    }
    canvas.ontouchend = function(e){
      using = false;
    }
  }else{
    canvas.onmousedown = function(e){
      var x = e.clientX;
      var y = e.clientY;
      using = true;
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10);
      }else{
        lastPoint = {'x':x,'y':y};    
      }
    }
    canvas.onmousemove = function(e){
      var x = e.clientX;
      var y = e.clientY;
      if(!using){return}
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10);
      }else{
        var newPoint = {'x':x,'y':y};
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint = newPoint;
      }
    }
    canvas.onmouseup = function(e){
      using = false;
    }
  }
}


function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.lineWidth = 4;
  context.stroke();
  context.closePath();
}

var eraserEnabled = false;
eraser.onclick = function(){
  eraserEnabled = true;
  actions.className = 'actions x';
}
brush.onclick = function(){
  eraserEnabled = false;
  actions.className = 'actions';
}
clear.onclick = function(){
  context.clearRect(0,0,canvas.width,canvas.height);
}







