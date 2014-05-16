 
 
 
   function test_Rectangle( gl, material, dimensions )
   {
    this.width  = dimensions[0];
    this.height = dimensions[1];
  
    
    var vertices      = [ -this.width,  this.height, 0,   // Top left
                           this.width,  this.height, 0,   // Top Right
                           this.width, -this.height, 0,   // Bottom Right
                          -this.width, -this.height, 0 ]; // Bottom left
       
    var indices       = [ 0, 1, 2, 2, 3, 0 ];
                  
    var texCoords     = [ 0.0, 0.0, 
                          1.0, 0.0, 
                          1.0, 1.0, 
                          0.0, 1.0 ];   
                 
    var rectMesh = new Mesh  ( gl, vertices, indices, texCoords );     
    var rect     = new Entity( rectMesh, material );
      
    return rect; 
    };
 
 
 
 
 
    function test_Cube( gl, material ) 
    {      
    var vertices      = [ -1.0, -1.0,  1.0,  1.0, -1.0,  1.0, 1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
                          -1.0, -1.0, -1.0, -1.0,  1.0, -1.0, 1.0,  1.0, -1.0,  1.0, -1.0, -1.0,
                          -1.0,  1.0, -1.0, -1.0,  1.0,  1.0, 1.0,  1.0,  1.0,  1.0,  1.0, -1.0,
                          -1.0, -1.0, -1.0,  1.0, -1.0, -1.0, 1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
                           1.0, -1.0, -1.0,  1.0,  1.0, -1.0, 1.0,  1.0,  1.0,  1.0, -1.0,  1.0,
                          -1.0, -1.0, -1.0, -1.0, -1.0,  1.0,-1.0,  1.0,  1.0, -1.0,  1.0, -1.0, ];
       
    var indices       = [ 0, 1, 2, 0, 2, 3,4, 5, 6,4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18,16, 18, 19, 20, 21, 22,   20, 22, 23 ];
                  
    var texCoords     = [ 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
                          1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
                          0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
                          1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
                          1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
                          0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0  ];   
                 
        
    var cubeMesh = new Mesh  ( gl, vertices, indices, texCoords );     
    var cube     = new Entity( cubeMesh, material );
      
    return cube; 
    }



    function test_Sphere( gl, material ) 
    {      
        var latitudeBands  = 60;
        var longitudeBands = 60;
        var radius = 1;
        
        
        var vertexPositionData = [];
        var normalData = [];
        var textureCoordData = [];
        for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

            for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
                var u = 1 - (longNumber / longitudeBands);
                var v = 1 - (latNumber / latitudeBands);

                normalData.push(x);
                normalData.push(y);
                normalData.push(z);
                textureCoordData.push(u);
                textureCoordData.push(v);
                vertexPositionData.push(radius * x);
                vertexPositionData.push(radius * y);
                vertexPositionData.push(radius * z);
            }
        }

        var indexData = [];
        for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
            for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
                var first = (latNumber * (longitudeBands + 1)) + longNumber;
                var second = first + longitudeBands + 1;
                indexData.push(first);
                indexData.push(second);
                indexData.push(first + 1);

                indexData.push(second);
                indexData.push(second + 1);
                indexData.push(first + 1);
            }
        }
        
        var sphereMesh = new Mesh  ( gl, vertexPositionData, indexData,textureCoordData );     
        var sphere     = new Entity( sphereMesh, material );
      
    return sphere; 
    };


