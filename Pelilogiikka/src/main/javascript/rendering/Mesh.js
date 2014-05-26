	

        
    function Mesh( gl, vertice_List, indice_List, uv_List, normal_List, binormal_List, tangent_List )
    {	
        
        this.vertices   = new Buffer( gl, "FLOAT", vertice_List ,  3  );
        this.indices    = new Buffer( gl, "INT"  , indice_List  ,  1  );
        
        this.texCoords  = new Buffer( gl, "FLOAT", uv_List      ,  2  );
        
        this.normals    = new Buffer( gl, "FLOAT", normal_List  ,  3  );   // Use an existing normal listing
        
      if (typeof binormal_List  != 'undefined')
      {
          this.binormals  = new Buffer( gl, "FLOAT", binormal_List  ,  3  );  
      }
         
      if (typeof tangent_List  != 'undefined')
      {
          this.tangents   = new Buffer( gl, "FLOAT", tangent_List   ,  3  ); 
      }
   
    }


     Mesh.prototype.render_Indexed = function( gl, material  )
     {
       
        this.vertices.bind ( gl, material.shader.shaderProgram.vertexPositionAttribute  );    
        this.texCoords.bind( gl, material.shader.shaderProgram.textureCoordAttribute    );
        this.normals.bind  ( gl, material.shader.shaderProgram.vertexNormalAttribute    );
         
    if (typeof binormals  != 'undefined')
         this.binormals.bind( gl, material.shader.shaderProgram.vertexBinormalAttribute );
   
    if (typeof this.tangents  != 'undefined')
       this.tangents.bind ( gl, material.shader.shaderProgram.vertexTangentAttribute  );
        
         
        gl.bindBuffer  (gl.ELEMENT_ARRAY_BUFFER, this.indices.data                      );    
        gl.drawElements(gl.TRIANGLES, this.indices.data.numItems, gl.UNSIGNED_SHORT, 0  );
     }
     
    