function Map_To_Screen (renderer, hPoint)
{
    var w2 = renderer.target_Width / 2;
    var h2 = renderer.target_Height / 2;
    var x = (hPoint[0] - w2) / w2;
    var y = (h2 - hPoint[1]) / h2;
    return [x, y, 0];
}

function resize (canvas)
{
    canvas.width = 800;//1920;//window.outerWidth;
    canvas.height = 600;//1080;//window.outerHeight;
}

var canvas = null;
var renderer = null;
var myCamera = null;
var myScene = null;
var haxLight = new Light(new Vector3(-64.297035, -34.088657, -117.10157), 100.0, 0, 0, 0, 0, 0, 0);

// Define these ELSEWHERE
KEY_W = 87;
KEY_S = 83;
KEY_Q = 81;
KEY_E = 69;
KEY_UP = 38;
KEY_DOWN = 40;
KEY_LEFT = 37;
KEY_RIGHT = 39;
KEY_PAGEUP = 33;
KEY_PAGEDOWN = 34;
KEY_ENTER = 13;
// 

function process_Inputs ()
{
    if (key_Down(KEY_W))
        myCamera.pitch(0.008);        // W to pitch up
    if (key_Down(KEY_S))
        myCamera.pitch(-0.008);      // S to pitch down

    if (key_Down(KEY_Q))
        myCamera.roll(0.008);       // Q to roll left
    if (key_Down(KEY_E))
        myCamera.roll(-0.008);      // E to roll right


    if (key_Down(16)) // Shift
    {
        if (key_Down(KEY_UP))
            haxLight.forward(1.0);
        if (key_Down(KEY_DOWN))
            haxLight.backward(1.0);

        if (key_Down(KEY_PAGEUP))
            haxLight.move([0, 1, 0]);
        if (key_Down(KEY_PAGEDOWN))
            haxLight.move([0, -1, 0]);

        if (key_Down(KEY_LEFT))
            haxLight.move([1, 0, 0]);
        if (key_Down(39))
            haxLight.move([-1, 0, 0]);

    }
    else
    {
        if (key_Down(KEY_UP))
            myCamera.forward(1.0);
        if (key_Down(KEY_DOWN))
            myCamera.backward(1.0);

        if (key_Down(KEY_PAGEUP))
            myCamera.move([0, 1, 0]);
        if (key_Down(KEY_PAGEDOWN))
            myCamera.move([0, -1, 0]);

        if (key_Down(KEY_LEFT))
            myCamera.yaw(-0.05);
        if (key_Down(KEY_RIGHT))
            myCamera.yaw(0.05);

    }


    if (key_Down(KEY_ENTER))
    {
        var vec = myCamera.orientation.get_Position();
        haxLight.orientation.set_Position([vec.x, vec.y, vec.z]);
    }

}

function tick ()
{
    requestAnimFrame(tick);
    process_Inputs();
    myScene.render();
}

function Start ()
{
    register_Inputs();      // Erillinen luokka tälle!

    canvas = document.getElementById("Canvas");
    resize(canvas);

    renderer = new Renderer(canvas);
    var assman = new Assetmanager(renderer);
    myScene = new Scene(renderer, assman, "Showcase");
    var shd = Guishader.load(renderer.gl, ["NULL", "NULL"]);
    var tex = new Texture(renderer.gl, "Data/Textures/concrete.jpg", "FILTER_PLAIN");
    var myMat = new Material(shd, tex, null, null, null);
    myCamera = new Camera(renderer, 0.1, 1000, 65);

    myCamera.set_Position([-2.750824, 0.444516, -24.011581]);
    myScene.insert(myCamera, "CAM");
    myScene.insert(haxLight, "LIGHT");
    renderer.set_BgrColor([0.0, 0.4, 0.7, 1.0]);

    tick();
}

$('document').ready(function() {
    Start();
});