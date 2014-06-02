



    function Dimension2( width, height )
    {
        ASSERT_POSITIVE( width  , "Dimension must be positive: " + width  );
        ASSERT_POSITIVE( height , "Dimension must be positive: " + height );
        
        this.width  = width;
        this.height = height;
    }



