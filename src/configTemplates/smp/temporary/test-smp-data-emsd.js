var __globScopeSMPtemplate__ = {
// Number of leadGenTypes: 2
    /**
     * leadgenCA - This property is for the case when 'I want Sales Contact' checkbox is on the page and leadgen fields are hidden untill the checkbox is checked
     * This template is used if [form].settings.leadGenType is equal to: 'CA';  - (by default for all the lead gen forms except SAM (for SAM default is: 'Basic')) 
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

        
        displayValidationRules: (form1) => {

            form1.addDependency({
                mandatory: ['custEnq', 'zipPostal', 'city', 'address1', 'busPhone', 'company', 'mmmJobRole1', 'firstName', 'lastName', 'salutation'],          
                fieldset: "leadgen",
                firstOptional: ['firstName','lastName','salutation'],
                triggerName: 'salesRequest',
                
            });

            form1.showOther ('app13','EMSD_app_purp_other');
            form1.showOther ('mmmJobRole1', 'EMSD_jr_other');

            form1.checkboxesGroup ('app1 app2 app3 app4 app5 app6 app7 app8 app9 app10 app11 app12 app13');

            let schemeForIndustry = new Map([
                    
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

            form1.addDependencyFromCheckboxes('mmmIndustry1', schemeForIndustry);  

        
        },
    
},

       /**
     * leadgenBasic - This property is for the case when 'I want Sales Contact' checkbox is not needed.
     * This template is used if [form].settings.leadGenType is equal to: 'Basic'
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

        displayValidationRules: (form1) => {            
    
            form1.showOther ('app13','EMSD_app_purp_other');
            form1.showOther ('mmmJobRole1', 'EMSD_jr_other');
    
            form1.checkboxesGroups ('app1 app2 app3 app4 app5 app6 app7 app8 app9 app10 app11 app12 app13');
    
            let schemeForIndustry = new Map([
                      
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
    
            form1.addDependencyFromCheckboxes('mmmIndustry1', schemeForIndustry);  
    
        
         },
    }

}