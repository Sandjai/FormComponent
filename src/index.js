'use strict'

import FormValidationRules from './components/validation/index.js'
import DisplayFormFields from './components/display/index.js'
import FormAssetsCreator from './components/Form/index.js'
import langTemplate from './configTemplates/language/index.js'
import smpTemplate from './configTemplates/smp/index.js'
import baseTemplate from './configTemplates/noSMP/index.js'

export class FormComponent {

    customizedSelectOptions;
    division;

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
            
        };
        this.fieldsets = [];
        this.validationRules;
        this.displayRules;

        //confirg templates
        this.langTmpl; 
        this.fieldsTmpl; 

        this.optionsForFilter = {};


        this.addedFields;       
    }

    setHiddenFields (data) {
        (Object.entries(data)).forEach((item) => {
            this.hiddenFields[item[0]] = item[1];
        })     
    }

    addFieldset (id, arr) {
        this.fieldsets[id].push(arr);       
    }

   async initLanguageTemplate() {
        const { default: langTmpl } = await langTemplate(this.hiddenFields.language1);
        this.langTmpl = langTmpl;
    }

    async initFieldsTemplate() {   
        if (this.hiddenFields.SMPVersion) {     
            const { default: smpTmpl } = await smpTemplate(this.hiddenFields.division1);
            this.fieldsTmpl = smpTmpl;    
        } else {
            const { default: noSMPtemplate } = await baseTemplate();
            this.fieldsTmpl = noSMPtemplate;
        }

        this.customizedSelectOptions = {...this.fieldsTmpl.optionsForFilter, ...this.optionsForFilter};
               
    }

    _mergeFilterOptions() {

        
        for (let key of Object.keys(this.customizedSelectOptions)) {

            const arrAll = this.langTmpl[key].options
        const arrCustomOpts = this.customizedSelectOptions[key];

        const filteredOptions = arrAll.filter((opt) => {
           return  arrCustomOpts.indexOf(opt[0]) != -1;           
        }) 
        

        this.langTmpl[key].options.all = filteredOptions;

             
        }
        
    }

   _mergeFieldsets() {       
        for (let [key,val] of Object.entries(this.fieldsTmpl.fieldsets)) {
            this.fieldsTmpl.fieldsets[key] = Array.from(new Set([...val, ...this.fieldsets]));           
        }
    }
    

    consoleFieldsets() {
        console.log(this.fieldsets);
    }

    updateFieldset(id, arr) {
        this.fieldsets.id = arr;
    }
    
    removeField(fieldsetId, name) {
        const index = _getIndexByName(this.fieldset[fieldsetId], name);
        this.fieldset[fieldsetId].splice([index], 1);
    }

    static _getIndexByName (arr,name) {
        arr.findIndex((i)=>{
            i === name;
        })
    }

    newField(data = {label: '', errMessage: '', type: '', options: '', fieldName: ''}) {
       
        /* to add fields, and then merge with lang template. Afterwards is needed to update routing in order to exclude possible crossing of values (names)
        this.langTmpl.customFields[fieldName] =  {
            label: data.label,
            errMessage: errMessage,           
            type: type,
            options: options,
        }
        */
    }

    addField(name, toPlaceAfter, fieldsetId) {
       /*connected with comment in prev method
       const index = _getIndexByName (this.fieldsets[fieldsetId],toPlaceAfter)
        this.fieldsets[fieldsetId].splice((index + 1), 0, name);*/
    }


    async render() {
        this.division = this.hiddenFields.division1.slice(0, this.hiddenFields.division1.indexOf(' '));
        await this.initLanguageTemplate(); 
        await this.initFieldsTemplate();

       this._mergeFilterOptions();
      this._mergeFieldsets();
                
        let form = new FormAssetsCreator({
            el: this.el, 
            hiddenFields: this.hiddenFields,
            langTemplate: this.langTmpl, 
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
    }
}

window.FormComponent = FormComponent;
