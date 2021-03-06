var __globScopeSMPtemplate__ = {
// Number of leadGenTypes: 2
    /**
     * leadgenCA - This property is for the case when 'I want Sales Contact' checkbox is on the page and leadgen fields are hidden untill the checkbox is checked
     * This template is used if [form].settings.leadGenType === 'CA';  - (by default)
     *  */ 

    leadGenType_CA : {


        SMPVersion: "2",

    fieldsets: {
        CA: ['emailAddress','salutation','firstName','lastName','country','elqGlobalLanguage','stateProv','EMSD_cust_type','appHeader', ['app1', 'app3', 'app9', 'app4', 'app6', 'app5', 'app7', 'app8', 'app10', 'app2', 'app11', 'app12', 'app13'],'EMSD_app_purp_other','mmmIndustry1','salesRequest'],
        leadgen: ['mmmJobRole1','EMSD_jr_other','company','busPhone','address1','city','zipPostal','custEnq'],
    },

    // Fields, which should be optional in CA Form type (only 'static' rules here. For dynamic ones - use 'ValidationRules' method)
    // all standard fields are mandatory by default
    staticValidationRules: {
        firstName: 'false',
        lastName: 'false',
        salutation: 'false',
        mmmIndustry1: 'false',
        salesRequest: 'false',     
    },

    
    optionsForFilter: {
        mmmJobRole1: ["Consultant", "Engineer-Fire Protection", "Engineer-General", "Marketing", "Purchasing/Procurement/Buyer", "Research & Development", "Sales", "Manager/Supervisor", "Other"],
        mmmIndustry1: ["Transp-Aerospace Mfg", "Transp-Automotive Mfg", "Industrial-Bearings &amp; Gears Mfg", "Industrial-Chemical Mfg", "Construction-Commercial", "Comms-Telecommunications", "Comms-Data Center", "Industrial-Electrical Equip Mfg", "Industrial-Fire Protection &amp; Suppr", "Industrial-Indust Machinery &amp; Equip Mfg", "Industrial-Medical Devices Mfg", "Industrial-Paints &amp; Coatings Mfg", "Utilities-Power Dist &amp; Transmission", "Utilities-Power Generation", "Electronics-Semicon &amp; Circuit Boards", "Industrial-Turbine &amp; Engine Mfg"],
    },

    addedClasses: {
        leadgen: "MMM--isVisuallyHidden",
        EMSD_app_purp_other: "MMM--isVisuallyHidden", 
        mmmIndustry1: "MMM--isVisuallyHidden",
        EMSD_jr_other: "MMM--isVisuallyHidden",    
        salesRequest: "MMM--gapTopLrg"   
        
    },
    
   validationRules: (validation) => {
        // ALL Fields (including hidden ones), which should be mandatory in MQL Form type
        var leadGenMandatoryFields = ['custEnq', 'zipPostal', 'city', 'address1', 'busPhone', 'company', 'mmmJobRole1', 'firstName', 'lastName', 'salutation', 'EMSD_jr_other', 'EMSD_app_purp_other'];
        
        //Conditions
        var leadGenCondition = function () {return ($('[name="salesRequest"]').is(':checked'))};            
        var appOtherCondition = function () {return ($('[name="app13"]').is(':checked'))};        
        
        
        //Set Validation Rules 
        validation.addDependencyRule (leadGenMandatoryFields, leadGenCondition);            
        validation.addDependencyRule (['EMSD_app_purp_other'], appOtherCondition);
        
        //Set Group(s) of checkboxes and Validation Rules for them
        validation.checkboxesGroups([

            {namesOfgroup: 'app1 app2 app3 app4 app5 app6 app7 app8 app9 app10 app11 app12 app13',
            errorMessage: 'Please choose at least one application type'
            },
                           

        ]);
    },

    displayRules: (display) => {
        
        display.showOther('app13','EMSD_app_purp_other');            
           display.showOther('mmmJobRole1', 'EMSD_jr_other');
            
            display.dependIdFromName ("salesRequest", "leadgen", "Yes");
            
            display.addOptionalToLabel ({
                    labelOptionalNames: ['firstName','lastName','salutation'],                     
                    triggerName: 'salesRequest',
                })
            
           
                var schemeForIndustry = new Map([
                  
                    ['Transp-Aerospace Mfg',        				['app1', 'app2', 'app3', 'app4', 'app7', 'app8', 'app11', 'app12', 'app13']],
                    ['Transp-Automotive Mfg',     					['app1', 'app2', 'app4', 'app7', 'app8', 'app11', 'app12', 'app13']],
                    ['Industrial-Bearings &amp; Gears Mfg',      	['app11', 'app13']],
                    ['Industrial-Chemical Mfg',      				['app5', 'app9', 'app11', 'app13']],
                    ['Comms-Data Center',      						['app2', 'app3', 'app4', 'app6', 'app13']],
                    ['Industrial-Electrical Equip Mfg',      		['app5', 'app7','app11', 'app13']],
                    ['Industrial-Fire Protection &amp; Suppr',      ['app3', 'app13']],
                    ['Industrial-Indust Machinery &amp; Equip Mfg', ['app2', 'app4', 'app6', 'app7', 'app11', 'app12', 'app13']],
                    ['Industrial-Medical Devices Mfg',      		['app1', 'app2', 'app4', 'app7', 'app11', 'app12', 'app13',]],
                    ['Industrial-Paints &amp; Coatings Mfg',      	['app8', 'app11', 'app13']],
                    ['Utilities-Power Dist &amp; Transmission',     ['app4', 'app5', 'app13']],
                    ['Utilities-Power Generation',      			['app4', 'app5', 'app13']],
                    ['Electronics-Semicon &amp; Circuit Boards',    ['app1', 'app2', 'app4', 'app6', 'app8', 'app10', 'app11', 'app12', 'app13']],
                    ['Industrial-Turbine &amp; Engine Mfg',      	['app4', 'app6', 'app11', 'app13']],
                    ['Construction-Commercial',      	            ['app3', 'app9', 'app13']],
                    ['Comms-Telecommunications',      	            ['app2', 'app4', 'app6', 'app8', 'app12', 'app13']],
                                    
    ])

     display.complexDepFromCheckboxes ('mmmIndustry1', schemeForIndustry);

}
},

       /**
     * leadgenBasic - This property is for the case when 'I want Sales Contact' checkbox is not needed.
     * This template is used if [form].settings.leadGenType === 'Basic'
     *  */ 

leadGenType_Basic: {

        SMPVersion: "2",

        fieldsets: {
            CA: ['emailAddress', 'salutation', 'firstName', 'lastName', 'country', 'elqGlobalLanguage', 'stateProv', 'EMSD_cust_type', 'appHeader', ['app1', 'app3', 'app9', 'app4', 'app6', 'app5', 'app7', 'app8', 'app10', 'app2', 'app11', 'app12', 'app13'], 'EMSD_app_purp_other', 'mmmIndustry1', 'mmmJobRole1', 'EMSD_jr_other', 'company', 'busPhone', 'address1', 'city', 'zipPostal', 'custEnq'],

        },

        // Fields, which should be optional in CA Form type (only 'static' rules here. For dynamic ones - use 'ValidationRules' method)
        // all standard fields are mandatory by default
        staticValidationRules: {
            mmmIndustry1: 'false',
        },


        optionsForFilter: {
            mmmJobRole1: ["Consultant", "Engineer-Fire Protection", "Engineer-General", "Marketing", "Purchasing/Procurement/Buyer", "Research & Development", "Sales", "Manager/Supervisor", "Other"],
            mmmIndustry1: ["Transp-Aerospace Mfg", "Transp-Automotive Mfg", "Industrial-Bearings &amp; Gears Mfg", "Industrial-Chemical Mfg", "Construction-Commercial", "Comms-Telecommunications", "Comms-Data Center", "Industrial-Electrical Equip Mfg", "Industrial-Fire Protection &amp; Suppr", "Industrial-Indust Machinery &amp; Equip Mfg", "Industrial-Medical Devices Mfg", "Industrial-Paints &amp; Coatings Mfg", "Utilities-Power Dist &amp; Transmission", "Utilities-Power Generation", "Electronics-Semicon &amp; Circuit Boards", "Industrial-Turbine &amp; Engine Mfg"],
        },

        addedClasses: {

            EMSD_app_purp_other: "MMM--isVisuallyHidden",
            mmmIndustry1: "MMM--isVisuallyHidden",
            EMSD_jr_other: "MMM--isVisuallyHidden"
        },

        validationRules: (validation) => {

            var appOtherCondition = function () { return ($('[name="app13"]').is(':checked')) };


            //Set Validation Rules                  
            validation.addDependencyRule(['EMSD_app_purp_other'], appOtherCondition);

            //Set Group(s) of checkboxes and Validation Rules for them
            validation.checkboxesGroups([

                {
                    namesOfgroup: 'app1 app2 app3 app4 app5 app6 app7 app8 app9 app10 app11 app12 app13',
                    errorMessage: 'Please choose at least one application type'
                },


            ]);
        },

        displayRules: (display) => {

            display.showOther('app13', 'EMSD_app_purp_other');
            display.showOther('mmmJobRole1', 'EMSD_jr_other');

            var schemeForIndustry = new Map([

                ['Transp-Aerospace Mfg', ['app1', 'app2', 'app3', 'app4', 'app7', 'app8', 'app11', 'app12', 'app13']],
                ['Transp-Automotive Mfg', ['app1', 'app2', 'app4', 'app7', 'app8', 'app11', 'app12', 'app13']],
                ['Industrial-Bearings &amp; Gears Mfg', ['app11', 'app13']],
                ['Industrial-Chemical Mfg', ['app5', 'app9', 'app11', 'app13']],
                ['Comms-Data Center', ['app2', 'app3', 'app4', 'app6', 'app13']],
                ['Industrial-Electrical Equip Mfg', ['app5', 'app7', 'app11', 'app13']],
                ['Industrial-Fire Protection &amp; Suppr', ['app3', 'app13']],
                ['Industrial-Indust Machinery &amp; Equip Mfg', ['app2', 'app4', 'app6', 'app7', 'app11', 'app12', 'app13']],
                ['Industrial-Medical Devices Mfg', ['app1', 'app2', 'app4', 'app7', 'app11', 'app12', 'app13',]],
                ['Industrial-Paints &amp; Coatings Mfg', ['app8', 'app11', 'app13']],
                ['Utilities-Power Dist &amp; Transmission', ['app4', 'app5', 'app13']],
                ['Utilities-Power Generation', ['app4', 'app5', 'app13']],
                ['Electronics-Semicon &amp; Circuit Boards', ['app1', 'app2', 'app4', 'app6', 'app8', 'app10', 'app11', 'app12', 'app13']],
                ['Industrial-Turbine &amp; Engine Mfg', ['app4', 'app6', 'app11', 'app13']],
                ['Construction-Commercial', ['app3', 'app9', 'app13']],
                ['Comms-Telecommunications', ['app2', 'app4', 'app6', 'app8', 'app12', 'app13']],

            ])

            display.complexDepFromCheckboxes('mmmIndustry1', schemeForIndustry);
        },
    }

}