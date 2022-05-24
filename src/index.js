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

/**
 * Initializes settings for the form creation,
 * Render form, 
 * Call 'Display' and 'Validation' Components for realizing fields dependencies and Validation Rules according to the settings
 */

export class FormComponent {

    customizedSelectOptions = {};

    fieldsets = {};         //Fieldsets (pulled from LP)    
    optionalNames = [];    // Add 'Optional' to labels of each field in this array


    optionsForFilter = {};  // Object for options, which should be visible for <select> elements of default fields (Job Role, Industry,...) (pulled from LP) 
    addedClasses = {};      // Object for CSS classes, which should be customly added to <li> wrappers of fields or to a fieldset (pulled from LP) 
    staticValidationRules = {}; // Fields, which should be always optional (pulled from LP)
    customFields = [];      // New added custom fields (pulled from LP)
    fieldsOrder = [];       // Order for new Added fields
    changedOrder = [];      // Is used in case if we need to change default fields order
    changedOrder__after = []; 
    removedFields = [];


    langTmpl;        // will be feeded by a a relevant 'language data template'
    fieldsTmpl;             // will be feeded by a a relevant 'fields data template'
    static instance = 0;    // is used for generating a unique ID of every Form Instance on LP

    selectedItems = {       // Is used to preselect any option in <select>
        country: this._identifyLocale('country')
    };

    settings = {        // Set of parameters of the <form> tag
        vendor: 'elq-jsp', // Possible vendors: 'elq', 'elq-jsp', 'elq-direct', 'elq-psd', '3M', 'pdot'        
        classes: ['cmxform', 'js-subvalidate', 'js-emailform', 'mmmMailForm', 'eloquaForm', 'eloquaGlobalForm'],
       busPhone: false,
       countryCode: this._identifyLocale('countryCode')
    };

   

    /**
     * @param {String} name - HTML name of the form
     */

    constructor(name) {
        this.name = name;
        this.el = document.querySelector(`[name="${name}"]`);
        this.elId = name;

        this.hiddenFields = {        // Set of hidden fields of the form
        
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
            FormType: ifMQLformType(this.name) ? ifMQLformType(this.name) : '',
            SMPVersion: ""
        };
    

        this.constructor.instance++;


        //Using a variable from mmmSettings (do not use in normal usage)
        //this._addIn3MpriorityModules (langTemplate(this.hiddenFields.language1), smpTemplate(this.hiddenFields.division1), baseFieldsTemplate());
    }


   

    _identifyDivision() {
        const name = 'DCSext.CDC';
        return document.getElementsByTagName('meta')[name].getAttribute("content");
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
        if (par === 'countryCode') {
            return val.slice(val.lastIndexOf('_') + 1).toLocaleLowerCase();

        }

        


    }

    setLanguageTemplate(LanguageTemplate) {
        this.langTmpl = LanguageTemplate;
        
    }

  

    setHiddenFields(data) {
        (Object.entries(data)).forEach((item) => {
            this.hiddenFields[item[0]] = item[1];
        })

     
        
    }

    addFieldset(id, arr) {
        if (!this.fieldsets[id]) {
            this.fieldsets[id] = [];
        }
        this.fieldsets[id] = [...this.fieldsets[id], ...arr];
    }



    addClass(item, cl) {
        this.addedClasses[item] = cl;
    }

    changeOrder(arr, place=null) {
        if (place != 'after') {
            this.changedOrder.push(arr);
        } else {
            this.changedOrder__after.push(arr);
        }       
        
    }

