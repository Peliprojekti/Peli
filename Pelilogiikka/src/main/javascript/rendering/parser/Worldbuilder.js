    
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
    
    
    Triangle.prototype.transform = function( mtx44 )
    {
        var  w1 = new Vector4( this.v1.x, this.v1.y, this.v1.z , 1.0 );
        var  w2 = new Vector4( this.v2.x, this.v2.y, this.v2.z , 1.0 );
        var  w3 = new Vector4( this.v3.x, this.v3.y, this.v3.z , 1.0 );
        
             w1 = mtx44.transform( w1 );
             w2 = mtx44.transform( w2 );
             w3 = mtx44.transform( w3 );
       
        this.v1 = w1.toVec3();
        this.v2 = w2.toVec3();
        this.v3 = w3.toVec3();
    
    
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
        var transformation  = orientations[ m ].get_Matrix44();
        var worldMesh       = rawMeshes[ m ];
        
        // For each submesh
        for( var i = 0; i < worldMesh.length; i++ )
        {
            var vertices      = worldMesh[i].vertices;
            var indices       = worldMesh[i].indices;
            var material      = worldMesh[i].material;
            var triCnt        = (indices.length-1)/3;           // Häksän hää
            var index         = 0;
           
            for( var t = 0; t < triCnt; t++ )
            {   
                var v1        = vertices[ indices[ index++ ] ];
                var v2        = vertices[ indices[ index++ ] ];
                var v3        = vertices[ indices[ index++ ] ];
           
                var triangle  = new Triangle( v1,v2,v3, material );
                    triangle.transform( transformation );
                
             // Transform the triangle here into world space
                triangles.push( triangle );
            }   
        }
    }
    console.info("TODO: Index array has off by one issue. Haxfix @ Worldbuilder line 152");
    alert( "Triangles" + triangles.length );
    
    
    

    
}
   