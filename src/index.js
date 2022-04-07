'use strict'

import FormValidationRules from './components/validation/index.js'
import DisplayFormFields from './components/display/index.js'
import FormAssetsCreator from './components/Form/index.js'
import langTemplate from './configTemplates/language/index.js'
import smpTemplate from './configTemplates/smp/index.js'

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
            eloquaFormURL: ""
            
        };
        this.fieldsets = [];
        this.validationRules;
        this.displayRules;
        this.langTmpl; 
        this.SMPTmpl; 
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

  /* async initLanguageTemplate() {
        //this.langTmpl = langTemplate(this.hiddenFields.language1); 
        this.langTmpl = await import(langTemplate(this.hiddenFields.language1));
    alert(this.langTmpl)}
/*
    async initSMPtemplate() {
        this.SMPTmpl = await import(smpTemplate(this.hiddenFields.division1));
    }
*/
    addField(fieldName, type, placeAfter) {

    }

    addSelect(fieldName, option, placeAfter) {

    }

    async render() {
        this.langTmpl = await langTemplate(this.hiddenFields.language1);
      //  alert(this.langTmpl.statement);
      //this.initLanguageTemplate();
        /*if (this.hiddenFields.SMPVersion) {
            this.initSMPtemplate();
        }
        */

        //How to combine fieldsets (this.SMPTmpl.fieldsets)
        
        let form = new FormAssetsCreator(this.el, this.hiddenFields, this.fieldsets);
        form.render();
        //this.validation = new FormValidationRules(this.el);
       // this.SMPTmpl.validationRules(this.validation);
        this.display = new DisplayFormFields(this.el);
       // this.SMPTmpl.display(this.displayRules);
        //this.validation.render();
    }
}

window.FormComponent = FormComponent;
