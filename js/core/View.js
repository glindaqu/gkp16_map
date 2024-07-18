export class View {

    _container = null;

    constructor(parent = null) {
        if (parent != null) {
            this.attachContainer(parent);
        }
    }

    attachContainer(container) {
        this._container = container;
    }

    render() {
        if (this._container == null) {
            throw new Error("Parent container is not attached");
        }
    }
}