    _scriptDynamicLoading(url, targetEl, ifAsync = true) {
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

    loadScript(scripts, ifAsync=false) {
        for (let script of scripts) {
            this._scriptDynamicLoading(script, this.el.closest('div'), ifAsync);
        }
    }  


    /**
     * Combine data of options for <select> elements from the 'fields template' and from LP (if provided), then update local 'language template'
     */
    _mergeFilterOptions() {

        this.customizedSelectOptions = { ...this.fieldsTmpl.optionsForFilter, ...this.optionsForFilter };

        for (let key of Object.keys(this.customizedSelectOptions)) {

            const arrAll = this.langTmpl[key].options
            const arrCustomOpts = this.customizedSelectOptions[key];

            const filteredOptions = arrAll.filter((opt) => {
                return arrCustomOpts.indexOf(opt[0]) != -1;
            })


            this.langTmpl[key].options = filteredOptions;
        }

    }

    /**
     * Combine data of fieldsets (fields inside) from the 'fields template' and from LP (if provided), then update local 'language template'
     */

    _mergeFieldsets() {

        for (let [key, val] of Object.entries(this.fieldsets)) {

            if (this.fieldsTmpl.fieldsets[key]) {

                this.fieldsTmpl.fieldsets[key] = Array.from(new Set([...this.fieldsTmpl.fieldsets[key], ...val]));

            }
            else {
                this.fieldsTmpl.fieldsets[key] = this.fieldsets[key];
            }

        }

       
        this.fieldsTmpl.fieldsets = new Map(Object.entries(this.fieldsTmpl.fieldsets));

        for (let arr of this.changedOrder) {
            this._makeNewOrder(arr, null);
        }

        for (let arr of this.changedOrder__after) {
            this._makeNewOrder(arr, 'after');
        }
    }



    _makeNewOrder(arr, place) {

      
            let startItem = arr[arr.length-1];
            
            const fieldsetID = this._getFieldsetID(startItem);

            arr.pop();
            let filteredArr = this.fieldsTmpl.fieldsets.get(fieldsetID).filter((item) => {
                return !arr.includes(item);
            });
            const startIndex = filteredArr.findIndex((i) => {
                return i === startItem;
            });

            if (place != 'after') {
                filteredArr.splice((startIndex), 0, ...arr);
            } else {
                filteredArr.splice((startIndex+1), 0, ...arr);
            }

            

            this.fieldsTmpl.fieldsets.set(fieldsetID, filteredArr);
    

       
    }



    _addCustomFields() {
        if (this.fieldsOrder.length) {
            for (let arr of this.fieldsOrder) {
                if (arr[1]) {
                    const fieldsetID = this._getFieldsetID(arr[1]);
                    const index = this._getIndexByName(arr[1], fieldsetID);

                    this.fieldsTmpl.fieldsets.get(fieldsetID).splice((index), 0, arr[0]);
                } else {
                    const lastFieldsetID = [...this.fieldsTmpl.fieldsets.keys()][(this.fieldsTmpl.fieldsets.size) - 1];
                    this.fieldsTmpl.fieldsets.get(lastFieldsetID).push(arr[0]);
                }




            }
        }
    }

    _removeFields() {
        for (let field of this.removedFields) {
            const fieldsetID = this._getFieldsetID(field);
            const index = this._getIndexByName(field, fieldsetID);
            this.fieldsTmpl.fieldsets.get(fieldsetID).splice([index], 1);
        }

    }

    /**
     * Combine data from the default data templates with custom ones 
     */



    _mergeFieldsTmpl(arr) {
        for (let objName of arr) {
            const obj = { ...this.fieldsTmpl[objName], ...this[objName] };
            this.fieldsTmpl[objName] = obj;
        }
    }

    _mergeLangTmpl() {
        for (let field of this.customFields) {
            const langpath = this.langTmpl[this.division_cropped];
            langpath[field.name] = {
                type: field.type,
                label: field.label,
                errMessage: field.errMessage,
                options: field.options ? field.options : null,
                label: field.label,
            }            

            if (field.required === 'false') {            
                this.fieldsTmpl.staticValidationRules[field.name] = 'false';              
            }
        }
        

    }

    /**
     * Sets an array with names of fields for adding 'optional' to label
     */

    _setOptionalNamesArr() {

        for (let key of Object.keys(this.fieldsTmpl.staticValidationRules)) {

            if ((this.fieldsTmpl.staticValidationRules[key] === 'false') || (this.fieldsTmpl.staticValidationRules[key] == false)) {
                this.optionalNames.push(key);
            }

        }

    }


    consoleFieldsets() {
        console.log(this.fieldsTmpl.fieldsets);
    }

    updateFieldset(id, arr) {
        this.fieldsets.id = arr;
    }




    _getIndexByName(name, fieldsetID) {

        return this.fieldsTmpl.fieldsets.get(fieldsetID).findIndex((i) => {
            return i === name;
        })


    }


    //Using a variable from mmmSettings (this can be a fast workaround in case of any issues with the correct order of scripts loading)
    _addIn3MpriorityModules(langTmpl_link, smpTmpl_link, baseTmpl_link) {
        if (priorityModules) {

            priorityModules.push(langTmpl_link);
            if (this.hiddenFields.FormType != '') {
                priorityModules.push(smpTmpl_link);
            } else {
                priorityModules.push(baseTmpl_link);
            }
        }
    }


    newField(data = { label: '', errMessage: '', type: '', options: '', name: '', value: '', className: '', required: 'false' }) {
        const obj = {
            name: data.name,
            label: data.label,
            errMessage: data.errMessage,
            type: data.type,
            options: data.options,
            classToLiWrapper: data.className,
            required: data.required,
        }
        if (data.name === 'false') {
            this.optionalNames.push(data.name);            
        }

        this.customFields.push(obj);
    }

    addField(name, placeBefore) {
        if (placeBefore) {
            this.fieldsOrder.push([name, placeBefore]);
        } else {
            this.fieldsOrder.push([name]);
        }

    }

    removeField(name) {
        this.removedFields.push(name);
    }




    _getFieldsetID(name) {
        for (let [id, fieldset] of [...this.fieldsTmpl.fieldsets.entries()]) {
            if (fieldset.includes(name)) {
                return id;
            }
        }
    }

      

   /* customDisplayRules (display) {
        this.displayRules[].[];
    }
    */


    /*
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
        this.settings.classes.push(cl);
    }
    
    rewriteFormCSSClasses([classes]) {
        this.settings.classes = classes;
    }
    */

    render() {    



        const langTmplUrl = langTemplate(this.hiddenFields.language1);
        let initFields;
        let initLang;

        if (typeof (__globScopeLanguageTemplate__) === 'undefined') {
            initLang = new Promise((resolve) => {
                this._scriptDynamicLoading(langTmplUrl, document.head, false).onload = () => {
                    this.langTmpl = __globScopeLanguageTemplate__;

                    resolve();
                }


            })
        } else {
            this.langTmpl = __globScopeLanguageTemplate__;
            resolve();
        }

        if (this.hiddenFields.FormType != '') {
            if (typeof (__globScopeSMPtemplate__) === 'undefined') {
                initFields = new Promise((resolve) => {
                    const smpTmplUrl = smpTemplate(this.hiddenFields.division1);
                    this._scriptDynamicLoading(smpTmplUrl, document.head, false).onload = () => {
                        this.fieldsTmpl = __globScopeSMPtemplate__;
                        resolve();
                    }
                })
            } else {
                this.fieldsTmpl = __globScopeSMPtemplate__;
                //this._formGenStart(); 
                resolve();
            }

        } else {

            if (typeof (__globScopeBaseFieldstemplate__) === 'undefined') {
                initFields = new Promise((resolve) => {
                    const baseTmplUrl = baseFieldsTemplate();
                    this._scriptDynamicLoading(baseTmplUrl, document.head, false).onload = () => {
                        this.fieldsTmpl = __globScopeBaseFieldstemplate__;
                        resolve();
                    }
                })
            }
            else {
                this.fieldsTmpl = __globScopeBaseFieldstemplate__;
                resolve();
            }
        }






        Promise.all([initLang, initFields]).then(
            resolve => {
            
                this._formRender();

               }
        )
            .then(
                resolve => {                   

                    const scripts3M = ["//www.3m.com/3m_theme_assets/themes/3MTheme/assets/scripts/build/kungfu/Eloqua/eloquaCountries.js",
                        "//www.3m.com/3m_theme_assets/themes/3MTheme/assets/scripts/build/kungfu/Eloqua/eloquaConsent.js",
                        "//www.3m.com/3m_theme_assets/themes/3MTheme/assets/scripts/build/kungfu/Eloqua/eloquaLanguages.js",
                        "//www.3m.com/3m_theme_assets/themes/3MTheme/assets/scripts/build/kungfu/Eloqua/eloquaStates.js",
                    ];

                    

                   
                    loadPageModule('kungfu/EmailForm/EmailOptions');
                    this.loadScript(scripts3M, false);
                    loadPageModule('kungfu/Eloqua/globalFormsModule');

                    

                   // resolve();
                  }   

                   
                
            )
            //.then(this._scriptDynamicLoading('//img04.en25.com/Web/3MCompanyGlobal/%7B80439e2b-4bf7-49b4-ac6b-713f2f163347%7D_AJ_HELPER_intlTelInput__STRIPPED__Minified.js?update=8', this.el.closest('div'), false))

            
     
        const dynamicVariable = '__load_Validation-Display_Rules__' + this.constructor.instance;
        domReady[dynamicVariable] = () => {
         
            this.display = new DisplayFormFields(this.el);  // init Display Rules

            // Final Optional Fields init (After Display was initialized and custome adding methods were used)
            this._setOptionalNamesArr();           

            this.fieldsTmpl.displayRules(this.display);         // pulled from template             
            if (typeof this.displayRules === 'function') {   // pulled from LP                          
                
                this.displayRules(this.display);
            }
        

            this.validation = new FormValidationRules(this.el, this.elId);  // init Validation Rules

            this.fieldsTmpl.validationRules(this.validation);   // pulled from template
            if (typeof this.validationRules === 'function') {   // pulled from LP
                this.validationRules(this.validation);
            }


            // Add 'Optional' to labels of optional fields              
            this.display.makeOptional(this.optionalNames, this.langTmpl.optionalText);           
          

            this.validation.render(); // All validation methods should go above

        }

    }


    _formRender() {

        this.division_cropped = this.hiddenFields.division1.slice(0, this.hiddenFields.division1.indexOf(' '));

        this.hiddenFields.SMPVersion = this.fieldsTmpl.SMPVersion;

        //Merging data from templates with what was provided on LP customly
        this._mergeFilterOptions();
        this._mergeLangTmpl();        
        this._mergeFieldsets();
        this._addCustomFields();
        this._removeFields();
       
        this._mergeFieldsTmpl(['staticValidationRules', 'addedClasses']);

      if (this._getFieldsetID('busPhone')) {
          this.settings.busPhone = true;
         
        }
     

         


        const form = new FormAssetsCreator({
            el: this.el,
            hiddenFields: this.hiddenFields,
            langTemplate: this.langTmpl,
            fieldsTemplate: this.fieldsTmpl,
            division: this.division_cropped,
            name: this.name,
            settings: this.settings,
            selectedItems: this.selectedItems,
        });

        form._busPhoneSettings(this._identifyLocale('countryCode')); 

        form.render();
 
    }




}

window.FormComponent = FormComponent;


