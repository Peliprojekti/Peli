

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
  
  
  
  function register_Inputs()
  {
     document.onkeydown = kbDown_Event;
     document.onkeyup   = kbUp_Event; 
  }
       