    uniform mat4 worldMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projMatrix;

    // Vertex attributes
    attribute vec3    vertexPos;
    
    void main(void) 
    {
    gl_Position    = projMatrix * worldViewMatrix * vec4(vertexPos, 1.0);
    }
    
