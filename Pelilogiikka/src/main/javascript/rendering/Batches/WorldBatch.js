

function WorldBatch( vertices, indices, texCoords, normals, biNormals, texture_Map, normal_Map ) 
{
    this.vBuffer     = new Buffer( "FLOAT",  vertices, 3 );
    this.iBuffer     = new Buffer( "INT"  ,   indices, 1 );
    this.tBuffer     = new Buffer( "FLOAT", texCoords, 2 );
        
    this.nBuffer     = new Buffer( "FLOAT",   normals, 3 );
    this.bBuffer     = new Buffer( "FLOAT", biNormals, 3 );

    // World surfaces have exactly TWO maps. Slot 1 for Texturemap, Slot 2 for Normal map.
    this.texture_Map = texture_Map;
    this.normal_Map  = normal_Map;
}



