import template from "./index.pug";
//import form__fieldset from "./__fieldset/form__fieldset.pug";
//import template__fieldset_field from "./__fieldset/_field/__fieldset_field.pug";



 export default class FormAssetsCreator {

    constructor(el, hiddenFields, fieldsets) {
        //this.langTmpl = langTmpl; 
        //this.SMPTmpl = SMPTmpl; 
        this.hiddenFields = hiddenFields; 
        //this.fieldsets = fieldsets;
        
        this.el = el;
        //this.hiddenFieldsSet;
        


       // this.chooseTemplate ();
     
    }

    render () {
        //this.el.innerHTML = tmpl({title, items});  
        this._createFormTemplate (this.hiddenFields, [[['emailAddress','firstName','lastName','country','elqGlobalLanguage','stateProv'], "QA"]]);          
        //return template (this.hiddenFields, ['emailAddress','firstName','lastName','country','elqGlobalLanguage','stateProv'])
       // this.el.innerHTML = _createFormTemplate (this.hiddenFields);     
    }

    _createFormTemplate (data, fieldsets) {     
        this.el.innerHTML = template({data, fieldsets});  
        
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