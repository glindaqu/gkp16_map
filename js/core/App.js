import { View } from "./View.js";

/**
 * Class represent data-driven layer of application
 * 
 * @property dataSource Data, got while initializing. Null by default
 * @property view View for render
 * 
 * @method init Initialize data source by fetch request 
 * @method setView Sets view for render
 * @method run Calls render method from view
 * @method sortView Sorts json and calls render
 * @mathod filterView Filters json and calls render
 * 
 * @author glindaqu
 */
export class Application {

    #json = null;
    #view = null;

    /**
     * Makes request by specified url and saves response as dataSource
     * If response is null throws new exception. Order call stack: init -> setView -> run
     * 
     * @param {string} url 
     * 
     * @returns void
     * 
     * @author glindaqu
     */
    async init(url) {
        await fetch(url)
            .then(response => response.json())
            .then(json => {
                if (json == null) {
                    throw new Error("Data source returned invalid result");
                }
                this.#json = json;
            });
    }

    /**
     * Sets view for calling it render function. Also app 
     * provides data for render function. Throws new exception if given
     * view instance is not implements View
     * 
     * @param {View} view Instance of base View class  
     * 
     * @returns void
     * 
     * @author glindaqu
     */
    setView(view) {
        if (view == null || !view.prototye instanceof View) {
            throw new Error("View does not extends base View class");
        }
        this.#view = view;
    }

    /**
     * Calls render function of a view. If view or data source is
     * null, throws exception
     * 
     * @returns void
     * 
     * @author glindaqu
     */
    run() {
        if (this.#view == null || this.#json == null) {
            throw new Error("View or data source is null. Initialize it before");
        }
        this.#view.render(this.#json);
    }

    /**
     * Getter for json class field
     * 
     * @returns { Array[Object] }
     * 
     * @author glindaqu 
     */
    get dataSource() {
        return this.#json;
    }

    /**
     * Getter for view class field
     * 
     * @returns {View}
     * 
     * @author glindaqu
     */
    get view() {
        return this.#view;
    }

    /**
     * Function filters base json array, not changing it. Filters works
     * only on UI layer. Throws new exception, if callback is not a function
     * 
     * @param {Function} filter Callback for filter data source 
     * 
     * @returns void
     * 
     * @author glindaqu
     */
    filterView(filter) {
        if (!(filter instanceof Function)) {
            throw new Error("Filter must be a function");
        }   
        this.#view.render(this.#json.filter(el => filter(el)));
    }

    /**
     * Function sorts base json array changing it and calls view render function.
     * If sort is not a function - throws new exception
     * 
     * @param {Function} sort Sorting function
     * 
     * @returns void
     * 
     * @author glindaqu 
     */
    sortView(sort) {
        if (!(sort instanceof Function)) {
            throw new Error("Filter must be a function");
        }
        this.#json = this.#json.sort((a, b) => sort(a, b));
        this.run();
    }
}