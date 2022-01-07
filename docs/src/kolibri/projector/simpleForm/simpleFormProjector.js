/**
 * @module projector/simpleForm/simpleFormProjector
 *
 * Following the projector pattern, this module exports projection functions
 * ({@link projectInput} and {@link projectForm}) that create respective views
 * and bind underlying models.
 * Following classical MVC, the binding is available solely through a controller.
 *
 * Projectors are _compositional_. Projecting a form means projecting multiple inputs.
 *
 * Projectors are interchangeable. Any two projectors that export the same functions
 * can be used in place of each other. This can provide a totally different "look & feel"
 * to the application while all business logic and their test cases remain untouched.
 */

import { dom }                     from "../../util/dom.js";
import { timeStringToMinutes,
         totalMinutesToTimeString} from "../projectorUtils.js";

export { projectInput, projectForm, FORM_CSS }

/**
 * String that must be unique in CSS classes and DOM id prefixes throughout the application.
 * @private
 * @type {string}
 */
const FORM_CLASS_NAME = "kolibri-simpleForm";

/**
 * Internal mutable singleton state to produce unique id values for the label-input pairs.
 * @private
 * @type { Number }
 */
let counter = 0;

/**
 * Projection function that creates a view for input purposes, binds the information that is available through
 * the inputController, and returns the generated views.
 * @constructor
 * @template T
 * @impure since calling the controller functions changes underlying models. The DOM remains unchanged.
 * @param  { !SimpleInputControllerType<T> }  inputController
 * @return { [HTMLLabelElement, HTMLInputElement] } - array of label element and input element
 * @example
 * const [labelElement, inputElement] = projectInput(controller);
 */
const projectInput = inputController => {
    const id = FORM_CLASS_NAME + "-id-" + (counter++);
    // create view
    const elements = dom(`
        <label for="${id}"></label>
        <input type="${inputController.getType()}" id="${id}">
    `);
    /** @type {HTMLLabelElement} */ const labelElement = elements[0]; // only for the sake of type casting, otherwise...
    /** @type {HTMLInputElement} */ const inputElement = elements[1]; // ... we would use array deconstruction

    // view and data binding can depend on the type
    if (inputController.getType() === "time") { // "hh:mm" in the vies vs minutes since midnight in the model
        inputElement.onchange = _ => inputController.setValue(timeStringToMinutes(inputElement.value));
        inputController.onValueChanged(val => inputElement.value = totalMinutesToTimeString(val));
    } else
    if (inputController.getType() === "checkbox") { // "checked" attribute vs boolean in model
        inputElement.onchange = _ => inputController.setValue(inputElement.checked);
        inputController.onValueChanged(val => inputElement.checked = val);
    } else {
        inputElement.onchange = _ => inputController.setValue(inputElement.value);
        inputController.onValueChanged(val => inputElement.value = val);
    }

    inputController.onLabelChanged (label => {
        labelElement.textContent = label;
        inputElement.setAttribute("title", label);
    });
    inputController.onNameChanged  (name  => inputElement.setAttribute("name", name));
    inputController.onValidChanged (valid => inputElement.setCustomValidity(valid ? "" : "invalid"));

    return [labelElement, inputElement];
}

/**
 * Projection function that creates a form view for input purposes with as many inputs as the formController
 * contains inputControllers, binds the information and returns the generated form view in an array.
 * Even though not strictly necessary, the return value is an array for the sake of consistency among
 * all view-generating functions.
 * @constructor
 * @impure since calling the controller functions changes underlying models. The DOM remains unchanged.
 * @param  { !SimpleFormControllerType } formController
 * @return { [HTMLFormElement] } - singleton array with form element
 * @example
 * const [form] = projectForm(controller);
 */
const projectForm = formController => {
    // create view
    const elements = dom(`
		<form>
			<fieldset class="${FORM_CLASS_NAME}">
			</fieldset>
		</form>
    `);
    /** @type { HTMLFormElement } */ const form = elements[0];
    const fieldset = form.children[0];

    formController.forEach(inputController => fieldset.append(...projectInput(inputController)));

    return [form];
}

/**
 * CSS snippet to append to the head style when using the form projector.
 * @type { String }
 * @example
 * document.querySelector("head style").textContent += FORM_CSS;
 */
const FORM_CSS = `
    fieldset.${FORM_CLASS_NAME} {        
        padding: 2em;
        display: grid;
        grid-template-columns: max-content max-content;
        grid-row-gap:   .5em;
        grid-column-gap: 2em;     
        border-style:    none;
        box-shadow:      0 4px  8px 0 rgb(0 0 0 / 20%), 
                         0 6px 20px 0 rgb(0 0 0 / 19%);                          
    }
`;