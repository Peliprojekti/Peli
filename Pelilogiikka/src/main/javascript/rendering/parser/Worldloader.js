    
    
    
    function load_World( worldName )
    {
        
        
        
    }
    
    
    
    
    
    
    function build_Matrix( position, rotation, scale )
    {

        var orient = new Matrix33();
        var rot    = new Matrix33();
        
        rot.RotationX( rotation.x );
        orient = orient.multiply( rot );
        
        rot.RotationY( rotation.y );
        orient = orient.multiply( rot );
        
        rot.RotationY( rotation.z );
        orient = orient.multiply( rot );
           
           
        var m1 = new Matrix44();
            m1.embed( orient );
            
        var m2 = new Matrix44();    
            m2.embed_Translation( position );
            
        var s  = scale;
        var m3 = new Matrix44( s.x,   0,   0,   0,
                                 0, s.y,   0,   0,
                                 0,   0, s.z,   0,
                                 0,   0,   0, 1.0 );
            
        var ret = m3.multiply( m2 );
            ret = ret.multiply( m1 );
            
    return ret;
    }
    
    
    
    
    
    function parse_Scene( document ) 
    { 
        
        var nodes = document.get_Subfields("node");
      
        nodes.forEach( function( node )
        {
            var type       = node.get_Type();
            var attributes = node.get_Subfields("attributes");
           
            var node_Variables           = attributes[0].get_Variables();                  // There shold be only ONE per node!
            var node_Description         = read_Node( node_Variables );
           
            var node_Transformation      = build_Matrix( node_Description[0].casted() ,
                                                         node_Description[1].casted() ,
                                                         node_Description[2].casted() );
         //   var node_Position            = node_Description[0].casted();
         //   var node_Rotation            = node_Description[1].casted();
        //    var node_Scale               = node_Description[2].casted();
        
           
      
        }
      
        
    /*    var the_Scene                    = new Scene( renderer ); 
      
        // For each node, we need to extract the following data...
        nodes.forEach( function( node )
        {
            var type                     = node.get_Type();
            
            
            var attributes               = node.get_Subfields("attributes");
           
            var node_Variables           = attributes[0].get_Variables();                  // There shold be only ONE per node!
            var node_Description         = read_Node( node_Variables );
                
            var node_Position            = node_Description[0].casted();
            var node_Rotation            = node_Description[1].casted();
            var node_Scale               = node_Description[2].casted();
        
            
            // For a node that is of type "mesh"....
            if( type == "mesh")
            {
                var node_Materials       = node.get_Subfields("materials");                 
                var material_Attributes  = node_Materials[0].get_Subfields("attributes");  // There should be exactly ONE <materials> tag per field! More -> assert fail here.
                var materialList         = build_Materials( material_Attributes, assetManager, renderer );
                var materialCount        = materialList.length; 
         
                var meshPath             = relative_Path( node_Description[3].casted() );
                var meshList             = build_Meshes( meshPath, assetManager, renderer );
                var meshCount            = meshList.length;
              
                if( meshCount != materialCount )                                         // There had better be one material available for all meshes. 1:1 not required though.
                {
                    alert(" Mesh - Material incongruity! - ABORT - ");
                }
             
                for( var i = 0; i < meshCount; i++ )
                {
                    var entity = new Entity( meshList[i], materialList[i] );
                        entity.set_Position( [             node_Position.x ,             node_Position.y , node_Position.z             ] );
                        entity.set_Rotation( [ DegToRad( node_Rotation.x ) , DegToRad( node_Rotation.y ) , DegToRad( node_Rotation.z ) ] );
                        entity.set_Scale   ( [                node_Scale.x ,                node_Scale.y , node_Scale.z                ] );         // Okay. This is just sad... I need to either overload Orientation class or swap over to Vector notation. Can't do it yet in fear of breaking something.
                    
                the_Scene.insert( entity , "DYNAMIC" );
                }
                
                
            }       
            else
                if( type == "light" )    // For a node that is of type "light"....
                {
                  
                        var variables       = attributes[0].get_Variables();     // Plz god, let the light variables be in a fixed order...
                                                                                 // IF not... Need to implement a retarded case - switch or if then else loop.
                        var lightName       = variables[0].casted();
                        var lightID         = variables[1].casted();
                        var lightPos        = variables[2].casted();
                        var lightRot        = variables[3].casted();
                        var lightScale      = variables[4].casted();
                        
                        var color_Ambient   = variables[9].casted();
                        var color_Diffuse   = variables[10].casted();
                        var color_Specular  = variables[11].casted();
                        
                        var attenuation     = variables[12].casted();
                        var radius          = variables[13].casted();
                        
                        var light           = new Light( lightPos , radius, color_Ambient, color_Diffuse, color_Specular, attenuation.x, attenuation.y, attenuation.z );
                        
                        the_Scene.insert( light , "LIGHT" );
                }
                
        });
        
        
        
    console.log(" Scene parsed succesfully! ");    
    //alert("OK with " + the_Scene.entries_Dynamic.length + " nodes");
    return the_Scene;
    */
    }

    
    
    
    
    
    
    
    /*
    
    // This represents a basic vertex in the world. 
    // Position, uv-coords and the 2/3 of the tangent basis.
    function Vertex( position, texCoord, normal, biNormal )
    {
        this.position = position;
        this.texCoord = texCoord;
        this.normal   = normal;
        this.biNormal = biNormal;
    }
 
    // Rawmesh contains groups of vertices combined with their associated indices as well as the material shared by the vertices.
    function Rawmesh( vertices, indices , material )
    {
        this.vertices  = vertices;
        this.indices   = indices;
        this.material  = material;
    }
    
    // Rawmeshes are split into triangles.
    function Triangle( v1, v2, v3, material )
    {
        this.v1       = v1;
        this.v2       = v2;
        this.v3       = v3;
        this.material = material;
    }
    
    
    Triangle.prototype.transform = function( linear, translation )
    {
        this.v1 = linear.transform( this.v1 );
        this.v2 = linear.transform( this.v2 );
        this.v3 = linear.transform( this.v3 );
    
        this.v1 = this.v1.add( translation  );
        this.v2 = this.v1.add( translation  );
        this.v3 = this.v1.add( translation  );
   
    // Transform the normals here later
    console.info("TODO: Triangle normal transformation @ Worldbuilder - line 46");
    }
    
    
    
    
// Converts all the world mesh objects into a series of vertice list. Lists map 1:1 to objects
function build_Vertices( fields )
{
    var vertexData   = [];
        
    for( var f = 0; f < fields.length; f++ )
    {
        var field     = fields[f];
        var lines     = field.rawData.split("\n");
        var vertices  = [];
            
        for( var i = 1; i < lines.length; i++ )     // Skip the header at 0
        {
            var tokens = lines[i].split(" ");
                
            // NOTICE! V-coordinate is FLIPPED ON PURPOSE!  The editor used has LEFT HANDED coordinate system.
            var vertex = new Vertex( new Vector3( parseFloat(tokens[0]) , parseFloat(tokens[1] ) , parseFloat(tokens[2] ) ) , 
                                     new Vector2( parseFloat(tokens[7]) ,-parseFloat(tokens[8] )                          ) , 
                                     new Vector3( parseFloat(tokens[3]) , parseFloat(tokens[4] ) , parseFloat(tokens[5] ) ) , 
                                     new Vector3( parseFloat(tokens[9]) , parseFloat(tokens[10]) , parseFloat(tokens[11]) ) );
        vertices.push( vertex );
        }
        
    vertexData.push( vertices );   // For each mesh, store these critical values
    }
    
return vertexData;
}
    
     
    // Converts all the world mesh objects into a series of indice list. Lists map 1:1 to objects
function build_Indices( fields )
{
    var indexData     = [];
       
    fields.forEach( function( field )           
    {
        var lines   = field.rawData.split("\n");
        var indices = [];
        var lineCnt = lines.length-1;
            
        for( var t = 1; t < lineCnt; t++ )     // Skip over the header [0]
        {
            var tokens  = lines[t].split(" ");
            var tokenCnt = tokens.length;
                 
            for( var i = 0; i < tokenCnt; i++ )  
            {
               indices.push( parseInt(tokens[i]) );
            }
        }   

    indexData.push( indices );
    });
    
return indexData;
}
   
   
   
   
function build_Rawmeshes( meshPath , materials )
{           
    var meshParser    = new Parser( meshPath );
    var indexData     = build_Indices (  meshParser.the_Document.get_Subfields( "indices"  ) );   
    var vertexData    = build_Vertices(  meshParser.the_Document.get_Subfields( "vertices" ) ); 
    
    if( indexData.length != vertexData.length )   alert("Vertex index mishmatch");
    
    var rawMeshes  = [];
    var subMeshCnt = indexData.length;
    
    for( var i = 0; i < subMeshCnt; i++ )
    {    
        rawMeshes.push( new Rawmesh( vertexData[i], indexData[i], materials[i] ) );
    }
           
return rawMeshes;
}




// rawMeshes is a list of a list of rawmeshes.  Each worldnode can be split into 1..n submeshes.
function compose_WorldMesh( rawMeshes, orientations ) 
{
    var triangles = [];

    // For each worldmesh
    for( var m = 0; m < rawMeshes.length; m++ )
    {
        var worldMesh       =    rawMeshes[ m ];
        var orientation     = orientations[ m ];
        
        var linearPart      = get_Linear( orientation );
        var translation     = orientation.position_V;
        
        
        // For each submesh
        for( var i = 0; i < worldMesh.length; i++ )
        {
            var vertices      = worldMesh[i].vertices;
            var indices       = worldMesh[i].indices;
            var material      = worldMesh[i].material;
            var triCnt        = (indices.length-1)/3;           // H�ks�n h��
            var index         = 0;
           
            for( var t = 0; t < triCnt; t++ )
            {   
                var v1        = vertices[ indices[ index++ ] ];
                var v2        = vertices[ indices[ index++ ] ];
                var v3        = vertices[ indices[ index++ ] ];
           
                var triangle  = new Triangle( v1,v2,v3, material );
                
                    triangle.transform( linearPart , translation  );
            
            triangles.push( triangle );
            }   
        }
    }
    console.info("TODO: Index array has off by one issue. Haxfix @ Worldbuilder line 152");
    alert( "Triangles" + triangles.length );
    
    // Now we have a list of triangles ready.
    
    
}
    
     */