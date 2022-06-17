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
import getDivision from './utils/getDivision.js'

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
    customFormClasses = []; //Array for custom CSS classes added to a form tag
    staticValidationRules = {}; // Fields, which should be always optional or mandatory (pulled from LP)
    dynamicValidationRules = {};
    customFields = [];      // New added custom fields (pulled from LP)
    fieldsOrder = [];       // Order for new Added fields
    changedOrder = [];      // Is used in case if we need to change default fields order
    changedOrder__after = [];
    removedFields = [];
    updatedTexts = []; 


    langTmpl;        // will be feeded by a a relevant 'language data template'
    fieldsTmpl;             // will be feeded by a a relevant 'fields data template'
    static instance = 0;    // is used for generating a unique ID of every Form Instance on LP

    selectedItems = {       // Is used to preselect any option in <select>
        country: this._identifyLocale('country')
    };

    settings = {        // Set of parameters of the <form> tag
        vendor: 'elq-jsp', // Possible vendors: 'elq', 'elq-jsp', 'elq-direct', 'elq-psd', '3M', 'pdot'
        classes: ['cmxform', 'js-subvalidate', 'js-emailform', 'mmmMailForm', 'eloquaForm', 'eloquaGlobalForm'],       
        get countryCode () {return this._identifyLocale('countryCode')},
        leadgenBasic: false,
        _busPhone: false, // do not change manually

    };



    /**
     * @param {string} name - HTML name of the form
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
            division1: getDivision(this.name),
            eloquaFormURL: "",
            FormType: ifMQLformType(this.name) ? ifMQLformType(this.name) : '',
            SMPVersion: ""
        };


        this.constructor.instance++;


        //Using a variable from mmmSettings (do not use in normal usage)
        //this._addIn3MpriorityModules (langTemplate(this.hiddenFields.language1), smpTemplate(this.hiddenFields.division1), baseFieldsTemplate());
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

    /**
     * Set of hidden fields. Key - HTML name of the hidden field, Value - its value
     * @param {Object} data 
     */

    setHiddenFields(data) {
        (Object.entries(data)).forEach((item) => {
            this.hiddenFields[item[0]] = item[1];
        })
    }

    /**
     * Changing order of the fields. 
     * By default: last item in Array (arr) - is a field, right before which should be placed the rest fields from the Array (arr).
     * For changing the default behaviour from 'right before' to 'right after' an additional parameter 'place' (equal to 'after') should be added.
     * @param {Array} arr Array of HTML names of the fields
     * @param {string} place Equal to 'after' in case if needed to change a default behaviour
     */

    changeOrder(arr, place = null) {
        if (place != 'after') {
            this.changedOrder.push(arr);
        } else {
            this.changedOrder__after.push(arr);
        }
    }

    /**
     * Add a fieldset with HTML names of the fields
     * @param {string} id 
     * @param {Array} arr 
     */

    addFieldset(id, arr) {
        if (!this.fieldsets[id]) {
            this.fieldsets[id] = [];
        }
        this.fieldsets[id] = [...this.fieldsets[id], ...arr];
    }

    updateFieldset(id, arr) {
        this.fieldsets[id] = arr;
    }

    addClass(item, ...cls) {
       
        if (item === 'form') {
            for (let cl of cls) {
                this.customFormClasses.push(cl);
            }
        } else {
            
                this._addClass(item, cls.join(' ').toString());
           
        }
    }


    /**
     * Adds CSS class, which should be customly added to <li> wrapper of the field (if HTMl name of the field is provided) or to a fieldset (if ID of the fieldset is provided)
     * @param {string} item HTML name of the field or ID of the fieldset
     * @param {string} cl class name
     */

    _addClass(item, cl) {
        if (this.addedClasses.hasOwnProperty(item)) {
            this.addedClasses[item] += ' ' + cl;
        } else {
            this.addedClasses[item] = cl;
        }

        if (cl === 'MMM--isVisuallyHidden') {
            this.staticValidationRules[item] = 'false';
        }

       
         
    }

    /**
     * 
     * @param  {...string} items - HTML name(s) of the field(s), needed to be hidden (by adding a CSS class 'MMM--isVisuallyHidden')
     */

    hideFields(...items) {       

    for (let i of items) {       
        this._addClass(i, 'MMM--isVisuallyHidden');
        this.staticValidationRules[i] = 'false';
    }
        
    }
    
    updateSelectOpts (name, ...options) {
        this.optionsForFilter[name] = options;
    }

    makeOptional (...fieldNames) {
        this._setValidationRules('false', null, ...fieldNames);        
    }

    makeMandatory (...fieldNames) {
        this._setValidationRules('true', null, ...fieldNames);        
    }

    mandatoryWhen (name, condition) {
               
        this._setValidationRules (true, condition, name);
    }

    _setValidationRules (value, condition, ...fieldNames) {

        if (condition === null) {
            for (let field of fieldNames) {
                this.staticValidationRules[field] = value;
            }
        } else {
            let condArr = [];
     
            
        for (let name of fieldNames) {
            
            if (this.dynamicValidationRules.hasOwnProperty(name) && Array.isArray(this.dynamicValidationRules[name])) {
               
                this.dynamicValidationRules[name].push(condition);
            }  else {      
                               
                condArr.push(condition);    
                
                this.dynamicValidationRules[name] = condArr;           
            
            }

           
        }
          
        
     
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
        let elem = document.createElement('link');
        elem.rel = 'stylesheet';
        elem.type = 'text/css';
        document.body.appendChild(elem);
        elem.href = url;
    }

    _loadScript(scripts, ifAsync = false) {
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

            const arrAll = this.langTmpl[key].options;
            const arrCustomOpts = this.customizedSelectOptions[key].map((opt) => {
                return opt.replace("&amp;", "&");
            });

            const filteredOptions = arrAll.filter((opt) => {
                return arrCustomOpts.indexOf(opt[0]) != -1;
            });




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


        let startItem = arr[arr.length - 1];

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
            filteredArr.splice((startIndex + 1), 0, ...arr);
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
            if (objName === 'addedClasses') {
                let arr = [...Object.keys(this.fieldsTmpl[objName]), ...Object.keys(this[objName])];
                for (let key of arr) {                
                this.fieldsTmpl[objName][key] = (this.fieldsTmpl[objName].hasOwnProperty(key) ? this.fieldsTmpl[objName][key] + " " : ' ') + (this[objName].hasOwnProperty(key) ? this[objName][key] + " " : ' ');
                
                }
                
            } else {
                const obj = { ...this.fieldsTmpl[objName], ...this[objName] };
                this.fieldsTmpl[objName] = obj;
            }
                       
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

    setTxt(name, data, target = null) {
        this.updatedTexts.push([name, data, target]);
    }

    setTY (header, paragraph) {
        
        this.updatedTexts.push(['submissionSuccess_1', header]);
        this.updatedTexts.push(['submissionSuccess_2', paragraph]);
    }

    _getObject(property, val) {
        let _val = {};
        _val[property] = val;
        return _val;
    }

    /**
     * setLabel
     * Sets a new text for label of the field
     * @param {string} name - HTM name of the field
     * @param {string} val - new Text for the label 
     */

    setLabel(name, val) {
        this.updatedTexts.push([name, this._getObject('label', val)]);
    }


    /**
     * setOptions
     * Sets new options in select field
     * @param {string} name - HTM name of the field
     * @param {Array of Arrays} val - // [[Backend value, Frontend value], [Backend value, Frontend value], [Backend value, Frontend value], [...]] 
     */

    setOptions(name, val) {
        this.updatedTexts.push([name, this._getObject('options', val)]);
    }


    /**
     * setErrMessage
     * Sets a new text for the error message of the field
     * @param {string} name  - HTM name of the field
     * @param {string} val  - new Text for the error message
     */

    setErrMessage(name, val) {
        this.updatedTexts.push([name, this._getObject('errMessage', val)]);
    }

   

     /**
      * @param {string} item[0] - HTML name of the field
      * @param {Object} item[1] - new text
      * @param {string, null} item[1] - target, to which Object property new text should be added ()
      */

    _updateTextField () {
        for (let item of this.updatedTexts) {
                       
            if (typeof item[1] === 'string') {
                this.langTmpl[item[0]] = item[1];
            }

            if ((typeof item[1] === 'object') && (typeof item[1] !== null)) {
                for (let key of Object.keys(item[1])) {
                       
                   let targetPath = (this.langTmpl.hasOwnProperty(item[0]) && this.langTmpl[item[0]].hasOwnProperty(this.division_cropped)) ? 
                   this.langTmpl[item[0]][this.division_cropped] : 
                   (this.langTmpl.hasOwnProperty(item[0])) ?  
                   this.langTmpl[item[0]] : 
                   this.langTmpl[this.division_cropped][item[0]];
              
                   targetPath[key] = item[1][key];                        
                }
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

    _getIndexByName(name, fieldsetID) {

        return this.fieldsTmpl.fieldsets.get(fieldsetID).findIndex((i) => {
            return i === name;
        })
    }

    /**
     * New field declaration
     * @param {Object} data - Includes settings of the new field:
     * label: '',       - Mandatory
     * errMessage: '',  - Mandatory
     * type: '',        - Mandatory (possible values for type: 'text', 'textarea', checkbox', 'radio', 'select', 'header')
     * options: '',     - only in case if type = 'select'
     * name: '',        - Mandatory (should be matching of the HTML name field of the form) 
     * value: '',       - only in case if type = 'checkbox'/'radio' 
     * className: '',   - Optional class for <li> wrapper of the field
     * required:        - can be 'true' or 'false'
     */

    newField(data = { label: '', errMessage: '', type: '', options: '', name: '', value: '', className: '', required: '', condition:'', value: '' }) {
       
        
        if (data.type === "checkbox" || data.type === "radio") {
            data.value = "on";
        }

        const obj = {
            name: data.name,
            label: data.label,
            errMessage: data.errMessage,
            type: data.type,
            options: data.options,
            classToLiWrapper: data.className,
            required: data.required ? data.required : 'false',
            condition: data.condition ? data.condition : null,
            triggerName: data.triggerName ? data.triggerName : null,
            value: data.value
        }

      /*  if (obj.required === 'false') {
            this.optionalNames.push(data.name);
        } */
        

        if (obj.condition !== null) {
            obj.required = 'false';


            
            this.mandatoryWhen(obj.name, obj.condition);
        }
        
        this._displayRules = function(display) {
            display.addOptionalToLabel ({
                labelOptionalNames: [obj.name],                     
                triggerName: data.triggerName,
            })
        }

        this.customFields.push(obj);
    }

    /**
     * Adds a new field to LP
     * @param {string} name - HTML name of the new form field 
     * @param {string} placeBefore - HTML name of the form field, before which a new field should be added. 
     * If this variable is absent, new field is being added to the very end of the form. 
     */

    addField(name, placeBefore) {
        if (placeBefore) {
            this.fieldsOrder.push([name, placeBefore]);
        } else {
            this.fieldsOrder.push([name]);
        }

    }

    /**
     * Removes a field from the form
     * @param {string} name - HTML name of the form
     */

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
                        this.fieldsTmpl = !this.settings.leadgenBasic ? __globScopeSMPtemplate__.leadgenCA : __globScopeSMPtemplate__.leadGenBasic;
                      
                        resolve();
                    }
                })
            } else {
                this.fieldsTmpl = !this.settings.leadgenBasic ? __globScopeSMPtemplate__.leadgenCA : __globScopeSMPtemplate__.leadGenBasic;
                
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
                    this._loadScript(scripts3M, false);
                    loadPageModule('kungfu/Eloqua/globalFormsModule');
                    // resolve();
                }
            )
       

        const dynamicVariable = '__load_Validation-Display_Rules__' + this.constructor.instance;
        domReady[dynamicVariable] = () => {

            this.display = new DisplayFormFields(this.el, this.langTmpl.optionalText);  // init Display Rules

            // Final Optional Fields init (After Display was initialized and custome adding methods were used)
            this._setOptionalNamesArr();

            this.fieldsTmpl.displayRules(this.display);         // pulled from template             
            if (typeof this.displayRules === 'function') {   // pulled from LP                          

                this.displayRules(this.display);
            }
            if (typeof this._displayRules === 'function') {                          

                this._displayRules(this.display);
            }

            

            this.validation = new FormValidationRules(this.el, this.elId);  // init Validation Rules

            this.fieldsTmpl.validationRules(this.validation);   // pulled from template
            if (typeof this.validationRules === 'function') {   // pulled from LP
                this.validationRules(this.validation);
            }

            for (let name of Object.keys(this.dynamicValidationRules)) {
                
                if (Array.isArray(this.dynamicValidationRules[name])) {
                 
                    for (let condition of this.dynamicValidationRules[name]) {
                      
                        this.validation.addDependencyRule ([name], condition);
                       
                    } 
                }else {
                        this.validation.addDependencyRule ([name], this.dynamicValidationRules[name]);
                    }
               
               
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
        this._updateTextField();
        this._mergeFieldsets();
        this._addCustomFields();
        this._removeFields();

        this._mergeFieldsTmpl(['staticValidationRules', 'addedClasses']);

        if (this._getFieldsetID('busPhone')) {
            this.settings._busPhone = true;
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
            customFormClasses: this.customFormClasses,
        });
      
        form._busPhoneSettings(this._identifyLocale('countryCode'));

        form.render();

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
}

window.FormComponent = FormComponent;


