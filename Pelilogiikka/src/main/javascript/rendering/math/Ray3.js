function Plane3 (point, normal)
{
    this.point = point;
    this.normal = normal;
}

Plane3.prototype.rotate = function (mat33)
{
    ASSERT_TYPE(Matrix33, mat33);
    this.normal = mat33.transform(this.normal);
}

function Ray3 (origin, direction)
{
    this.origin = origin;
    this.direction = direction.normalized();
}

Ray3.prototype.intersects = function (thing)
{
    if (TYPE(Sphere3, thing))
    {
        // ( A + tV - O )^2  = r^2
        // ( tV + (A-O) )^2  = r^2
        // tV*tV   + 2*tV(A-O)   + (A-O)*(A-O) = r^2
        // t^2(V*V) + 2t(V*(A-O)) + (A-O)*(A-O) = r^2
        // t^2(V*V) + 2t(V*(A-O)) + (A-O)*(A-O) - r^2 = 0
        // (t^2)X + (t)2Y + Z = 0
        //  t = -Y +- sqrt( Y^2-4XZ)/2X     

        var A = this.origin;
        var V = this.direction;
        var O = thing.origin;
        var r = thing.radius;

        var X = V.dot(V);
        var Y = 2.0 * V.dot(A.subtract(O));
        var Z = A.subtract(O).dot(A.subtract(O)) - r * r;

        var discriminant = Y * Y - 4 * X * Z;

        if (discriminant < 0)
        {
            //     alert("Disciminant: " + discriminant);
            return false;
        }
        
        var t1 = (-Y + Math.sqrt(discriminant)) / 2 * X;
        var t2 = (-Y - Math.sqrt(discriminant)) / 2 * X;
        
        if (t1 > 0 || t2 > 0)
        {
            return true;
        }
        return false;
    }

    if (TYPE(Plane3, thing))
    {
        return;
    }
}