/**
 * Specifies a Square. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Square} Square created
   */
  constructor(shader,x,y) {
      super(shader,x,y);

      this.vertices = this.generateSquareVertices();
      this.faces = {0: this.vertices};
                // {1: [3,4,5]}
      this.rot = 5;

      this.identityMatrix = new Matrix4();
      this.identityMatrix.setIdentity();

     // Rotate about the z axis
     this.rotationMatrix = new Matrix4();
     this.rotationMatrix.setRotate(-1,0,0,1);

   //   this.translationMatrix = new Matrix4();
    //  this.translationMatrix.setTranslate(1.0,0.05,0);


/*
Easy way of building the rotation matrix:

    Start with an identity matrix
    Translate the matrix by -centre of the object
    Rotate the matrix by the desired amount
    Translate the matrix by centre of the object
    Use the resulting matrix to transform the object that you desire to rotate
*/

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices() {
      var vertices = []

      // convert to gl coordinates
      var x = (this.x/canvas.width)*2-1;
      var y = (this.y/canvas.height)*-2+1;
      var z = 0.0;

      var size = document.getElementById("size").value/15;

      console.log(x + " " + y);
      // rotate object around center
      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(x, y, 0);
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
      
      // var xR = (x*y) + (y*x);
      // var yR = (y*y) - (x*x);

    //  this.rotationMatrix = new Matrix4();
      //this.rotationMatrix.setRotate(3, x, y, 0); // close
     // this.rotationMatrix.setRotate(3, xR, yR, 0);
//  console.log(Math.cos(x));
      var vertex1 = new Vertex( x+size, y+size, z);
      var vertex2 = new Vertex( x-size, y+size , z);
      var vertex3 = new Vertex( x-size, y-size, z);
      var vertex4 = new Vertex( x-size, y-size, z);
      var vertex5 = new Vertex( x+size, y-size, z);
      var vertex6 = new Vertex( x+size, y+size,z);

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      return vertices;
  }

  // rotate the square 
  render() {
//      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
  //    this.modelMatrix = this.modelMatrix.multiply(this.identityMatrix);
      this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
      this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
