

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
 
        this.vBuffer.bind( shader.program.vertexPosition );  
        this.tBuffer.bind( shader.program.vertexTexcoord );  
        
     
    }
