

    function Batch( vertices, indices, texCoords , texture ) 
    {
        this.vBuffer     = new Buffer( "FLOAT",  vertices, 3 );
        this.iBuffer     = new Buffer( "INT"  ,   indices, 1 );
        this.tBuffer     = new Buffer( "FLOAT", texCoords, 2 );
        
        this.texture     = texture;
    }


    Batch.prototype.bind = function( shader )
    {
        var gl = the_Renderer.gl;
        
       this.texture.bind( 0 , shader );
       this.vBuffer.bind( shader.program.vertexPosition );  
       this.tBuffer.bind( shader.program.vertexTexcoord );  
          
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.iBuffer.data );  
    }



// These somewhere else! ANYWHERE ELSE


     function testRect( texture, width, height )
     {
        this.width   = width;
        this.height  = height;
  
    
        var vertices     = [ -this.width,  this.height, 0,   // Top left
                              this.width,  this.height, 0,   // Top Right
                              this.width, -this.height, 0,   // Bottom Right
                             -this.width, -this.height, 0 ]; // Bottom left
       
        var indices     = [ 0, 1, 2, 2, 3, 0 ];
                  
        var texCoords   = [ 0.0, 1.0, 
                            1.0, 1.0, 
                            1.0, 0.0, 
                            0.0, 0.0 ];   
                      
                      
     return new Batch( vertices, indices, texCoords, texture );
     }
     
     
 
    function testCube( texture ) 
    {   
        
        var vertices      = [ -1.0, -1.0,  1.0,  1.0, -1.0,  1.0, 1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
                              -1.0, -1.0, -1.0, -1.0,  1.0, -1.0, 1.0,  1.0, -1.0,  1.0, -1.0, -1.0,
                              -1.0,  1.0, -1.0, -1.0,  1.0,  1.0, 1.0,  1.0,  1.0,  1.0,  1.0, -1.0,
                              -1.0, -1.0, -1.0,  1.0, -1.0, -1.0, 1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
                               1.0, -1.0, -1.0,  1.0,  1.0, -1.0, 1.0,  1.0,  1.0,  1.0, -1.0,  1.0,
                              -1.0, -1.0, -1.0, -1.0, -1.0,  1.0,-1.0,  1.0,  1.0, -1.0,  1.0, -1.0, ];
        
        var indices       = [  0,  1,  2,  0,  2,  3,  4, 
                               5,  6,  4,  6,  7,  8,  9,
                              10,  8, 10, 11, 12, 13, 14, 
                              12, 14, 15, 16, 17, 18, 16, 
                              18, 19, 20, 21, 22, 20, 22, 23 ];
                          
        var texCoords     = [ 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
                              1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
                              0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
                              1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
                              1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
                              0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0  ];   
   
        
     return new Batch( vertices, indices, texCoords, texture );
     }
