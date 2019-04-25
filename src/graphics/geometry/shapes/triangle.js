var count = 1;
var count2 = 0;
/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, x, y) {
      super(shader, x, y);

      this.vertices = this.generateTriangleVertices();
      this.faces = {0: [0, 1, 2]};
      this.rot = 0;

      this.rotationMatrix = new Matrix4();
      this.rotationMatrix.setRotate(5,0,0,1);

      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(0,0.05,0);

      this.scalingMatrix = new Matrix4();
      this.scalingMatrix.setScale(0.25, 0.25, 0.25);

      this.scaleUp = true;

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices() {
      var vertices = []

      // convert to gl coordinates
      var x = (this.x/canvas.width)*2-1;
      var y = (this.y/canvas.height)*-2+1;

      var size = document.getElementById("size").value/15.0;

      console.log(x + " " + y + " size: "+ size);

      var vertex0 = new Vertex(x-size, y-size, 0.0);
      var vertex1 = new Vertex(x+size, y-size, 0.0);
      var vertex2 = new Vertex(x     , y+size, 0.0);

      vertices.push(vertex0);
      vertices.push(vertex1);
      vertices.push(vertex2);

      return vertices;
   }

   render() {
      // this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
       //++count; 

       // scale triangle up until 3
       if(count % 3 == 0) {
         this.scalingMatrix.setScale(1.5, 1.5, 1.5);
         count2++;
         console.log("count2 " + count2);
       } 
       if (count2 % 3 == 0) { 
         this.scalingMatrix.setScale(0.25, 0.25, 0.25);
         count++;
         console.log("count " + count);
       }


    //    // scale triangle down 
    //    if(count <= 4 && scaleUp == false) {
    //        this.scalingMatrix.setScale(0.25, 0.25, 0.25);
    //        count--;
    //    } else if (count == 0) {
    //        this.scaleUp = true;
    //    }
       
       
       // this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
       this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrix);

       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
   }
}