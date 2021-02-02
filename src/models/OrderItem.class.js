
export default class OrderItem {
    constructor(id, file) {
        this.id = id;
        this.file = file;
        this.base64 = "";
        this.name = file.name.substring(0, 60);
        this.extension = file.name.split('.').pop();
        
        /* CALCULATED BY SERVER */
        this.drawing = null;
        this.thumbnail = "";
        this.area = 0;
        this.perimeter = 0;
        this.closedContours = 0;

        /* MODIFIED BT USER */
        this.quantity = 1;
        this.type = "";
        this.material = "";
        this.thickness = "";
        this.description = "";

        /* FLAGS */
        this.isChecked = true;
        this.isDeleted = false;
        this.isLoading = false;
        this.isError   = false;
    }

    // all variables from cut-options.json
    static options = null;

    // calculates and returns cost
    cost() {
        if (this.isDeleted || this.isLoading || this.isError || 
            !this.isFilled() || !OrderItem.options)
            return 0;

        const pricePerMeter = OrderItem.options.cutPricesForMeter[this.type];
        const pricePerSqMeter = OrderItem.options.materialSquareMeterPrices[this.material];
        const cutOutPrice = OrderItem.options.cutOutPrice;
        const priceMultiplier = (100 + OrderItem.options.serviceExtraProcent) / 100.0;
        const area = this.area.x * this.area.y;

        return (
            (pricePerMeter * this.perimeter +
            pricePerSqMeter * area +
            cutOutPrice * this.closedContours) * priceMultiplier
        ).toFixed(2);
    }

    isFilled() {
        return (this.type && this.material && this.thickness);
    }

    isValid() {
        return (this.isFilled() && !this.isTooLarge() && this.quantity > 0);
    }

    isTooLarge() {
        if (this.type) {
            const maxMeters = OrderItem.options.areaMaxMeters[this.type];
            const maxWidth  = Math.max(...maxMeters);
            const maxHeight = Math.min(...maxMeters);
            const width  = Math.max(this.area.x, this.area.y);
            const height = Math.min(this.area.x, this.area.y);

            return (width > maxWidth || height > maxHeight);
        }
        return false;
    }

    // decodes binary `this.file` from base64 string
    restoreFromBase64(base64) {
        var bytes = window.atob(base64);
        this.base64 = base64;
        this.file = new File([bytes], this.name);
    }

    async encodeBase64() {
        this.base64 = await toBase64(this.file);
        return this.base64;
    }

    // instantiate class without calling a constructor
    static create() {
        return Object.create(this.prototype);
    }
}


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => resolve(btoa(reader.result));
    reader.onerror = error => reject(error);
});
