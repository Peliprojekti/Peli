
    function Color( red, green, blue, alpha )
    {
        ASSERT_INTERVAL( red  , 0.0, 1.0, "Invalid color component");
        ASSERT_INTERVAL( green, 0.0, 1.0, "Invalid color component");
        ASSERT_INTERVAL( blue , 0.0, 1.0, "Invalid color component");
        ASSERT_INTERVAL( alpha, 0.0, 1.0, "Invalid color component");
    
        this.red   = red;
        this.green = green;
        this.blue  = blue;
        this.alpha = alpha;
    }