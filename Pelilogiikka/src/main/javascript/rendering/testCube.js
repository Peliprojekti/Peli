 
 
 
 
 
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


/*

        cubeVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        var cubeVertexIndices = [  0, 1, 2,      0, 2, 3,4, 5, 6,      4, 6, 7, 8, 9, 10,     8, 10, 11,  // Top face
                                  12, 13, 14,   12, 14, 15,  16, 17, 18,   16, 18, 19, 20, 21, 22,   20, 22, 23 ];
                                
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
        cubeVertexIndexBuffer.itemSize = 1;
        cubeVertexIndexBuffer.numItems = 36;
        
        
 */