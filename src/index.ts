class DraggableDrawboard {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private isDrawing: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;

  constructor(private id: string) {
    this.canvas = document.createElement("canvas");
    this.canvas.id = id;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);

    this.context = this.canvas.getContext("2d");
    this.canvas.addEventListener("mousedown", (e) => this.startDrawing(e));
    this.canvas.addEventListener("mousemove", (e) => this.draw(e));
    this.canvas.addEventListener("mouseup", () => this.stopDrawing());
    this.canvas.addEventListener("mouseout", () => this.stopDrawing());

    document.addEventListener("keypress", (e) => this.toggleBoard(e));
  }

  private startDrawing(e: MouseEvent) {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }

  private draw(e: MouseEvent) {
    if (!this.isDrawing) return;
    if (!this.context) return;

    this.context.beginPath();
    this.context.moveTo(this.lastX, this.lastY);
    this.context.lineTo(e.offsetX, e.offsetY);
    this.context.stroke();
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }

  private stopDrawing() {
    this.isDrawing = false;
  }

  private toggleBoard(e: KeyboardEvent) {
    if (e.key === "e") {
      this.canvas.style.display =
        this.canvas.style.display === "none" ? "block" : "none";
    }
  }
}

// Usage:
new DraggableDrawboard("myDrawboard");
