window.onload = function() {

  const canvas=document.getElementById('canvas');
  var mouseDown = false;
  var mousePos = [0, 0];
  const DRAW_POS = [canvas.width/2, canvas.height/2];
  var drawPos = DRAW_POS;
  canvas.addEventListener("mousewheel", zoom, false);
	canvas.addEventListener("mousedown", setMouseDown, false);
	canvas.addEventListener("mouseup", setMouseUp, false);
	canvas.addEventListener("mousemove", move, false);

  document.getElementById("zoomIn").addEventListener("click", function( event ) {
      //grow canvas
      zoomIn();
      sketch();
  });

  document.getElementById("zoomOut").addEventListener("click", function( event ) {
      //shrink canvas
      zoomOut();
      sketch();
  });

  document.getElementById("generate").addEventListener("click", function( event ) {
      //new tree
      let num=document.getElementById("items").firstElementChild.value;
      //console.log(num);
      generate(num, num);
  });
  document.getElementById("add").addEventListener("click", function( event ) {
      //add
      let num=document.getElementById("items").firstElementChild.value;
      add(num);
  });
  document.getElementById("delete").addEventListener("click", function( event ) {
      //delete item
      let num=document.getElementById("items").firstElementChild.value;
      cut(num);
  });
  function zoomIn(){
    canvas.height*=1.1;
    canvas.width*=1.25;
  }
  function zoomOut(){
    canvas.height*=0.95;
    canvas.width*=0.75;
  }
  // Toggle mouse status
			function setMouseDown(e) {
				mouseDown = true;
				mousePos = [e.x, e.y];
			}
			function setMouseUp(e) {
				mouseDown = false;
			}
      // Move
			function move(e) {
				if (mouseDown) {
					var dX = 0, dY = 0;
					var delta = [e.x - mousePos[0], e.y - mousePos[1]];
					mousePos = [e.x, e.y];
					//set window position
          //console.log(delta[0]+":"+delta[1]);
          document.getElementById("container").scrollLeft -=delta[0];
          document.getElementById("container").scrollTop -=delta[1];
				}
			}
      function zoom(e) {
				if (e.wheelDelta > 0) {
					zoomIn();
          sketch();
				}
				else {
					zoomOut();
          sketch();
				}
			}

}
