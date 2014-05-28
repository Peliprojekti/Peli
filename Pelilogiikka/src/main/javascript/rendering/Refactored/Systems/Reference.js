function VALID( value )
{
    if (typeof value != 'undefined') return true;
    else
        return false;
}


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

