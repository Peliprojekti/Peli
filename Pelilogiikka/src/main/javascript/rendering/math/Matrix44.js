

    function Matrix44()
    {
      this.data = [ 1,0,0,0,
                    0,1,0,0,
                    0,0,1,0,
                    0,0,0,1];
    }
    
    
    Matrix44.prototype.Identity = function ()
    {
        for( var i = 0; i < 4; i++ )
            for( var j = 0; j < 4; j++ )
                 this.data[i*4 + j] = ( i == j ) ? 1.0 : 0.0;
    }



    Matrix44.prototype.embed = function( matrix )
    {
        ASSERT_TYPE( Matrix33, matrix, "Expected Matrix33 for embed" );
        
        for( var i = 0; i < 3; i++ )
            for( var j = 0; j < 3; j++)
                this.data[i*4 + j] = matrix.data[i*3 + j];
        
        
    }