function Vector3 (x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3.prototype.set = function (x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3.prototype.add = function (vec3)
{
    return new Vector3(this.x + vec3.x,
        this.y + vec3.y,
        this.z + vec3.z);
}

Vector3.prototype.subtract = function (vec3)
{
    return new Vector3(this.x - vec3.x,
        this.y - vec3.y,
        this.z - vec3.z);
}

Vector3.prototype.multiply = function (scalar)
{
    return new Vector3(this.x * scalar,
        this.y * scalar,
        this.z * scalar);
}

Vector3.prototype.dot = function (vec3)
{
    return (this.x * vec3.x +
        this.y * vec3.y +
        this.z * vec3.z);
}

Vector3.prototype.cross = function (vec3)
{
    return new Vector3((this.y * vec3.z - this.z * vec3.y),
        (this.z * vec3.x - this.x * vec3.z),
        (this.x * vec3.y - this.y * vec3.x));
}

Vector3.prototype.length = function ()
{
    var length_Squared = this.x * this.x + this.y * this.y + this.z * this.z;
    return Math.sqrt(length_Squared);
}

Vector3.prototype.normalized = function ()
{
    var length_Squared = this.x * this.x + this.y * this.y + this.z * this.z;
    var length = Math.sqrt(length_Squared);

    return new Vector3(this.x / length,
        this.y / length,
        this.z / length);
}

Vector3.prototype.projected = function (vec3)
{
    var t = this.dot(vec3) / vec3.dot(vec3);
    return vec3.multiply(t);
}

Vector3.prototype.transformed = function (matrix)
{
    ASSERT_TYPE(Matrix33, matrix, "Matrix33 expected as parameter for Vector3.transformed() ");

    return new Vector3((this.x * matrix.m11 + this.y * matrix.m21 + this.z * matrix.m31),
        (this.x * matrix.m12 + this.y * matrix.m22 + this.z * matrix.m32),
        (this.x * matrix.m13 + this.y * matrix.m23 + this.z * matrix.m33));
}


Vector3.prototype.report = function ()
{
    alert("< " + this.x + " , " + this.y + " , " + this.z + " >");
}

Vector3.prototype.alert = function (comment)
{
    if (VALID(comment))
        alert(comment + " < " + this.x + " , " + this.y + " , " + this.z + " >");
    else
        alert("< " + this.x + " , " + this.y + " , " + this.z + " >");
}