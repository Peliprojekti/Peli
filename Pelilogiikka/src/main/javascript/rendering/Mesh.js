	

        
    function Mesh( gl, vertice_List, indice_List, uv_List, normal_List )
    {	
        
        this.vertices   = new Buffer( gl, "FLOAT", vertice_List,  3  );
        this.texCoords  = new Buffer( gl, "FLOAT", uv_List     ,  2  );
        
        if( normal_List ) 
        {
            this.normals = new Buffer( gl, "FLOAT", normal_List,  3  );   // Use an existing normal listing
        }
        else
           {
                // GENERATE normals from the vertices..
                this.normals = null;
           }
        
        this.indices    = new Buffer( gl, "INT"  , indice_List ,  1  );
    }


     