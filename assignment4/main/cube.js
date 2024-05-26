// cube.js
export class Cube {
    constructor(gl, a_Position, a_TexCoord, a_Normal, program) {
        this.gl = gl;
        this.a_Position = a_Position;
        this.a_TexCoord = a_TexCoord;
        this.a_Normal = a_Normal;
        this.program = program;

        this.vertexBuffer = this.initVertices();
        this.normalBuffer = this.initNormals();
    }

    initVertices() {
        const vertices = [
            // Front face
            -1.0, -1.0,  1.0, 1, 0,
             1.0, -1.0,  1.0, 1, 1,
             1.0,  1.0,  1.0, 0, 1,
            -1.0, -1.0,  1.0, 1, 0,
             1.0,  1.0,  1.0, 0, 1,
            -1.0,  1.0,  1.0, 0, 0,

            // Back face
             1.0, -1.0, -1.0, 1, 0,
            -1.0, -1.0, -1.0, 0, 0,
            -1.0,  1.0, -1.0, 0, 1,
             1.0, -1.0, -1.0, 1, 0,
            -1.0,  1.0, -1.0, 0, 1,
             1.0,  1.0, -1.0, 1, 1,

            // Top face
            -1.0,  1.0, -1.0, 0, 0,
             1.0,  1.0, -1.0, 1, 0,
             1.0,  1.0,  1.0, 1, 1,
            -1.0,  1.0, -1.0, 0, 0,
             1.0,  1.0,  1.0, 1, 1,
            -1.0,  1.0,  1.0, 0, 1,

            // Bottom face
            -1.0, -1.0, -1.0, 1, 1,
             1.0, -1.0, -1.0, 0, 1,
             1.0, -1.0,  1.0, 0, 0,
            -1.0, -1.0, -1.0, 1, 1,
             1.0, -1.0,  1.0, 0, 0,
            -1.0, -1.0,  1.0, 1, 0,

            // Right face
             1.0, -1.0, -1.0, 1, 0,
             1.0,  1.0, -1.0, 1, 1,
             1.0,  1.0,  1.0, 0, 1,
             1.0, -1.0, -1.0, 1, 0,
             1.0,  1.0,  1.0, 0, 1,
             1.0, -1.0,  1.0, 0, 0,

            // Left face
            -1.0, -1.0, -1.0, 0, 0,
            -1.0,  1.0, -1.0, 1, 0,
            -1.0,  1.0,  1.0, 1, 1,
            -1.0, -1.0, -1.0, 0, 0,
            -1.0,  1.0,  1.0, 1, 1,
            -1.0, -1.0,  1.0, 0, 1
        ];

        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        return vertexBuffer;
    }

    initNormals() {
        const normals = [
            // Front face normals
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
    
            // Back face normals
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
    
            // Top face normals
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
    
            // Bottom face normals
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
    
            // Right face normals
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
    
            // Left face normals
           -1.0,  0.0,  0.0,
           -1.0,  0.0,  0.0,
           -1.0,  0.0,  0.0,
           -1.0,  0.0,  0.0,
           -1.0,  0.0,  0.0,
           -1.0,  0.0,  0.0
        ];
    
        const normalBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normals), this.gl.STATIC_DRAW);
        return normalBuffer;
    }
    

    render() {
        this.gl.useProgram(this.program);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

        const stride = 5 * Float32Array.BYTES_PER_ELEMENT;
        this.gl.vertexAttribPointer(this.a_Position, 3, this.gl.FLOAT, false, stride, 0);
        this.gl.enableVertexAttribArray(this.a_Position);
        this.gl.vertexAttribPointer(this.a_TexCoord, 2, this.gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);
        this.gl.enableVertexAttribArray(this.a_TexCoord);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
        this.gl.vertexAttribPointer(this.a_Normal, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.a_Normal);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 36);
    }
}
