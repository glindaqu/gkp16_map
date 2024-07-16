import { View } from "./View.js";

/**
 * Class represent data-driven layer of application
 * @property dataSource Data, got while initializing. Null by default
 * @method init Initialize data source by fetch request 
 */
export class Application {

    #json = null;
    #view = null;

    /**
     * Makes request by specified url and saves response as dataSource
     * If response is null throws new exception. Order call stack: init -> setView -> run
     * 
     * @param {string} url 
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

    setView(view) {
        if (view == null || !view.prototye instanceof View) {
            throw new Error("View does not extends base View class");
        }
        this.#view = view;
    }

    run() {
        if (this.#view == null || this.#json == null) {
            throw new Error("View or data source is null. Initialize it before");
        }
        this.#view.render(this.#json);
    }

    get dataSource() {
        return this.#json;
    }

    get view() {
        return this.#view;
    }
}