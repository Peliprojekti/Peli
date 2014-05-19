

  
    
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
    
    Entity.prototype.set_Rotation = function( rotation )
    {
        this.orientation.set_Rotation( rotation );
    }
        
    Entity.prototype.set_Scale  = function( scales )
    {
        this.orientation.set_Scale( scales );
    }
    
	
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