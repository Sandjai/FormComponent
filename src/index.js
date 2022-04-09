'use strict'

import FormValidationRules from './components/validation/index.js'
import DisplayFormFields from './components/display/index.js'
import FormAssetsCreator from './components/Form/index.js'
import langTemplate from './configTemplates/language/index.js'
import smpTemplate from './configTemplates/smp/index.js'
import baseTemplate from './configTemplates/noSMP/index.js'

export class FormComponent {
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


        this.addedFields;       
    }

    setHiddenFields (data) {
        (Object.entries(data)).forEach((item) => {
            this.hiddenFields[item[0]] = item[1];
        })     
    }

    fieldset (arr) {
        this.fieldsets.push(arr);
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

    }
    

    addField(fieldName, type, placeAfter) {

    }

    addSelect(fieldName, option, placeAfter) {

    }

    async render() {
        await this.initLanguageTemplate(); 
        await this.initFieldsTemplate();
        
        
        //How to combine fieldsets (this.fieldsTmpl.fieldsets)
        // When init validation?
        
        let form = new FormAssetsCreator({
            el: this.el, 
            hiddenFields: this.hiddenFields,
            langTemplate: this.langTmpl, 
            fieldsTemplate: this.fieldsTmpl
        });
        
        form.render();
        this.display = new DisplayFormFields(this.el);
        //this.validation = new FormValidationRules(this.el);
        
        
        
        
        //this.fieldsTmpl.validationRules(this.validation);
        
       // this.fieldsTmpl.display(this.displayRules);
        //this.validation.render();
    }
}

window.FormComponent = FormComponent;
