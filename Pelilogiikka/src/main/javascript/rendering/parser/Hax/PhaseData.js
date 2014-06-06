    function Triangle( v1, v2, v3, material )
    {
        this.v1       = v1;
        this.v2       = v2;
        this.v3       = v3;
        this.material = material;
    }
     
   
    function Vertex( point, uv, normal, binormal, tangent )
    {
        this.point    = point;
        this.uv       = uv;
        this.normal   = normal;
        this.binormal = binormal;
        this.tangent  = tangent;
    }
  
    function VertexBank( texture1, texture2, texture3, texture4 )
    {
        this.points       = [];
        this.texCoords    = [];
        this.normals      = [];
        this.binormals    = [];
        this.tangents     = [];
        
        this.texture1     = texture1;
        this.texture2     = texture2;
        this.texture3     = texture3;
        this.texture4     = texture4;
    }
    
    VertexBank.prototype.feed_Triangle = function ( triangle )
    {
        this.points.push( triangle.v1.point.x );
        this.points.push( triangle.v1.point.y );
        this.points.push( triangle.v1.point.z );
        this.points.push( triangle.v2.point.x );
        this.points.push( triangle.v2.point.y );
        this.points.push( triangle.v2.point.z );
        this.points.push( triangle.v3.point.x );
        this.points.push( triangle.v3.point.y );
        this.points.push( triangle.v3.point.z );
        
        this.texCoords.push( triangle.v1.uv.x );
        this.texCoords.push( triangle.v1.uv.y );
        this.texCoords.push( triangle.v2.uv.x );
        this.texCoords.push( triangle.v2.uv.y );
        this.texCoords.push( triangle.v3.uv.x );
        this.texCoords.push( triangle.v3.uv.y );
        
        this.normals.push( triangle.v1.normal.x );
        this.normals.push( triangle.v1.normal.y );
        this.normals.push( triangle.v1.normal.z );
        this.normals.push( triangle.v2.normal.x );
        this.normals.push( triangle.v2.normal.y );
        this.normals.push( triangle.v2.normal.z );
        this.normals.push( triangle.v3.normal.x );
        this.normals.push( triangle.v3.normal.y );
        this.normals.push( triangle.v3.normal.z );
        
        this.binormals.push( triangle.v1.binormal.x );
        this.binormals.push( triangle.v1.binormal.y );
        this.binormals.push( triangle.v1.binormal.z );
        this.binormals.push( triangle.v2.binormal.x );
        this.binormals.push( triangle.v2.binormal.y );
        this.binormals.push( triangle.v2.binormal.z );
        this.binormals.push( triangle.v3.binormal.x );
        this.binormals.push( triangle.v3.binormal.y );
        this.binormals.push( triangle.v3.binormal.z );
        
        this.tangents.push( triangle.v1.tangent.x );
        this.tangents.push( triangle.v1.tangent.y );
        this.tangents.push( triangle.v1.tangent.z );
        this.tangents.push( triangle.v2.tangent.x );
        this.tangents.push( triangle.v2.tangent.y );
        this.tangents.push( triangle.v2.tangent.z );
        this.tangents.push( triangle.v3.tangent.x );
        this.tangents.push( triangle.v3.tangent.y );
        this.tangents.push( triangle.v3.tangent.z );
    }
     
     
     
    function Material( texture1, texture2, texture3, texture4 )
    {
        this.texture1 = texture1;
        this.texture2 = texture2;
        this.texture3 = texture3;
        this.texture4 = texture4;
    
    this.build_Hash();
    }
    
    
    Material.prototype.build_Hash = function()
    {
        var    string = this.texture1.source + this.texture2.source + this.texture3.source + this.texture4.source;
        this.hash     = string.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
        this.hash    /= 1000000;
        this.hash     = Math.floor( Math.abs(this.hash) );
        // Seems legit... Need to see if its good for all possible cases. Seems to end up between [20 and a few k ]
    }