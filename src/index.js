'use strict'

import FormValidationRules from './components/validation/index.js'
import DisplayFormFields from './components/display/index.js'
import FormAssetsCreator from './components/Form/index.js'
import langTemplate from './configTemplates/language/index.js'
import smpTemplate from './configTemplates/smp/index.js'
import baseFieldsTemplate from './configTemplates/noSMP/index.js'
import ifMQLformType from './utils/ifMQLformType.js'
import getLanguage from './utils/getLanguage.js'
import getCountry from './utils/getCountry.js'

export class FormComponent {

    customizedSelectOptions = {};
    division = "";             
    fieldsets = [];
    validationRules;
    _optionalNames = [];
    displayRules;      
    optionsForFilter = {};
    addedFields;      
    static langTmpl;
    fieldsTmpl; 
    selectedItems = {
        country: this._identifyLocale('country')
    }
    formSettings = {
        direct: false,
        exclusiveCountry: false,   
        classes: ['cmxform', 'js-subvalidate', 'js-emailform', 'mmmMailForm', 'eloquaForm', 'eloquaGlobalForm'],
    }
    
 

    constructor (name) {       
        this.name = name; 
        this.el = document.querySelector(`[name="${name}"]`);
        
        this.hiddenFields = {
            form_key: "mmm",
            elqFormName: name,
            elqSiteId: "837031577",
            elqCampaignId: "",
            traditionalMarketingOptIn: "",
            trackingCode1: "",
            sFDCLastCampaignName: "",
            sFDCLastCampaignID: "",
            sFDCLastCampaignStatus: "",
            leadSourceMostRecent1: name,
            leadSourceDetailMostRecent1: "Website",
            gclidMostRecent: "",
            adobeECID: "",
            leadSourcePageTitleMostRecent1: "",
            language1: this._identifyLocale('language'),
            division1: this._identifyDivision(),
            eloquaFormURL: "",           
            FormType: "",
            SMPVersion: ""
            
        };     
     
    }    

    _identifyDivision (){
        const name = 'DCSext.CDC';
        return document.getElementsByTagName('meta')[name].getAttribute("content");
    }
    
    _identifyLanguage() {
        return getLanguage(document.documentElement.getAttribute('lang'));
    }

    _identifyLocale(par) {

        const name = 'DCSext.locale';
        const val = document.getElementsByTagName('meta')[name].getAttribute("content");

        if (par === 'country') {
            return getCountry(val.slice(val.indexOf('_') + 1));

        }
        if (par === 'language') {
            return getLanguage(val.slice(0, val.indexOf('_')));    
        }
    }

    setLanguageTemplate(LanguageTemplate) {
        this.constructor.langTmpl = LanguageTemplate;
    }

    setHiddenFields (data) {
        (Object.entries(data)).forEach((item) => {
            this.hiddenFields[item[0]] = item[1];
        })
    }

    addFieldset (id, arr) {
        this.fieldsets[id].push(arr);       
    }

    addClass (item, cl) {
        this.fieldsets.addedClasses[item] = cl;
    }

    _scriptDynamicLoading (url) {
        let jsScript = document.createElement('script');
        jsScript.src = url;
        jsScript.crossorigin="anonymous";
        jsScript.async = false;
        document.head.append(jsScript);

        return jsScript;
    }

    _mergeFilterOptions() {

        
        for (let key of Object.keys(this.customizedSelectOptions)) {

            const arrAll = this.constructor.langTmpl[key].options
        const arrCustomOpts = this.customizedSelectOptions[key];

        const filteredOptions = arrAll.filter((opt) => {
           return  arrCustomOpts.indexOf(opt[0]) != -1;           
        }) 
        

        this.constructor.langTmpl[key].options.all = filteredOptions;

             
        }
        
    }

   _mergeFieldsets() {       
        for (let [key,val] of Object.entries(this.fieldsTmpl.fieldsets)) {
            this.fieldsTmpl.fieldsets[key] = Array.from(new Set([...val, ...this.fieldsets]));           
        }
    }

    _mergeStaticValidationRules() { 
        
        if (this.fieldsTmpl.staticValidationRules) {
            const obj = {...this.fieldsTmpl.staticValidationRules, ...this.staticValidationRules};
            this.fieldsTmpl.staticValidationRules = obj;
        } else {
            this.fieldsTmpl.staticValidationRules = this.staticValidationRules;
        }
        
    }

    _getOptionalNamesArr() {
        
        for (let key of Object.keys(this.fieldsTmpl.staticValidationRules)) {
           
           if ((this.fieldsTmpl.staticValidationRules[key] === 'false') || (this.fieldsTmpl.staticValidationRules[key] == false)) {
                this._optionalNames.push(key);
            }
            
        }
      
    }
    

    consoleFieldsets() {
        console.log(this.fieldsets);
    }

    updateFieldset(id, arr) {
        this.fieldsets.id = arr;
    }
    
    removeField(fieldsetId, name) {
        const index = this._getIndexByName(this.fieldset[fieldsetId], name);
        this.fieldset[fieldsetId].splice([index], 1);
    }

