
var runningID = 0;

function AssetEntry(  type , path ) 
{
    this.id        = runningID++;
    this.assetType = type;
    this.assetPath = path;
    
}


function Assetmanager( renderer)
{   
    this.renderer = renderer,
    this.repository = [];
}

Assetmanager.prototype.get = function(  path, initializer )
{
    if( this.repository[path] )
    { 
        console.log( path + " already present in the memory! ");
       // alert( path + " already present in the memory! ");
        return this.repository[path];
    }
    else
        {
           console.log("Loaded " + path + " from the file! " );
           var temp = initializer( this.renderer, path );
           this.repository[ path ] = temp; 
           return temp;   
        }
    //if( this.repository[ path ] !
}
