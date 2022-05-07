import template from "./index.pug";

import afterform from "./afterform.pug";

 export default class FormAssetsCreator {
    static idGen = parseInt(Math.random() * 1000);

    constructor(data) {

        this.hiddenFields = data.hiddenFields; 
        this.langTmpl = data.langTemplate;
        this.fieldsTmpl = data.fieldsTemplate;               
        this.el = data.el;
        this.div = data.division;
        this.name = data.name;
        this.idGen = ++this.constructor.idGen;    
        this.settings = data.settings;
        this.selectedItems = data.selectedItems;      
    
      
    }

    updateSettings(key,val) {
        const obj = {...this.defaultOptions, ...this.formOptions};
        this.options = obj;

    }

    _addClasses(arr) {
        for (let cl of arr) {
            this.el.classList.add(cl)
        }       
        
    }

  

    _addSettingsToFormTag() {

        if(this.settings.exclusiveCountry) {
            this.addClass('eloquaExclusiveCountry')
        }

        this._addClasses(this.settings.classes);
        this.el.method="POST";
        this.el.id=this.name;
        this.el.setAttribute("novalidate", "novalidate");
        this.el.style="max-width:768px";
      
        this.el.setAttribute("data-options", `{&quot;submitHandler&quot;:&quot;elqFormHandler&quot;, &quot;vendor&quot;:&quot;${this.settings.vendor}&quot;}`);    
    }


    
    render () {


        
        this._addSettingsToFormTag();
           
        this._createFormTemplate (this.hiddenFields, this.fieldsTmpl.fieldsets, this.langTmpl, this.div, this.fieldsTmpl.addedClasses, this.fieldsTmpl.staticValidationRules, this.idGen, this.selectedItems);
    }

    _createFormTemplate (hiddenFields, fieldsets, langTmpl, div, addedClasses, staticValidationRules, idGen, selectedItems) {      
        
        //this.el.insertAdjacentHTML('beforebegin', preform());
        this.el.insertAdjacentHTML('afterend', afterform({langTmpl}));  

        this.el.innerHTML = template({hiddenFields, fieldsets, langTmpl, div, addedClasses, staticValidationRules, idGen, selectedItems}); 
        
        
      
    }  

}