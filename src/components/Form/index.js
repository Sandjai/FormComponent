import template from "./index.pug";
//import form__fieldset from "./__fieldset/form__fieldset.pug";
//import template__fieldset_field from "./__fieldset/_field/__fieldset_field.pug";



 export default class FormAssetsCreator {

    constructor(data) {

        this.hiddenFields = data.hiddenFields; 
        this.langTmpl = data.langTemplate;
        this.fieldsTmpl = data.fieldsTemplate;
        this.optionsForFilter = data.optionsForFilter;        
        this.el = data.el;
        this.div = data.division;
     
    }

    render () {        
        this._createFormTemplate (this.hiddenFields, this.fieldsTmpl.fieldsets, this.langTmpl, this.div, this.fieldsTmpl.addedClasses);
    }

    _createFormTemplate (hiddenFields, fieldsets, langTmpl, div, addedClasses) {     
        this.el.innerHTML = template({hiddenFields, fieldsets, langTmpl, div, addedClasses});          
      
    }  

}