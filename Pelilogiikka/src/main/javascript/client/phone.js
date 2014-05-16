
            //http://bravenewmethod.com/2011/08/28/html5-canvas-layout-and-mobile-devices/

      /*      function doClick(event) {

                var x = event.x;
                var y = event.y;

                var canvas = document.getElementById("canvas");
                canvas_width = canvas.width;
                canvas_height = canvas.height;

                x -= canvas.offsetLeft;
                y -= canvas.offsetTop;
                alert("X=" + x + " Y=" + y + "\ncanvas width: " + canvas_width
                        + "\ncanvas height: " + canvas_height);
                
           /*     clientComs.send({
                    xCoordinate: x, 
                    yCoordinate: y,
                    width: canvas_width,
                    height: canvas_height
                    
                });
//                clientComs.send("X=" + x + " Y=" + y + "\ncanvas width: " + canvas_width
//                        + "\ncanvas height: " + canvas_height);

                /*	event.preventDefault();
                 canvas_x = event.targetTouches[0].pageX;
                 canvas_y = event.targetTouches[0].pageY;
                 var canvas = document.getElementById("canvas");
                 canvas_width = canvas.width;
                 canvas_height = canvas.height;
                 alert("X=" + canvas_x + " Y=" + canvas_y + "\ncanvas width: " + canvas_width
                 + " canvas height: " + canvas_height);
            }*/
		
		
		function getFingerCoords(id) {
			var canvas_x = event.targetTouches[id].pageX;
 			var canvas_y = event.targetTouches[id].pageY;
			return [canvas_x, canvas_y];
		}

		function getRelativeCoords(id){
			var coords = getFingerCoords(id);
			var canvasDimensions = getCanvasDimensions();
			var relativeX = coords[0] / canvasDimensions[0];
			var relativeY = coords[1] / canvasDimensions[1];
			return [relativeX, relativeY];
		}	
		
		//Test code
		function updateCoordinatesText(x, y){
			var canvasDimensions = getCanvasDimensions();		
	
			drawText("Coordinates: (" + x + ", " + y + ")", 2);
			drawText("Canvas width: " + canvasDimensions[0] + "\nCanvas height: " + canvasDimensions[1], 3);
		}

		//Test code
		function updateStartTimeText(time) {
			drawText("Start time: " + time, 4);
		}

		//Test code
		function updateCurrentTimeText(time) {
			drawText("Current time: " + time, 5);
		}
		
		//Test code
		function updateStartCoordinatesText(x, y){
			var canvasDimensions = getCanvasDimensions();		
	
			drawText("Start coordinates: (" + x + ", " + y + ")", 6);
		}
		
		//Test code
		function updateSendTimeText(time){
			drawText("Sent time: " + time, 7);
		}

		//Test code
		var texts = new Array();
		function drawText(text, id){
			var canvasDimensions = getCanvasDimensions();

			drawBackground();

			ctx.fillStyle = 'white';
                   	ctx.textAlign = 'center';
			
			texts[id] = text;

			var offset = 0;

			texts.forEach(function(entry) {
    				ctx.fillText(entry, canvasDimensions[0] / 2, canvasDimensions[1] / 2 + offset);
				offset += 10;
			});
			
		}

		function drawBackground(){
			ctx.fillStyle = 'green';
		        ctx.fillRect(0, 0, width, height);
		        ctx.fillStyle = 'black';
		        ctx.fillRect(10, 10, width - 20, height - 20);
		}

		function getCanvasDimensions() {
			canvas = document.getElementById("canvas");
			ctx = canvas.getContext("2d");
			width = canvas.width;
			height = canvas.height;

			return [width, height];
		}



            $(function() { // document ready, resize container
		var canvas = initCanvas();

                var ctx = canvas.getContext("2d");

                var rc = 0;  // resize counter
                var oc = 0;  // orientiation counter
                var ios = navigator.userAgent.match(/(iPhone)|(iPod)/); // is iPhone


                /* function hideAddressBar(){
                 if(document.documentElement.scrollHeight<window.outerHeight/window.devicePixelRatio)
                 document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
                 setTimeout(window.scrollTo(1,1),0);
                 }
                 window.addEventListener("load",function(){hideAddressBar();});
                 window.addEventListener("scroll",function(){hideAddressBar();});
                 window.addEventListener("orientationchange",function(){hideAddressBar();}); */


                function orientationChange() {
                    // inc orientation counter
                    oc++;
                }
                function resizeCanvas() {
			// inc resize counter
			rc++;

			if (ios) {
			// increase height to get rid off ios address bar
			$("#container").height($(window).height() + 60)
			}

			var width = $("#container").width();
			var height = $("#container").height();

			cheight = height
			cwidth = width;

			// set canvas width and height
			$("#canvas").attr('width', cwidth);
			$("#canvas").attr('height', cheight);

			// hides the WebKit url bar
			if (ios) {
			setTimeout(function() {
			    window.scrollTo(0, 1);
			}, 100);
			}
			
			drawText('Orientiation changes: ' + oc, 0);
			drawText('Resize events: ' + rc, 1);
                }

                // Install resize and orientation change handlers. Note Android may fire both
                // resize and orientation changes when rotating.
                var resizeTimeout;
                $(window).resize(function() {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(resizeCanvas, 100);
                });
                resizeCanvas();

                var otimeout;
                window.onorientationchange = function() {
                    clearTimeout(otimeout);
                    otimeout = setTimeout(orientationChange, 50);
                }
            });
