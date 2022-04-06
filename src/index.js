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
        (Object.keys(data)).forEach((item,i) => {
            this.hiddenFields[item] = data.item;
        })     
    }

    fieldset (arr) {
        this.fieldsets.push(arr);
    }

   /* async initLanguageTemplate() {
        this.langTmpl = await import(langTemplate(this.hiddenFields.language1)); 
    }

    async initSMPtemplate() {
        this.SMPTmpl = await import(smpTemplate(this.hiddenFields.division1));
    }
*/
    addField(fieldName, type, placeAfter) {

    }

    addSelect(fieldName, option, placeAfter) {

    }

    render() {
      /*  this.initLanguageTemplate();
        if (this.hiddenFields.SMPVersion) {
            this.initSMPtemplate();
        }
        */

        //How to combine fieldsets (this.SMPTmpl.fieldsets)
        
        let form = new FormAssetsCreator(this.langTmpl, this.SMPTmpl, this.hiddenFields, this.fieldsets);
        this.el.innerHTML = form;
        this.validation = new FormValidationRules(this.el);
       // this.SMPTmpl.validationRules(this.validation);
        this.display = new DisplayFormFields(this.el);
       // this.SMPTmpl.display(this.displayRules);
        this.validation.render();
    }
}

window.FormComponent = FormComponent;
