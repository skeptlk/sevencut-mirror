
export default class OrderItemDTO {
    constructor(base) {
        this.fileBytes = base['base64'];
        this.fileName = base['name'];
        this.quantity = base['quantity'];
        this.type = base['type'];
        this.material = base['material'];
        this.thickness = base['thickness'];
        this.description = base['description'];
    }
}
