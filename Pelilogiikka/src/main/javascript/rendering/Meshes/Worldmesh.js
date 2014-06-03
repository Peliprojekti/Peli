


function Worldmesh( vertices, indices, texCoords, normals, biNormals ) 
{
    this.vBuffer = new Buffer( "FLOAT",  vertices, 3 );
    this.iBuffer = new Buffer( "INT"  ,   indices, 1 );
    this.tBuffer = new Buffer( "FLOAT", texCoords, 2 );
        
    this.nBuffer = new Buffer( "FLOAT", normals,   3 );
    this.bBuffer = new Buffer( "FLOAT", biNormals, 3 );
}