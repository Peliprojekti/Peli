
function Reference( type, label  )
{   
    if( !VALID( type  ) ) throw new Exception( "NULL" , "Reference initialized with an undefined type");
    else
        this.type = type;
        
    if( !VALID( label ) ) throw new Exception( "NULL" , "Reference initialized with an undefined label");
    else
        this.label = label;
    
    this.reference = null;
}


Reference.prototype.set = function( initializer )
{
    if( !VALID( initializer ) ) throw new Exception( "NULL" , "Atttempted to set reference with undefined initializer" );
    
}



function VALID( value )
{
    if (typeof value != 'undefined') return true;
    else
        return false;
}

