
export default class GridHelper {

    constructor(context, { offX, offY, scale }) {
        this.context = context;
        this.canvasOffsetX = offX;
        this.canvasOffsetY = offY;
        this.scale = scale;
        this.baseGap = 5 * scale;
    }

    setScale(scale) {
        this.scale = scale;
        this.baseGap = 5 * scale;
        if (this.baseGap > 80) this.baseGap /= 10;
        if (this.baseGap < 6) this.baseGap *= 10;
    }

    setOffset(offX, offY) {
        this.canvasOffsetX = offX;
        this.canvasOffsetY = offY;
    }

    draw() {
        const ctx = this.context;
        const mrg = 0;
        const w = this.context.canvas.width;
        const h = this.context.canvas.height;
        var gap = this.baseGap;
        var start = 0;

        // ctx.fillStyle = "#2c78c1";
        ctx.fillStyle = "#14181C";
        ctx.fillRect(0, 0, w, h);
    
        ctx.strokeStyle = "rgb(255, 255, 255, 0.2)";
    
        // vertical lines
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        start = mrg + this.canvasOffsetX % gap;
        for (let offset = start; offset < w - mrg; offset += gap) {
            ctx.moveTo(offset, mrg);
            ctx.lineTo(offset, h - mrg);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 2;
        start = mrg + this.canvasOffsetX % (10 * gap);
        for (let offset = start; offset < w - mrg; offset += 10 * gap) {
            ctx.moveTo(offset, mrg);
            ctx.lineTo(offset, h - mrg);
        }
        ctx.stroke();
    
        // horizontal lines
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        start = mrg + this.canvasOffsetY % gap;
        for (let offset = start; offset < h - mrg; offset += gap) {
            ctx.moveTo(mrg, offset);
            ctx.lineTo(w - mrg, offset);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 2;
        start = mrg + this.canvasOffsetY % (10 * gap);
        for (let offset = start; offset < h - mrg; offset += 10 * gap) {
            ctx.moveTo(mrg, offset);
            ctx.lineTo(w - mrg, offset);
        }
        ctx.stroke();
    }

};
