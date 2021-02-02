import GridHelper from './GridHelper';


export default class CanvasHelper {

    constructor(context, drawing, canvasRef) {
        this.drawing = this.invertYAxis(JSON.parse(JSON.stringify(drawing)));
        this.ctx = context;
        this.canvasRef = canvasRef;

        this.resize();

        // this is not a React state
        this.state = {
            scale: 3.0, 
            offX: this.canvasRef.current.width / 2,
            offY: this.canvasRef.current.height / 2
        }

        this.grid = new GridHelper(this.ctx, this.state);
        this.drawFrame();
    }

    resize () {
        if (window.innerWidth < 768) {
            this.canvasRef.current.height = window.innerHeight;
            this.canvasRef.current.width = window.innerWidth;    
        } else {
            this.canvasRef.current.height = window.innerHeight - 100;
            this.canvasRef.current.width = window.innerWidth - 300;
        }
        if (this.grid)
            this.drawFrame();
    }

    drawFrame () {
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.grid.draw();
        this.drawPlot();
        this.ctx.restore();
    }

    drawPlot () {
        const ctx = this.ctx,
              offX = this.state.offX,
              offY = this.state.offY,
              scale = this.state.scale;

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;

        this.drawing.forEach(el => {
            ctx.beginPath();
            switch (el[0]) {
                case "line":
                    ctx.moveTo(scale * el[1] + offX, scale * el[2] + offY);
                    ctx.lineTo(scale * el[3] + offX, scale * el[4] + offY);
                    break;
                case "circle":
                    ctx.arc(scale * el[1] + offX, scale * el[2] + offY, scale * el[3], 0, 2 * Math.PI);
                    break;
                case "arc":
                    ctx.arc(scale * el[1] + offX, scale * el[2] + offY, scale * el[3], el[4], el[5]);
                    break;
                case "spline":
                    ctx.moveTo(scale * el[1][0] + offX, scale * el[1][1] + offY);
                    for (let j = 1; j < el.length - 1; j++) {
                        ctx.quadraticCurveTo(
                            scale * el[j][0] + offX,
                            scale * el[j][1] + offY,
                            scale * el[j + 1][0] + offX,
                            scale * el[j + 1][1] + offY
                        );
                    }
                    break;

                default:
                    break;
            }
            ctx.stroke();
        });

    }
    
    scale(delta) {
        const minScaleLim = 0.1, 
              maxScaleLim = 30.0;
        var scale = this.state.scale;

        scale -= delta * 0.1 * Math.sqrt(scale);
        if (scale < minScaleLim) scale = minScaleLim;
        if (scale > maxScaleLim) scale = maxScaleLim;

        this.state.scale = scale;
        this.grid.setScale(scale);
        window.requestAnimationFrame(() => { this.drawFrame() });
    }

    move (x, y) {
        this.state.offX += x;
        this.state.offY += y;
        this.grid.setOffset(this.state.offX, this.state.offY);
        window.requestAnimationFrame(() => { this.drawFrame() });
    }

    invertYAxis(data) {
        data.forEach(el => {
            switch (el[0]) {
                case "line":
                    el[2] *= -1;
                    el[4] *= -1;
                    break;
                case "circle":
                    el[2] *= -1;
                    break;
                case "arc":
                    el[2] *= -1;
                    el[4] = 2 * Math.PI - this.degToRad(el[4]);
                    el[5] = 2 * Math.PI - this.degToRad(el[5]);
                    [el[4], el[5]] = [el[5], el[4]];
                    break;
                case "spline":
                    for (let i = 1; i < el.length; i++)
                        el[i][1] *= -1;
                    break;
                default:
                    break;
            }
        });
        return data;
    }

    degToRad(deg) {
        return deg * Math.PI / 180;
    }
}
