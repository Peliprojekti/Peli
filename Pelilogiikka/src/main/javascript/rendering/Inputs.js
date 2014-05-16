




  var keyMap = {}; 
  

  function kbDown_Event(event) 
  {     
      keyMap[event.keyCode] = true;
  };

  function kbUp_Event(event) 
  {
     keyMap[event.keyCode] = false;
  };
  

  
  
function key_Down( keyCode )
{
    return keyMap[ keyCode ];
}