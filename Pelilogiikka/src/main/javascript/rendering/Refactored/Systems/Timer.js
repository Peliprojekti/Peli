

function Timer()
{
    this.time_Stamp  = Date.now(); 
}


Timer.prototype.reset = function()
{
    this.time_Stamp  = Date.now(); 
}


Timer.prototype.elapsed_Milliseconds = function()
{
    return ( Date.now() - this.time_Stamp );
}

Timer.prototype.elapsed_Seconds = function()
{
     return ( Date.now() - this.time_Stamp) / 1000;
}

