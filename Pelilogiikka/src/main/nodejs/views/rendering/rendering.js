
var keyMap = {};

function kbDown_Event (event)
{
    keyMap[event.keyCode] = true;
}
;

function kbUp_Event (event)
{
    keyMap[event.keyCode] = false;
}
;

function key_Down (keyCode)
{
    return keyMap[ keyCode ];
}

function register_Inputs ()
{
    document.onkeydown = kbDown_Event;
    document.onkeyup = kbUp_Event;
}


var testCamera  = null;

var testShader  = null;
var testTexture = null;
var testBatch   = null;

var spriteShader = null;
var testSprite   = null;
var spriteTex    = null;

var guiShader    = null;
var testGui      = null;
var guiTex       = null;


var guiItem      = null;
var testActor    = null;


var testWorld    = null;



var t = 0;
var dir = false;


var cursorPos = new Vector2(0,0);

function draw_Frame ()
{
    
    if (key_Down(38))
        testCamera.forward(2.0);
  
    if (key_Down(40))
        testCamera.backwards(2.0);

    if (key_Down(37))
        testCamera.yaw(-2.0);
    
    if (key_Down(39)) 
        testCamera.yaw(2.0);

    if (key_Down(81)) cursorPos.x -= 0.01;
        //testCamera.roll(-2.0);
    if (key_Down(69)) cursorPos.x += 0.01; 
        //testCamera.roll(2.0);

    if (key_Down(87)) cursorPos.y += 0.01;
        //testCamera.pitch(2.0); 
    if (key_Down(83)) cursorPos.y -= 0.01;
     ///   testCamera.pitch(-2.0);

    if (key_Down(33))
        testCamera.up(2.0);
    if (key_Down(34))
        testCamera.down(2.0);

    the_Renderer.set_Camera(testCamera);
    the_Renderer.begin();

   //   the_Renderer.draw_Batch( testBatch, testShader, testCamera  );
 //   the_Renderer.draw_Batch( testSprite, spriteShader, testCamera  );
     
    guiItem.set_Position( cursorPos );
     
    the_Renderer.set_Shader(guiShader);
    the_Renderer.set_Matrices(guiItem.get_Transformation(), null, null);
    the_Renderer.draw_Batch(guiItem.batch);
    
    var targets = testWorld.get_Targets();
    
    
    for( var i = 0; i < targets.length; i++ )
    {
        targets[i].set_Stage( t );
    }
   if( t > 1.0 ) dir = false;
   if( t < 0.0 ) dir = true;
   
   if( dir  ) t += 0.001;
   if( !dir ) t -= 0.001;
    
   testWorld.render( testCamera );
   
   
   testWorld.get_Hits( new Vector2(cursorPos.x,cursorPos.y) );

}





function rendererMain ()
{
    requestAnimFrame(rendererMain);

    Root_Exception_Handler(draw_Frame);
}



function main ()
{
    testCamera   = new Camera(new Vector3(0, 5, 0));
    
    testShader   = new SimpleShader(                                    );
    testTexture  = new Texture("data/Textures/concrete.jpg");
    testBatch    = testCube(testTexture);

    spriteShader = new SpriteShader(                                    );
    spriteTex    = new Texture("data/Textures/Sprites/Otus.png");
    testSprite   = testRect(spriteTex, 2, 4);

    guiShader    = new GuiShader(                                      );
    guiTex       = new Texture("data/crosshairs/crosshair1.png");
    testGui      = testRect(guiTex, 0.007, (0.007) * 1.3333);

    guiItem      = new GuiItem(new Vector2(0, 0), new Dimension2(0.07, 0.07), guiTex);
    testActor    = new Actor( new Vector3(0,0,0), new Dimension2( 10,10), spriteTex );
    testWorld    = new World( "Fairground" );

    
    

    rendererMain();
}




 

function global_Initializer ()
{
    new Renderer( new Dimension2(1024, 768) );

    register_Inputs();
/*
    var testSphere = new Sphere3( new Vector3(0,0,0), 100 );
    var testRay    = new Ray3( new Vector3(0,50,150), new Vector3(0,0,-1 ) );
    
    var hit = testRay.intersects( testSphere );
    
    
    alert("HIT: " + hit );
  */  
    


    main();
}


$('document').ready(function () {
    Root_Exception_Handler( global_Initializer );
});