
    function Orientation( position, scales, angles )
    {
      this.position_V = new Vector3( position[0] , position[1], position[2] );
      this.scales_V   = new Vector3(   scales[0] ,   scales[1],   scales[2] );
      this.angles_V   = new Vector3(   angles[0] ,   angles[1],   angles[2] );
    }
    
    
    Orientation.prototype.set_Position = function( position )
    {
        this.position_V = new Vector3( position[0] , position[1], position[2] );
    }
   
    Orientation.prototype.set_Rotation = function( rotation )
    {
        this.angles_V   = new Vector3(   rotation[0] , rotation[1], rotation[2] );
    }
    
    Orientation.prototype.set_Scale = function( scales )
    {
        this.scales_V   = new Vector3(   scales[0] ,   scales[1],   scales[2] );
    }
    
    
    Orientation.prototype.get_Position = function()
    {
        return this.position_V;
    }
    
    
    
    Orientation.prototype.displace = function( displacement ) 
    {
          this.position_V = this.position_V.add( new Vector3( displacement[0],displacement[1],displacement[2] ));
    }

    Orientation.prototype.pitch = function( radians )
    {
        this.angles_V.x += radians;
    }
    
    Orientation.prototype.yaw   = function( radians )
    {
        this.angles_V.y += radians;
    }

    Orientation.prototype.roll   = function( radians )
    {
        this.angles_V.z  += radians;  
    }
    
    Orientation.prototype.scale = function( axes )
    {
         this.scales_V   = new Vector3(   axes[0] ,   axes[1],   axes[2] );
    }
    

    Orientation.prototype.get_Matrix = function() 
    {
        var       final = new Matrix44( ["TRANS",this.position_V] );           // Declare a fresh matrix and apply translation
        var           I = new Vector3( 1, 0, 0 );
        var matrix_rotI = new Matrix44( ["ROT_A", I , this.angles_V.x ]);
                  final = final.multiply( matrix_rotI );                        // Rotate around the models I-axis
        var           J = new Vector3( final.m12, final.m22,  final.m32 );
        var matrix_rotJ = new Matrix44( ["ROT_A", J , this.angles_V.y  ]);
                  final = final.multiply( matrix_rotJ );                        // Rotate around the models new J-axis
        var           K = new Vector3( final.m13, final.m23, final.m33 );
        var matrix_rotK = new Matrix44( ["ROT_A", K , this.angles_V.z  ]);
                  final = final.multiply( matrix_rotK );                        // Rotate around the models new K-axis
        var      scalez = new Matrix44( ["SCALE", this.scales_V] );             // Apply scale
                  final = final.multiply( scalez );
        
        var m4          = mat4.create();
         
        m4[0]  = final.m11; m4[1]  = final.m12;  m4[2]  = final.m13;  m4[3]  = final.m14; 
        m4[4]  = final.m21; m4[5]  = final.m22;  m4[6]  = final.m23;  m4[7]  = final.m24;    
        m4[8]  = final.m31; m4[9]  = final.m32;  m4[10] = final.m33;  m4[11] = final.m34;   
        m4[12] = final.m41; m4[13] = final.m42;  m4[14] = final.m43;  m4[15] = final.m44;   
          
        return m4;//new MatrixGL( final );
    }
    
    
    
    
    
    Orientation.prototype.get_Matrix44 = function() 
    {
        var       final = new Matrix44( ["TRANS",this.position_V] );           // Declare a fresh matrix and apply translation
        var           I = new Vector3( 1, 0, 0 );
        var matrix_rotI = new Matrix44( ["ROT_A", I , this.angles_V.x ]);
                  final = final.multiply( matrix_rotI );                        // Rotate around the models I-axis
        var           J = new Vector3( final.m12, final.m22,  final.m32 );
        var matrix_rotJ = new Matrix44( ["ROT_A", J , this.angles_V.y  ]);
                  final = final.multiply( matrix_rotJ );                        // Rotate around the models new J-axis
        var           K = new Vector3( final.m13, final.m23, final.m33 );
        var matrix_rotK = new Matrix44( ["ROT_A", K , this.angles_V.z  ]);
                  final = final.multiply( matrix_rotK );                        // Rotate around the models new K-axis
        var      scalez = new Matrix44( ["SCALE", this.scales_V] );             // Apply scale
                  final = final.multiply( scalez );
        
        var m4          = new Matrix44();
         
        m4.m11 = final.m11; m4.m12  = final.m12;  m4.m13 = final.m13;  m4.m14 = final.m14; 
        m4.m21 = final.m21; m4.m22  = final.m22;  m4.m23 = final.m23;  m4.m24 = final.m24;    
        m4.m31 = final.m31; m4.m32  = final.m32;  m4.m33 = final.m33;  m4.m34 = final.m34;   
        m4.m41 = final.m41; m4.m42  = final.m42;  m4.m43 = final.m43;  m4.m44 = final.m44;   
          
        return m4;//new MatrixGL( final );
    }
    
    
    
    
    
    
    
    
    
    
 
    // KUSEE
    Orientation.prototype.get_InverseMatrix = function()
    {
        
       var matrix = mat4.create();
                    mat4.identity( matrix );
     
        
        var iX = matrix[0]; // 0,1,2,3
        var iY = matrix[4]; // 4,5,6,7
        var iZ = matrix[8]; // 8,9,a,b
        
        mat4.rotate( matrix, -this.angles_V.x, [iX, iY, iZ], matrix );
        
        var jX = matrix[1 ]; // 0,1,2,3
        var jY = matrix[5 ]; // 4,5,6,7
        var jZ = matrix[9 ]; // 8,9,a,b
        
        mat4.rotate(matrix, - this.angles_V.y, [jX, jY, jZ], matrix );
        
        var kX = matrix[2 ]; // 0,1,2,3
        var kY = matrix[6 ]; // 4,5,6,7
        var kZ = matrix[10]; // 8,9,a,b
        
        mat4.rotate(matrix,  -this.angles_V.z, [kX, kY, kZ], matrix );   
         
        mat4.translate(matrix, [ -this.position_V.x, 
                                 -this.position_V.y, 
                                 -this.position_V.z  ]);
    return matrix;
    }
    
    // 0,1,2,3
    // 4,5,6,7
    // 8,9,A,B
    // C,D,E,F
    Orientation.prototype.get_Vector = function( label )
    {
        var      matrix = new Matrix44( ["ID"] );           // Declare a fresh matrix and apply translation
       
        var           I = new Vector3( 1, 0, 0 );
        var matrix_rotI = new Matrix44( ["ROT_A", I , this.angles_V.x ]);
                  matrix = matrix.multiply( matrix_rotI );                        // Rotate around the models I-axis
       
        var           J = new Vector3( matrix.m12, matrix.m22,  matrix.m32 );
        var matrix_rotJ = new Matrix44( ["ROT_A", J , this.angles_V.y  ]);
                  matrix = matrix.multiply( matrix_rotJ );                        // Rotate around the models new J-axis
        
        var           K = new Vector3( matrix.m13, matrix.m23, matrix.m33 );
        var matrix_rotK = new Matrix44( ["ROT_A", K , this.angles_V.z  ]);
                  matrix = matrix.multiply( matrix_rotK );                        // Rotate around the models new K-axis         // Rotate around the models new K-axis
        
        
        // KUSEE. Tarkista!
        
       
        if( label === "LOOK")
        {
            return new Vector3(  -matrix.m13, matrix.m23, matrix.m33 );
        }
        else
            if( label == "UP")
            {
                return new Vector3( matrix.m12, matrix.m22, matrix.m32 );
            }
            else
                if( label == "RIGHT")
                {
                    return new Vector3( matrix.m11, matrix.m21, matrix.m31 );
                }
                else
                    alert(" Bad vector label: ("+label+")");
        
      
    }
    
    
    