    _getIndexByName (arr,name) {
        arr.findIndex((i)=>{
            i === name;
        })
    }

  /*  _selectOptions() {
        for (let [item, value] of Object.entries(this.selectedItems)) {
            let select = document.querySelector(`[name="${item}"]`);
           
        }
    } */
/*
    newField(data = {label: '', errMessage: '', type: '', options: '', fieldName: '', classToLiWrapper: ""}) {
       
        /* to add fields, and then merge with lang template. Afterwards is needed to update routing in order to exclude possible crossing of values (names)
        this.constructor.langTmpl.customFields[fieldName] =  {
            label: data.label,
            errMessage: errMessage,           
            type: type,
            options: options,
            classToLiWrapper: ""
        }

        this.DisplayFormFields.addedClasses[fieldName] = '' {
        
    }
*/
/*
    addField(name, toPlaceAfter, fieldsetId) {
       /*connected with comment in prev method
       const index = this._getIndexByName (this.fieldsets[fieldsetId],toPlaceAfter)
        this.fieldsets[fieldsetId].splice((index + 1), 0, name);
    }


    staticOptionalFields(...fields) {        
        for (let field of fields) {
            this.staticValidationRules[field] = 'false';
        }
    }

    staticMandatoryFields(...fields) {
        for (let field of fields) {
            this.staticValidationRules[field] = 'true';
        }       
    }

*/

/*
addFormCSSClass(cl) {
    this.formSettings.classes.push(cl);
}

rewriteFormCSSClasses([classes]) {
    this.formSettings.classes = classes;
}
*/

    

    render() {
        const initLang = new Promise((resolve) => {
            let langTmpl = langTemplate(this.hiddenFields.language1);
            this._scriptDynamicLoading(langTmpl).onload = () => {  
                this.constructor.langTmpl = __globScopeLanguageTemplate__;        
                resolve();
        }
    })

        const initFields = new Promise((resolve) => {

            if(ifMQLformType(this.hiddenFields.FormType)) {
                const smpTmpl= smpTemplate(this.hiddenFields.division1);             
                this._scriptDynamicLoading(smpTmpl).onload = () => {          
                    this.fieldsTmpl = __globScopeSMPtemplate__;
                    resolve();   
                 }
                } else {
                    const baseTmpl= baseFieldsTemplate();             
                this._scriptDynamicLoading(baseTmpl).onload = () => {          
                    this.fieldsTmpl = __globScopeBaseFieldstemplate__;
                    resolve();   
                 }
                
                }
            })


            const mmmScripts = new Promise((resolve) => {

                const scripts3M = ["//www.3m.com/3m_theme_assets/themes/3MTheme/assets/scripts/build/kungfu/Eloqua/eloquaCountries.js",
                                    "//www.3m.com/3m_theme_assets/themes/3MTheme/assets/scripts/build/kungfu/Eloqua/eloquaConsent.js",
                                    "//www.3m.com/3m_theme_assets/themes/3MTheme/assets/scripts/build/kungfu/Eloqua/eloquaLanguages.js",
                                    "//www.3m.com/3m_theme_assets/themes/3MTheme/assets/scripts/build/kungfu/Eloqua/eloquaStates.js"]

                async function loadScript () {

                    for (let script of scripts3M) {
                        await this._scriptDynamicLoading(script);
                    }

                    return resolve()
                    
                }

                loadScript.call(this)


            })

            

        Promise.all([initLang,initFields,loadPageModule('kungfu/EmailForm/EmailOptions'),mmmScripts,loadPageModule('https://3m.com/3m_theme_assets/themes/3MTheme/assets/scripts/src/kungfu/Eloqua/globalFormsModule.js')]).then(
            
        resolve => { 
                this.customizedSelectOptions = {...this.fieldsTmpl.optionsForFilter, ...this.optionsForFilter};

                this.division = this.hiddenFields.division1.slice(0, this.hiddenFields.division1.indexOf(' '));       
                this.hiddenFields.SMPVersion = this.fieldsTmpl.SMPVersion;

                this._mergeFilterOptions();
                this._mergeFieldsets();
                this._mergeStaticValidationRules();
                        
                let form = new FormAssetsCreator({
                    el: this.el, 
                    hiddenFields: this.hiddenFields,
                    langTemplate: this.constructor.langTmpl, 
                    fieldsTemplate: this.fieldsTmpl,
                    optionsForFilter: this.optionsForFilter,
                    division: this.division,
                    name: this.name,
                    formSettings: this.formSettings,
                    selectedItems: this.selectedItems,                  
                });
                
                form.render();

                this.display = new DisplayFormFields(this.el);
                this.validation = new FormValidationRules(this.el);

                // Final Optional Fields init (After Display was initialized and custome adding methods were used)
                this._getOptionalNamesArr();
                // Add 'Optional' to labels of optional fields (once is LP loaded)                
                this.display.makeOptional(this._optionalNames,this.constructor.langTmpl.optionalText);               
                                
                this.fieldsTmpl.validationRules(this.validation);
                
                this.fieldsTmpl.displayRules(this.display);
                //this.validation.render();
                
                })

        
    }
}

window.FormComponent = FormComponent;
