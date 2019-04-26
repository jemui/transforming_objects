/**
 * Specifies a Cube. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Cube}
 */
class Cube extends Geometry {
  /**
   * Constructor for Cube.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Cube} Cube created
   */
  constructor(shader,x,y) {
      super(shader,x,y);

      this.vertices = this.generateCubeVertices();
      this.faces = {0: this.vertices};

      var x = (this.x/canvas.width)*2-1;
      var y = (this.y/canvas.height)*-2+1;
      var z = 0.5;


    //    this.translationMatrix = new Matrix4();
    //    this.translationMatrix.setTranslate(x, y, 0);
    //    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

    //  //  Rotate the matrix around object's center
       this.rotationMatrix = new Matrix4();
           this.rotationMatrix.setRotate(-55, 0, 1, 1);
      // this.rotationMatrix.setRotate(-25, 270,270, 0);
       this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);

    //  //  Translate object back for proper rotation
    //    this.translationMatrix.setTranslate(-x, -y, 0);
    //    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    //    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix); 

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCubeVertices() {
      var vertices = []

      var size = document.getElementById("size").value/7;
      // convert to gl coordinates
      var x = (this.x/canvas.width)*2-1;
      var y = (this.y/canvas.height)*-2+1;
      var z = size;

      console.log(x + " " + y + " " +size);

      // front face
      var vertex1 = new Vertex( x+size, y+size, z);  // v0 
      var vertex2 = new Vertex( x-size, y+size , z); // v1
      var vertex3 = new Vertex( x-size, y-size, z); // v2
      var vertex4 = new Vertex( x-size, y-size, z); // v2 
      var vertex5 = new Vertex( x+size, y-size, z); // v3
      var vertex6 = new Vertex( x+size, y+size, z); // v0

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // right face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
      vertex2 = new Vertex( x+size, y+size , z); // v0
      vertex3 = new Vertex( x+size, y-size, z); // v3
      vertex4 = new Vertex( x+size, y-size, z); // v3
      vertex5 = new Vertex( x+size, y-size, -z); // v4
      vertex6 = new Vertex( x+size, y+size, -z); // v5

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // back face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
      vertex2 = new Vertex( x-size, y+size , -z); // v6
      vertex3 = new Vertex( x-size, y-size, -z); // v7
      vertex4 = new Vertex( x-size, y-size, -z); // v7
      vertex5 = new Vertex( x+size, y-size, -z); // v4
      vertex6 = new Vertex( x+size, y+size, -z); // v5

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // left face
      vertex1 = new Vertex( x-size, y+size, -z); // v6 
      vertex2 = new Vertex( x-size, y+size , z); // v1
      vertex3 = new Vertex( x-size, y-size, z); // v2
      vertex4 = new Vertex( x-size, y-size, z); // v2
      vertex5 = new Vertex( x-size, y-size, -z); // v7
      vertex6 = new Vertex( x-size, y+size, -z); // v6

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // top face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
      vertex2 = new Vertex( x-size, y+size , -z); // v6
      vertex3 = new Vertex( x-size, y+size, z); // v1
      vertex4 = new Vertex( x-size, y+size, z); // v1
      vertex5 = new Vertex( x+size, y+size, z); // v0
      vertex6 = new Vertex( x+size, y+size, -z); // v5

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // bottom face
      vertex1 = new Vertex( x+size, y-size, -z); // v4
      vertex2 = new Vertex( x-size, y-size , -z); // v7
      vertex3 = new Vertex( x-size, y-size, z); // v2
      vertex4 = new Vertex( x-size, y-size, z); // v2
      vertex5 = new Vertex( x+size, y-size, z); // v3
      vertex6 = new Vertex( x+size, y-size, -z); // v4

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      return vertices;
  }

  render() {
      // Object's gl coordinates
       var x = (this.x/canvas.width)*2-1;
       var y = (this.y/canvas.height)*-2+1;

       // Translate origin to center of the object and update matrix
       this.translationMatrix = new Matrix4();
       this.translationMatrix.setTranslate(x, y, 0);
       this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

       // Rotate the matrix around object's center
       this.rotationMatrix = new Matrix4();
       this.rotationMatrix.setRotate(-1, 0, 1, 0);
       this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);

       // Translate object back for proper rotation
       this.translationMatrix.setTranslate(-x, -y, 0);
       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
       this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);  


      //  this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);

       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
