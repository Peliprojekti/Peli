    
    
    
    function WBatch( vertices, texCoords, normals, binormals, tangents, indices, texture_Map, normal_Map )
    {
       this.texture_Map  = texture_Map;
       this.normal_Map   = normal_Map;
       this.vBuffer      = new Buffer( "FLOAT",  vertices, 3 );
       this.tBuffer      = new Buffer( "FLOAT", texCoords, 2 );
       this.nBuffer      = new Buffer( "FLOAT",   normals, 3 );
       this.bBuffer      = new Buffer( "FLOAT", binormals, 3 );
       this.aBuffer      = new Buffer( "FLOAT",  tangents, 3 );
       this.iBuffer      = new Buffer( "INT"  ,   indices, 1 );
    }
      
      
    
    WBatch.prototype.bind = function( shader )
    {
       var gl = the_Renderer.gl;
      
       this.texture_Map.bind( 0 , shader );
       this.vBuffer.bind( shader.program.vertexPosition );  
       this.tBuffer.bind( shader.program.vertexTexcoord );  
          
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.iBuffer.data );  
    }

    
    
    

    function WorldBatch( vertexBankList, triangles  ) 
    {
        this.triangles = triangles;         // The raw list of the triangles. Unusable for rendering, but priceless for ray-world queries.
        this.batches   = [];
        
        for( var i = 0; i < vertexBankList.length; i++ )
        {
       
            
            var bank  = vertexBankList[i];
            // UV seems fine up until here
            var batch = new WBatch( bank.points, 
                                    bank.texCoords,
                                    bank.normals,
                                    bank.binormals,
                                    bank.tangents,
                                    bank.indices,
                                    bank.texture1,
                                    bank.texture2 );
                
        this.batches.push(  batch );
        }
     
    console.info( this.batches.length + " WorldBatches created");
    }



    WorldBatch.prototype.render = function()
    {
        for( var i = 0; i < this.batches.length; i++ )
        {
            the_Renderer.draw_Batch( this.batches[i] );
        }
    }