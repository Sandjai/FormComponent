import template from "./index.pug";
import form__fieldset from "./__fieldset/form__fieldset.pug";
import template__fieldset_field from "./__fieldset/_field/__fieldset_field.pug";
import '/src/jsData/test-formfields-data-en.js'
import '/src/jsData/test-formfields-data-ru.js'


/**
 * Class for the Form Asset Creation
 * @param {Object} el - Form element
 */


 export default class FormAssetsCreator {

    constructor(name, language) {

        this.name = name;
        this.language = language;
        this.el = document.querySelector(`[name="${name}"]`);
        this.hiddenFieldsSet;
        this.fieldSets = [];


       // this.chooseTemplate ();
     
    }

    render () {
        this.el.innerHTML = _createFormTemplate (this.name, this.language);     
    }

    _createFormTemplate (fieldsets) {
        return template (name, lang);
    }

    _getFormField  (data) {
        return template__Row(data);

    }

    _gethiddenFields() {
        return template__Row("hidden", this.hiddenFieldSet);
    }

    setHiddenFields(data) {
        this.hiddenFieldsSet = data;
    }






    



   

}