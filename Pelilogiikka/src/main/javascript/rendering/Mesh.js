	

        
    function Mesh( gl, vertice_List, indice_List, uv_List )
    {	
        this.vertices   = new Buffer( gl, "FLOAT", vertice_List,  3  );
        this.texCoords  = new Buffer( gl, "FLOAT", uv_List     ,  2  );
        this.indices    = new Buffer( gl, "INT"  , indice_List ,  1  );
    }

  
  