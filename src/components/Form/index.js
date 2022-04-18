import template from "./index.pug";

 export default class FormAssetsCreator {
    static idGen = parseInt(Math.random() * 1000);

    constructor(data) {

        this.hiddenFields = data.hiddenFields; 
        this.langTmpl = data.langTemplate;
        this.fieldsTmpl = data.fieldsTemplate;
        this.optionsForFilter = data.optionsForFilter;        
        this.el = data.el;
        this.div = data.division;
        this.idGen = ++this.constructor.idGen;    
    }

    render () {     
        this._createFormTemplate (this.hiddenFields, this.fieldsTmpl.fieldsets, this.langTmpl, this.div, this.fieldsTmpl.addedClasses, this.fieldsTmpl.staticValidationRules, this.idGen);
    }

    _createFormTemplate (hiddenFields, fieldsets, langTmpl, div, addedClasses, staticValidationRules, idGen,) {     
        this.el.innerHTML = template({hiddenFields, fieldsets, langTmpl, div, addedClasses, staticValidationRules, idGen});          
      
    }  

}