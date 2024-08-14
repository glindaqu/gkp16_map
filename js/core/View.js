/**
 * Base class, representation of view. It must include 
 * render method and attach container method. Container - HTML DOM element,
 * in which the render will adds new content
 * 
 * @method render Adds new content in the view and deleting
 * old one
 * 
 * @method attachContainer Saving DOM element for content adding.
 * Null by default, if it still null, when render calls, throws 
 * exception
 * 
 * @author glindaqu
 */
export class View {

    _container = null;

    /**
     * @param {Element} parent Container for render. The same as 
     * attachContainer call. Null by default
     * 
     * @author glindaqu
     */
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