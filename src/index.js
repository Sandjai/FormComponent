'use strict'

import FormValidationRules from './components/validation/index.js'
import DisplayFormFields from './components/display/index.js'
import FormAssetsCreator from './components/Form/index.js'
import langTemplate from './configTemplates/language/index.js'
import smpTemplate from './configTemplates/smp/index.js'
import baseFieldsTemplate from './configTemplates/noSMP/index.js'
import ifMQLformType from './utils/ifMQLformType.js'

export class FormComponent {

    customizedSelectOptions;
    division;
    static langTmpl; 

    constructor (name) {        
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
            language1: "English",
            division1: "",
            eloquaFormURL: "",
            country: "United Kingdom",
            FormType: ""
            
        };
        this.fieldsets = [];
        this.validationRules;
        this.displayRules;        
        
        this.fieldsTmpl; 
        this.optionsForFilter = {};
        this.addedFields;       
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
        */
    }

    addField(name, toPlaceAfter, fieldsetId) {
       /*connected with comment in prev method
       const index = this._getIndexByName (this.fieldsets[fieldsetId],toPlaceAfter)
        this.fieldsets[fieldsetId].splice((index + 1), 0, name);*/
    }

    staticOptionalFields (...fields) {        
        for (let field of fields) {
            this.staticValidationRules[field] = 'false';
        }
    }

    staticMandatoryFields (...fields) {
        for (let field of fields) {
            this.staticValidationRules[field] = 'true';
        }       
    }


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
            }
            )
            

        Promise.all([initLang,initFields]).then(
            resolve => { 
                this.customizedSelectOptions = {...this.fieldsTmpl.optionsForFilter, ...this.optionsForFilter};

                this.division = this.hiddenFields.division1.slice(0, this.hiddenFields.division1.indexOf(' '));       

                this._mergeFilterOptions();
                this._mergeFieldsets();
                this._mergeStaticValidationRules();
                        
                let form = new FormAssetsCreator({
                    el: this.el, 
                    hiddenFields: this.hiddenFields,
                    langTemplate: this.constructor.langTmpl, 
                    fieldsTemplate: this.fieldsTmpl,
                    optionsForFilter: this.optionsForFilter,
                    division: this.division
                });
                
                form.render();

                this.display = new DisplayFormFields(this.el);
                this.validation = new FormValidationRules(this.el);
                
                
                
                
                this.fieldsTmpl.validationRules(this.validation);
                
            this.fieldsTmpl.displayRules(this.display);
                //this.validation.render();
                
                })

        
    }
}

window.FormComponent = FormComponent;
