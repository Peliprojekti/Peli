


    function Model( meshes, materials )
    {
        this.meshList     = meshes;
        this.materialList = materials;
    };
    



    Model.prototype.render = function( gl )
    {
        for( var i = 0; i < this.meshList.length; i++ )
        {
            this.meshList[i].render( gl, this.materialList[i] );
        }

    }
    
    
    
     