


// PI/180 = rad/deg
// deg*PI/180 = rad

function DegToRad( degs )
{
    return (degs*Math.PI) / 180.0;
}

// PI/180     = rad/deg
// PI*deg/180 = rad
// deg        = 180*rad/PI
function RadToDeg( rads )
{
    return (rads*180.0)/Math.PI;
}
