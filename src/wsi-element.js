/* eslint no-console: 0 */
export default class WSIElement extends HTMLElement {
    connectedCallback() {
        if (this.shouldFetchDataFromParent) {
            // Fetch component data from parent component
            this.retrieveParentData();
        }

        if (typeof this.onConnecting === "function") {
            this.onConnecting();
        }

        // Process required attributes (if any)
        let requiredAttributeErrors = this.processRequiredAttributeData();
        if (requiredAttributeErrors.length === 0) {
            // Render the component
            this.render();

            if (this.connectedViaTemplate && typeof this.onConnectedViaTemplate === "function") {
                this.onConnectedViaTemplate();
            }

            if (typeof this.onConnected === "function") {
                this.onConnected();
            }
        } else {
            // Required attributes not present - Don't render a broken component
            console.warn("Required attributes for component have not been provided, component failed to render. Required Attributes: " + requiredAttributeErrors.join(","));
            if (typeof this.onRequiredAttributeFailure === "function") {
                this.onRequiredAttributeFailure(requiredAttributeErrors);
            }
        }
    }

    /**
     * Function that renders the component.
     * A dynamic template (HTML Template with id) takes precedence over the
     * component template.
     **/
    render() {
        let resolvedSlots = false;

        // If a template id is provided, treate the html node as the template
        if (this.templateId) {
            let template = document.getElementById(this.templateId);
            this.templateString = template.innerHTML;
            this.connectedViaTemplate = true;
        }

        // creates "virtual" containers to render the template strings into HTML
        const SLOT = document.createElement("div");
        const TEMPLATE = document.createElement("div");

        SLOT.innerHTML = this.innerHTML;
        TEMPLATE.innerHTML = this.templateString;

        // iterates over a list of nodes and passes each node off to resolve slots
        const checkNodes = (nodes_) => {
            for (let i = 0; i < nodes_.length; i++) {
                setSlots(nodes_[i]);
            }
        }

        // passes a node to a method to set the slot's html, this will occur recursively until
        // a slot node is found and it's contents are resolved or there are no more child nodes
        // remaining.
        const setSlots = (node_) => {
            setSlot(node_);

            if (node_.childNodes && node_.childNodes.length && !resolvedSlots) {
                checkNodes(node_.childNodes);
            }
        }

        // checks to see if the node is a slot node, if the component's slot has not been
        // resolved yet, the method resolves the slot by setting the innerHTML of the slot
        // to the innerHTML of this instance's "virtual" slot.
        const setSlot = (node_) => {
            if (!resolvedSlots && node_.nodeName === "SLOT") {
                node_.innerHTML = SLOT.innerHTML;

                resolvedSlots = true;
            }
        }

        // if a list of child nodes is present, pass them to a method to check and set slots.
        if (TEMPLATE.childNodes && TEMPLATE.childNodes.length) {
            checkNodes(TEMPLATE.childNodes);
        }

        // after all processing is finished, we take the DOM from the components "virtual"
        // representation and apply that as the component's final HTML structure before declaring
        // the component as connected.
        this.innerHTML = TEMPLATE.innerHTML;
        this.connected = true;
    }

    /**
     * Function to traverse the DOM and find a component which is willing
     * to provide the necessary data.
     * Once found, call onParentData.
     **/
    retrieveParentData() {
        this.rootElement = this.rootElement || this.getRootElement(this, this.dataType);
        let parentData = this.rootElement ? this.rootElement.getData() : {};
        if (typeof this.onParentData === "function") {
            this.onParentData(parentData);
        }
    }

    /**
     * A broken component should not be rendered; hence, process the required
     * attribute list. Push the errors into an array.
     * @return {Array} requiredAttributeErrors Array of errors
     **/
    processRequiredAttributeData() {
        let requiredAttributeErrors = [];
        if (Array.isArray(this.requiredAttributes)) {
            this.requiredAttributes.forEach((requiredAttribute) => {
                if (this[requiredAttribute] === null ||
                    this[requiredAttribute] === "null" ||
                    typeof this[requiredAttribute] === "undefined") {
                    requiredAttributeErrors.push(requiredAttribute);
                    return false;
                }
                return true;
            });
        }
        return requiredAttributeErrors;
    }

    /**
     * Function to get the root element - the element which provides the data.
     * @returns {Element} rootNode root element
     **/
    getRootElement(element, dataType) {
        let rootNode = element.parentNode;
        while (rootNode !== null) {
            if (typeof rootNode.getData === "function") {
                if (!dataType) {
                    return rootNode;
                } else if (rootNode.dataType === dataType) {
                    return rootNode;
                }
            }
            rootNode = rootNode.parentNode;
        }
        return rootNode;
    }

    /**
     * Function to set dyanmic props. All the provided props are attached to the
     * element. It is expected that the incoming data adheres to the contract
     * defined by the child.
     * @param {Object} newProps props to be attached
     **/
    set props(newProps) {
        for (let property in newProps) {
            if (newProps.hasOwnProperty(property)) {
                this[property] = newProps[property];
            }
        }
    }

    /** Getters/Setters **/

    get templateId() {
        return this.getAttribute("templateId");
    }
    set templateId(newValue) {
        if (newValue) {
            this.setAttribute("templateId", "");
        } else {
            this.removeAttribute("templateId");
        }
    }
    get shouldFetchDataFromParent() {
        return this.hasAttribute("shouldFetchDataFromParent");
    }
    set shouldFetchDataFromParent(newValue) {
        if (newValue) {
            this.setAttribute("shouldFetchDataFromParent", "");
        } else {
            this.removeAttribute("shouldFetchDataFromParent");
        }
    }
    get dataType() {
        return this.getAttribute("dataType");
    }
    set dataType(newValue) {
        if (newValue) {
            this.setAttribute("dataType", newValue);
        } else {
            this.removeAttribute("dataType");
        }
    }

    /**
    * register element and avoid duplicate registrations for extended elements
    * @param {String} tag - custom element tag name
    * @param {Function} className - module className
    * @param {String} nativeElement - if extending native HTML element, i.e. <button>
    */
    static defineElement(tag, className, nativeElement = "") {
        if (!customElements.get(tag)) {
            if (!nativeElement) {
                customElements.define(tag, className);
            } else {
                customElements.define(tag, className, { extends: nativeElement });
            }
        }
    }
}
// export static function for component imports
export const defineElement = WSIElement.defineElement;
