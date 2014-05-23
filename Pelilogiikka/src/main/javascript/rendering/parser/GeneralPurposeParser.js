
    function Vertex( pos, norm, uv )
    {
        this.position  = pos;
        this.normal    = norm;
        this.texcoords = uv; 
    }

    Vertex.prototype.report = function()
    {
        alert(" Vertex: [ " + this.position.x + " , "+ this.position.y + " , "+ this.position.z + "  ]");
    }
    

    function Parser( renderer, fileName )
    {
        // Grab the file contents.
        var request = new XMLHttpRequest();
        request.open("GET", fileName, false);
        request.send(null);
        this.the_Document = new Field( request.responseText );
    };
       
       

   
    Parser.prototype.parse_Mesh = function(  renderer  ) 
    { 
        var meshList               = [];
        var meshes                 = this.the_Document.get_Subfields( "mesh" );    // Grab the mesh portion from the documentary
        var buffers                = meshes[0].get_Subfields( "buffer" );
        
        for( var j = 0; j < buffers.length; j++ )
        {
            var positions  = [];
            var normals    = [];
            var texCoords  = [];
            var indices    = [];
                
            var vData      = buffers[ j ].get_Attributes( "vertices" );
            var iData      = buffers[ j ].get_Attributes( "indices"  );
                           
            var attribute  =  ( vData[ 0 ].rawData.split( "\n" ) );
                attribute  = attribute.splice(1, attribute.length-2 );
                
            attribute.forEach( function( line )
            { 
                var variables = line.split( " " );
                  
                for( var a = 0; a < 3; a++ )
                {
                    positions.push( parseFloat( variables[ a   ]  ) );
                    normals.push( parseFloat( variables[ 3+a ]  ) );
                }
                     
                 texCoords.push( parseFloat( variables[6] ) );
                 texCoords.push( parseFloat( variables[7] ) );
            });
                
                
            attribute  =  ( iData[ 0 ].rawData.split( "\n" ) );
            attribute  = attribute.splice(1, attribute.length-3 );
               
            attribute.forEach( function( line )
            { 
                var variables = line.split( " " );
                    
                variables.forEach( function ( item ) 
                {   
                   indices.push( parseInt( item ) );
                });
            });
               
           
        var new_Mesh = new Mesh( renderer.gl, positions, indices, texCoords, normals );
        meshList.push( new_Mesh );
        }
            // Extract material data from this mesh
        
        
        alert("Done: " + meshList.length + " meshes loaded. ");    
        return meshList;
    }
    
   
  
    


    Parser.prototype.parse_Scene = function(  renderer  ) 
    { 
        var the_Scene = new Scene( renderer ); 
       
        // These are all the nodes that inhabit the scene
        var nodes      = this.the_Document.get_Subfields("node");
        
        
        nodes.forEach( function( node )
        {
            var attributes      = node.get_Subfields("attributes");
            var attribute_Table = [];   // ["Name"][Typed_Value]
           
            attributes.forEach( function( attribute )
            {
                var variables = attribute.get_Variables();
               
                variables.forEach( function( variable ) 
                {
                    alert( variable.type );// + " " + variable.label+ " = " + variable.value  );
                });
                
            });
           
        });
        
        
      
    return the_Scene;
    }