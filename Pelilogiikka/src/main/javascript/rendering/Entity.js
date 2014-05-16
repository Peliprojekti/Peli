

    function Orientation( position, scales, angles )
    {
       this.position = position;
       this.scales   = scales;
       this.angles  = angles;         // Pitch, Yaw, Roll
    }
    
    
    Orientation.prototype.set_Position = function( position )
    {
        this.position = position;
    }
    
    Orientation.prototype.displace = function( displacement ) 
    {
        vec3.add( this.position, displacement, this.position );
    }

    Orientation.prototype.pitch = function( radians )
    {
        this.angles[0]   += radians;
    }
    
    Orientation.prototype.yaw   = function( radians )
    {
        this.angles[1]   += radians;
    }

    Orientation.prototype.roll   = function( radians )
    {
        this.angles[2]   += radians;
    }
    
    Orientation.prototype.scale = function( axes)
    {
     	this.scales[0] = axes[0];
        this.scales[1] = axes[1];
        this.scales[2] = axes[2];  
    }


    Orientation.prototype.get_Matrix = function() 
    {
      var matrix = mat4.create();
                   mat4.identity( matrix                       );
                   mat4.scale   (  matrix, this.scales, matrix );
        
         mat4.translate( matrix, [  this.position[0], 
                                    this.position[1], 
                                    this.position[2]  ]);
        
         mat4.rotate(matrix,  this.angles[0], [1, 0, 0] );
         mat4.rotate(matrix,  this.angles[1], [0, 1, 0] );
         mat4.rotate(matrix,  this.angles[2], [0, 0, 1] );
        
    return matrix;
    }
    
    Orientation.prototype.get_InverseMatrix = function()
    {
       var matrix = mat4.create();
                    mat4.identity( matrix );
        
         mat4.rotate(matrix, -this.angles[0], [1, 0, 0] );
         mat4.rotate(matrix, -this.angles[1],   [0, 1, 0] );
         mat4.rotate(matrix, -this.angles[2],  [0, 0, 1] );
         
         mat4.translate(matrix, [ -this.position[0], 
                                  -this.position[1], 
                                  -this.position[2]  ]);
              
    return matrix;
    }
    
    
    // 0,1,2,3
    // 4,5,6,7
    // 8,9,A,B
    // C,D,E,F
    
    
    Orientation.prototype.get_Vector = function( label )
    {
      var matrix = mat4.create();
                   mat4.identity( matrix );
                   mat4.rotate(matrix, this.angles[0], [1, 0, 0] );
                   mat4.rotate(matrix, this.angles[1], [0, 1, 0] );
                   mat4.rotate(matrix, this.angles[2], [0, 0, 1] );
        
        if( label === "LOOK")
        {
            return [ matrix[8], matrix[9], matrix[10] ];
        }
        else
            if( label == "UP")
            {
                return [ matrix[4], matrix[5], matrix[6] ];
            }
            else
                if( label == "RIGHT")
                {
                    return [ matrix[0], matrix[1], matrix[3] ];
                }
                else
                    alert(" Bad vector label: ("+label+")");
        
        
    }
    
    
    
    
    
    
    
    
    
    

    function Entity( mesh , material )
    {
        this.mesh         = mesh;
        this.material     = material;              
        this.orientation  = new Orientation( [0,0,0],  [1,1,1], [0,0,0] );
    }
    
   
    Entity.prototype.set_Position = function( point )
    {
        this.orientation.set_Position( point );
    };
	
    Entity.prototype.move = function( displacement )
    { 
        this.orientation.displace( displacement );
    };
		
    Entity.prototype.pitch = function( radians ) 
    {
        this.orientation.pitch( radians );
    };	
    
    Entity.prototype.yaw = function( radians ) 
    {
        this.orientation.yaw( radians );
    };
	
    Entity.prototype.roll = function( radians ) 
    {
        this.orientation.roll( radians );
    };
		
    Entity.prototype.scale = function( axes ) 
    {
        this.orientation.scale( axes );
    };          