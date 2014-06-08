

    function extract_MeshData( meshPath , transformation )
    {    
        var meshParser   = new Parser( meshPath );
        var vertexList   = [];
        var indexList    = [];
        var fields       = meshParser.the_Document.get_Subfields( "indices" );
        
        fields.forEach( function( field )           
        {
            var lines   = field.rawData.split("\n");
            var indices = [];
            
            for( var t = 1; t < lines.length; t++ )     // Skip over the header [0]
            {
                var tokens  = lines[t].split(" ");
                 
                for( var i = 0; i < tokens.length; i++ )  indices.push( parseInt( tokens[i] ) );
            }   
           
        indexList.push( indices );
        });
        
        fields = meshParser.the_Document.get_Subfields( "vertices" );
     
        for( var f = 0; f < fields.length; f++ )
        {
            var field     = fields[f];
            var lines     = field.rawData.split("\n");
            var vertices  = [];
            
            
            for( var i = 1; i < lines.length; i++ )     // Skip the header at 0
            {            
                var line   = lines[i];
                var tokens = line.split(" ");
                
                var x = parseFloat( tokens[0]);
                var y = parseFloat( tokens[1]);
                var z = parseFloat( tokens[2]);
                  
                var nX = parseFloat( tokens[3]);
                var nY = parseFloat( tokens[4]);
                var nZ = parseFloat( tokens[5]);
                             
                var u  = parseFloat( tokens[7]);
                var v  = parseFloat( tokens[8]);
                
                var bX = parseFloat( tokens[9]);
                var bY = parseFloat( tokens[10]);
                var bZ = parseFloat( tokens[11]);
                  
                var tX = parseFloat( tokens[12]);
                var tY = parseFloat( tokens[13]);
                var tZ = parseFloat( tokens[14]);
                
                
                    
                // Transform the point and normal here
                var position = new Vector3(x,y,z);
                
                    position = transformation.transform( position );
                    
                
                vertices.push( new Vertex( position               ,
                                           new Vector2( u,-v)     ,
                                           new Vector3( nX,nY,nZ) ,
                                           new Vector3( bX,bY,bZ) ,
                                           new Vector3( tX,tY,tZ)  ) );
            }
           
        vertexList.push( vertices );
        }
        
    return [ vertexList, indexList ];
    }    
    