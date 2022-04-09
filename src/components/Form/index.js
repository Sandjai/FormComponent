import template from "./index.pug";
//import form__fieldset from "./__fieldset/form__fieldset.pug";
//import template__fieldset_field from "./__fieldset/_field/__fieldset_field.pug";



 export default class FormAssetsCreator {

    constructor(data) {
        //this.langTmpl = langTmpl; 
        //this.SMPTmpl = SMPTmpl; 
        this.hiddenFields = data.hiddenFields; 
        this.langTmpl = data.langTemplate;
        this.fieldsTmpl = data.fieldsTemplate;

        //this.fieldsets = fieldsets;
        
        this.el = data.el;
        //this.hiddenFieldsSet;
        


       // this.chooseTemplate ();
     
    }

    render () {
        
        //this.el.innerHTML = tmpl({title, items});  
        this._createFormTemplate (this.hiddenFields, this.fieldsTmpl.fieldsets, this.langTmpl);          
        //return template (this.hiddenFields, ['emailAddress','firstName','lastName','country','elqGlobalLanguage','stateProv'])
       // this.el.innerHTML = _createFormTemplate (this.hiddenFields);     
    }

    _createFormTemplate (hiddenFields, fieldsets, langTmpl) {     
        this.el.innerHTML = template({hiddenFields, fieldsets, langTmpl});  
        
        //return template ({data});
    }
    

    /*_getFormField  (data) {
        return template__Row(data);

    }

    _gethiddenFields() {
        return template__Row("hidden", this.hiddenFieldSet);
    }

    setHiddenFields(data) {
        this.hiddenFieldsSet = data;
    }*/






    



   

}