
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


var testCamera = null;

var testShader = null;
var testTexture = null;
var testBatch = null;

var spriteShader = null;
var testSprite = null;
var spriteTex = null;

var guiShader = null;
var testGui = null;
var guiTex = null;


var guiItem = null;
var testActor = null;


var testWorld = null;



function draw_Frame ()
{
    if (key_Down(38))
        testCamera.forward(5.0);
  
    if (key_Down(40))
        testCamera.backwards(5.0);

    if (key_Down(37))
        testCamera.yaw(-2.0);
    
    if (key_Down(39)) 
        testCamera.yaw(2.0);

    if (key_Down(81))
        testCamera.roll(-2.0);
    if (key_Down(69))
        testCamera.roll(2.0);

    if (key_Down(87))
        testCamera.pitch(2.0);
    if (key_Down(83))
        testCamera.pitch(-2.0);

    if (key_Down(33))
        testCamera.up(5.0);
    if (key_Down(34))
        testCamera.down(5.0);



    the_Renderer.set_Camera(testCamera);

    the_Renderer.begin();

    //   the_Renderer.draw_Batch( testBatch, testShader, testCamera  );

        //the_Renderer.draw_Batch( testSprite, spriteShader, testCamera  );

       //the_Renderer.draw_Batch( testGui, guiShader, testCamera  );

    the_Renderer.set_Shader(guiShader);
   

    the_Renderer.set_Matrices(guiItem.get_Transformation(), null, null);

    the_Renderer.draw_Batch(guiItem.batch);


    testWorld.render( testCamera );
    
     the_Renderer.set_Shader( spriteShader );
      
    
    var viewI = testCamera.get_ViewMatrix().extract_Orientation().transposed();
    var trans = testActor.get_Transformation(); 
        trans.embed( viewI );
        
    the_Renderer.set_Matrices( trans, null, null );
                               
  //  the_Renderer.draw_Batch(testActor.batch );

}





function rendererMain ()
{
    requestAnimFrame(rendererMain);

    Root_Exception_Handler(draw_Frame);
}



function main ()
{
    testCamera   = new Camera(new Vector3(0, 5, 150));

    testShader   = new SimpleShader(                                    );
    testTexture  = new Texture("data/Textures/concrete.jpg");
    testBatch    = testCube(testTexture);

    spriteShader = new SpriteShader(                                    );
    spriteTex    = new Texture("data/Textures/Sprites/Otus.png");
    testSprite   = testRect(spriteTex, 2, 4);


    guiShader    = new GuiShader(                                      );
    guiTex       = new Texture("data/crosshair1.bmp");
    testGui      = testRect(guiTex, 0.007, (0.007) * 1.3333);

    guiItem      = new GuiItem(new Vector2(0, 0), new Dimension2(0.07, 0.07), guiTex);
    
    testActor    = new Actor( new Vector3(0,0,0), new Dimension2( 10,10), spriteTex );



    testWorld = new World( "Simple" );


    rendererMain();
}




 


function global_Initializer ()
{
    new Renderer(new Dimension2(800, 600));

    register_Inputs();




    main();
}


$('document').ready(function () {
    Root_Exception_Handler( global_Initializer );
});