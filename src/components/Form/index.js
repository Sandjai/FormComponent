import template from "./index.pug";

import afterform from "./afterform.pug";

 export default class FormAssetsCreator {
    static idGen = parseInt(Math.random() * 1000);
    static busPhoneExist = false;
    

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

    

      //  if (this.settings.busPhone) {
      //  this._cssDynamicLoading('//img04.en25.com/Web/3MCompanyGlobal/{f77caf4c-e036-42f5-bc54-cb04586a9798}_intlTelInput.css?update=8');
      //  this._scriptDynamicLoading('//img04.en25.com/Web/3MCompanyGlobal/{443ec907-e8eb-46f4-984a-7166c37b2d9b}_intlTelInput.js?update=8', this.el.closest('div'), true).onload = ()=> {
        //   this._scriptDynamicLoading('//img04.en25.com/Web/3MCompanyGlobal/%7B80439e2b-4bf7-49b4-ac6b-713f2f163347%7D_AJ_HELPER_intlTelInput__STRIPPED__Minified.js?update=8', this.el.closest('div'), true).onload = () => {
         //   alert(domReady.CTUTEL);
         //  };
          
        } 
        
          //  this.loadScript(busPhoneScripts);
             
               


       //  }

   
      
  //  }
    


    _scriptDynamicLoading(url, targetEl, ifAsync) {
        let jsScript = document.createElement('script');
        jsScript.src = url;
        jsScript.crossorigin = "anonymous";
        jsScript.async = ifAsync;
        targetEl.append(jsScript);

        return jsScript;
    }

    _cssDynamicLoading(url) {
        let elem = document.createElement( 'link' );
        elem.rel = 'stylesheet';
        elem.type = 'text/css';
        document.body.appendChild( elem );
        elem.href = url;
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
        this.el.style="max-width:767px";
      
        this.el.setAttribute("data-options", `{&quot;submitHandler&quot;:&quot;elqFormHandler&quot;, &quot;vendor&quot;:&quot;${this.settings.vendor}&quot;}`);    
    }

   _busPhoneSettings(country) {

        if (this.settings.busPhone && !this.constructor.busPhoneExist) {
            
            this.constructor.busPhoneExist = true;

  // edit to match the IDs on your page
  window.busPhoneid = `#busPhoneID-${this.idGen}`; // Enter this for the first form on the page
  window.countryselectid = `#countryID-${this.idGen}`; // Enter this for the first form on the page
  
  // adjust as needed
  //window.prefCountries = [country]; // these will appear at the top of the list the first must match the pre-selected country in the form
  //window.placeholderphoneformat = "FIXED_LINE"; // can be "MOBILE" or "FIXED_LINE"
  //window.validationtype = "SOFT"; // can be "SOFT" or "HARD" - Soft = form will submit with a missing or invalid number.  Hard = form will not submit with a missing or invalid number.
  
  //this._scriptDynamicLoading('//img04.en25.com/Web/3MCompanyGlobal/%7B80439e2b-4bf7-49b4-ac6b-713f2f163347%7D_AJ_HELPER_intlTelInput__STRIPPED__Minified.js?update=8', document.body);
               
    }
}

    
    render () {        
        this._addSettingsToFormTag();           
        this._createFormTemplate (this.hiddenFields, this.fieldsTmpl.fieldsets, this.langTmpl, this.div, this.fieldsTmpl.addedClasses, this.fieldsTmpl.staticValidationRules, this.idGen, this.selectedItems);
        
        //this._busPhoneSettings();        
    }

    _createFormTemplate (hiddenFields, fieldsets, langTmpl, div, addedClasses, staticValidationRules, idGen, selectedItems) {      
        
        //this.el.insertAdjacentHTML('beforebegin', preform());
        this.el.insertAdjacentHTML('afterend', afterform({langTmpl}));  

        this.el.innerHTML = template({hiddenFields, fieldsets, langTmpl, div, addedClasses, staticValidationRules, idGen, selectedItems}); 
        
        
      
    }  

}
