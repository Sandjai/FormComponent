var __globScopeSMPtemplate__ = {
    // Number of leadGenTypes: 3
    /**
     * leadgenCA - This property is for the case when 'I want Sales Contact' checkbox is on the page and leadgen fields are hidden untill the checkbox is checked
     * This template is used if [form].settings.leadGenType is equal to: 'CA';  - (by default for all the lead gen forms except SAM (for SAM default is: 'Basic')) 
     *  */

    leadGenType_CA: {

        SMPVersion: "4",

        fieldsets: {
            CA: ['emailAddress', 'firstName', 'lastName', 'country', 'elqGlobalLanguage', 'stateProv', 'mmmIndustry1', 'processImprovement', 'salesRequest'],
            leadgen: ['sample', 'company', 'zipPostal', 'city', 'busPhone', 'mmmJobRole1', 'NumberofOperators', 'custEnq', 'selDist', 'address1',],
            optinTxt: ['optInHeader'],
        },

        // Fields, which should be optional in CA Form type (only 'static' rules here. For dynamic ones - use 'ValidationRules' method)
        // all standard fields are mandatory by default
        staticValidationRules: {
            custEnq: 'false',
         },

        optionsForFilter: {
            mmmJobRole1: ['Manager/Supervisor', 'President/Owner', 'Machinist/Operator', 'Engineer-Process', 'Production Manager', 'Purchasing/Procurement/Buyer', 'Engineer-Design', 'Occupational Health Manager'],
            mmmIndustry1: ['Industrial-Primary Metals Mfg', 'Industrial-Other Fabr Metals Mfg', 'Industrial-Indust Machinery & Equip Mfg', 'Industrial-Medical Devices Mfg', 'Transp-Automotive Mfg', 'Transp-Bus Mfg', 'Transp-Railcar Mfg & Maint', 'Transp-Specialty Veh Mfg', 'Transp-Aerospace MRO', 'Transp-Aerospace Mfg', 'Industrial-Turbine & Engine Mfg', 'Transp-Ship Building & Maint', 'Industrial-Composites Mfg', 'Industrial-Furniture Mfg', 'Industrial-Woodworking'],
        },

        addedClasses: {
            leadgen: "MMM--isVisuallyHidden",
            salesRequest: "MMM--gapTopLrg",
            selDist: "MMM--isVisuallyHidden",
        },

        salesRequestFieldType: 'select',

        formTypeSpecifics: {
            // FormType Short name | Array of html names to be shown only for the particular form type
            SAM: ['sample', 'selDist', 'address1'],
            DEM: ['custEnq'],
            ASK: ['custEnq'],
            CON: ['custEnq'],
            LAR: ['custEnq'],
        },

        displayValidationRules: (form1) => {

            form1.addDependency({
                mandatory: ['company', 'zipPostal', 'city', 'busPhone', 'mmmJobRole1', 'NumberofOperators', 'selDist', 'sample', 'address1'],
                fieldset: "leadgen",
                triggerName: 'salesRequest',
            });


            form1.showOther('NumberofOperators', 'selDist', '2-5');

        },

    },

    /**
  * leadgenBasic - This property is for the case when 'I want Sales Contact' checkbox is not needed.
  * This template is used if [form].settings.leadGenType is equal to: 'Basic'
  *  */

    leadGenType_Basic: {

        SMPVersion: "4",

        fieldsets: {
            leadgen: ['emailAddress', 'sample', 'firstName', 'lastName', 'company', 'busPhone', 'zipPostal', 'city', 'address1', 'country', 'elqGlobalLanguage', 'stateProv', 'mmmJobRole1', 'mmmIndustry1', 'NumberofOperators', 'selDist', 'processImprovement', 'custEnq'],
            optinTxt: ['optInHeader'],
        },

        // Fields, which should be optional in CA Form type (only 'static' rules here. For dynamic ones - use 'ValidationRules' method)
        // all standard fields are mandatory by default
        staticValidationRules: {
            custEnq: 'false',
        },


        optionsForFilter: {
            mmmJobRole1: ['Manager/Supervisor', 'President/Owner', 'Machinist/Operator', 'Engineer-Process', 'Production Manager', 'Purchasing/Procurement/Buyer', 'Engineer-Design', 'Occupational Health Manager'],
            mmmIndustry1: ['Industrial-Primary Metals Mfg', 'Industrial-Other Fabr Metals Mfg', 'Industrial-Indust Machinery & Equip Mfg', 'Industrial-Medical Devices Mfg', 'Transp-Automotive Mfg', 'Transp-Bus Mfg', 'Transp-Railcar Mfg & Maint', 'Transp-Specialty Veh Mfg', 'Transp-Aerospace MRO', 'Transp-Aerospace Mfg', 'Industrial-Turbine & Engine Mfg', 'Transp-Ship Building & Maint', 'Industrial-Composites Mfg', 'Industrial-Furniture Mfg', 'Industrial-Woodworking'],
        },

        addedClasses: {
            selDist: "MMM--isVisuallyHidden",
        },

        formTypeSpecifics: {
            // FormType Short name | Array of html names to be shown only for the particular form type
            SAM: ['sample', 'selDist'],
            DEM: ['custEnq'],
            ASK: ['custEnq'],
            CON: ['custEnq'],
            LAR: ['custEnq'],
        },

        displayValidationRules: (form1) => {

            form1.showOther('NumberofOperators', 'selDist', '2-5');

        },
    },

    
     leadGenType_leadGenType_TMC: {

        SMPVersion: "1", 

        SMPsegment: 'TMC',

        fieldsets: {
            CA: ['emailAddress', 'country', 'elqGlobalLanguage', 'stateProv', 'salutation', 'firstName', 'lastName', 'mobilePhone', 'TMC_comp_type', 'mmmIndustry1', 'mmmJobRole1', 'salesRequest'],
            leadgen: ['TMC_proc_type', 'TMC_app_type', 'custEnq', 'TMC_substrate', 'TMC_numberOfOperators', 'company', 'busPhone', 'zipPostal', 'address1', 'selDist'],            
        },

        // Fields, which should be optional in CA Form type (only 'static' rules here. For dynamic ones - use 'ValidationRules' method)
        // all standard fields are mandatory by default
        staticValidationRules: {
            custEnq: 'false',
         },

        optionsForFilter: {
            mmmJobRole1: ['EHS Manager', 'Engineer-General', 'Maintenance Manager/Facilities Mgmt', 'Engineer-Manufacturing/Fab', 'Operations Manager', 'Painter/Paint Professional', 'Engineer-Process', 'Engineer-Product', 'Product Manager', 'Production Employee', 'Engineer-Production', 'Production Manager', 'Purchasing/Procurement/Buyer', 'Engineer-Quality', 'Engineer-Safety', 'Safety Manager', 'Welder', 'Other',],
            mmmIndustry1: ['Transp-Aerospace MRO', 'Transp-Aerospace Mfg', 'Transp-Automotive Mfg', 'Transp-Bus Mfg', 'Transp-Comm Veh Mfg', 'Industrial-Composites Mfg', 'Industrial-Indust Machinery & Equip Mfg', 'Transp-Marine Mfg & Maint', 'Industrial-Plastics Mfg', 'Transp-Railcar Mfg & Maint', 'Transp-Rail Fleet Operators', 'Transp-Specialty Veh Mfg', 'Transp-Ship Building & Maint', 'Transp-Two-Wheel Veh Mfg & Maint', 'Transp-Vehicle Parts Mfg', 'Industrial-Woodworking',],
        },


        addedClasses: {
            leadgen: "MMM--isVisuallyHidden",
            salesRequest: "MMM--gapTopLrg",            
            //TMC_proc_type
        },

    
       /* formTypeSpecifics: {
            // FormType Short name | Array of html names to be shown only for the particular form type
            SAM: ['sample', 'selDist', 'address1'],
            DEM: ['custEnq'],
            ASK: ['custEnq'],
            CON: ['custEnq'],
            LAR: ['custEnq'],
        }, */

        displayValidationRules: (form1) => {

            form1.addDependency({
                mandatory: [],
                fieldset: "leadgen",
                triggerName: 'salesRequest',
            });


           

        },

    },


}