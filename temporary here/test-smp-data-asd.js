var __globScopeSMPtemplate__ = {
    // Number of leadGenTypes here: 4 (2 for ASD, and 2 for TMC)
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

    // Templates for TMC start here 
    // TMC with a Sales Request checkbox field (when [form].settings.leadGenType equal to: TMC_CA ).
    leadGenType_TMC_CA: {

        SMPVersion: "1",

        fieldsets: {
            CA: ['emailAddress', 'country', 'elqGlobalLanguage', 'stateProv', 'salutation', 'firstName', 'lastName', 'mobilePhone', 'TMC_comp_type',],
            preLeadgen: ['mmmIndustry1', 'mmmJobRole1', 'salesRequest'],
            leadgen: ['TMC_proc_type', 'TMC_app_type', 'custEnq', 'TMC_substrate', 'TMC_numberOfOperators', 'company', 'busPhone', 'zipPostal', 'address1', 'selDist'],
        },

        // Fields, which should be optional in CA Form type (only 'static' rules here. For dynamic ones - use 'ValidationRules' method)
        // all standard fields are mandatory by default
        staticValidationRules: {
            selDist: 'false',
            TMC_substrate: 'false',
            mobilePhone: 'false',
            busPhone: 'false'

        },

        optionsForFilter: {
            mmmJobRole1: ['EHS Manager', 'Engineer-General', 'Maintenance Manager/Facilities Mgmt', 'Engineer-Manufacturing/Fab', 'Operations Manager', 'Painter/Paint Professional', 'Engineer-Process', 'Engineer-Product', 'Product Manager', 'Production Employee', 'Engineer-Production', 'Production Manager', 'Purchasing/Procurement/Buyer', 'Engineer-Quality', 'Engineer-Safety', 'Safety Manager', 'Welder', 'Other',],
            mmmIndustry1: ['Transp-Aerospace MRO', 'Transp-Aerospace Mfg', 'Transp-Automotive Mfg', 'Transp-Bus Mfg', 'Transp-Comm Veh Mfg', 'Industrial-Composites Mfg', 'Industrial-Indust Machinery & Equip Mfg', 'Transp-Marine Mfg & Maint', 'Industrial-Plastics Mfg', 'Transp-Railcar Mfg & Maint', 'Transp-Rail Fleet Operators', 'Transp-Specialty Veh Mfg', 'Transp-Ship Building & Maint', 'Transp-Two-Wheel Veh Mfg & Maint', 'Transp-Vehicle Parts Mfg', 'Industrial-Woodworking',],
        },


        addedClasses: {
            leadgen: "MMM--isVisuallyHidden",
            preLeadgen: "MMM--isVisuallyHidden",
            salesRequest: "MMM--gapTopLrg",
            selDist: "MMM--isVisuallyHidden",
        },


        formTypeSpecifics: {
            // FormType Short name | Array of html names to be shown only for the particular form type
            SAM: ['selDist', 'address1',],
            DEM: ['custEnq', { busPhone: true }],
            ASK: ['custEnq', { busPhone: true }],
            CON: ['custEnq', { busPhone: true }],
            LAR: ['custEnq', { busPhone: true }],
        },

        hiddenFields: {
            CollisionRepair: '',
            Marine: '',
            Automotive: '',
            Aerospace: '',
            Transportation: '',
            SurfaceConditioningFinishing: '',
        },

        displayValidationRules: (form1) => {

            form1.addDependency({
                mandatory: ['mmmIndustry1', 'mmmJobRole1',],
                fieldset: 'preLeadgen',
                triggerName: 'TMC_comp_type',
                optionValue: ['End User'],
            });


            form1.addDependency({
                mandatory: ['TMC_proc_type', 'TMC_app_type', 'custEnq', 'TMC_numberOfOperators', 'company', 'zipPostal', 'address1'],
                fieldset: 'leadgen',
                triggerName: 'salesRequest',

            });

            form1.showOther('TMC_numberOfOperators', 'selDist', ['6-20', '>20']);

            form1.hideOther('mobilePhone', 'busPhone');

            /*
               * START setting a value 'Yes' to relevant hidden field depending on a chosen Industry (for realizing the scheme of subscription to email groups)
               */

            // for CollisionRepair START
            let emCollisionRepairScheme = new Map([
                ['Transp-Automotive Mfg', 'Yes'],
                ['Transp-Marine Mfg & Maint', 'Yes'],
            ]);

            form1.updateHidden('mmmIndustry1', 'CollisionRepair', emCollisionRepairScheme);
            // for CollisionRepair END

            // for Marine START
            let emMarineScheme = new Map([
                ['Transp-Marine Mfg & Maint', 'Yes'],
            ]);

            form1.updateHidden('mmmIndustry1', 'Marine', emMarineScheme);
            // for Marine END

            // for Automotive START
            let emAutomotiveScheme = new Map([
                ['Transp-Automotive Mfg', 'Yes'],
            ]);

            form1.updateHidden('mmmIndustry1', 'Automotive', emAutomotiveScheme);
            // for Automotive END

            // for Aerospace START
            let emAerospaceScheme = new Map([
                ['Transp-Aerospace MRO', 'Yes'],
                ['Transp-Aerospace Mfg', 'Yes'],
            ]);

            form1.updateHidden('mmmIndustry1', 'Aerospace', emAerospaceScheme);
            // for Aerospace END

            // for Transportation START       
            let emTransportationScheme = new Map([
                ['Transp-Aerospace MRO', 'Yes'],
                ['Transp-Aerospace Mfg', 'Yes'],
                ['Transp-Automotive Mfg', 'Yes'],
                ['Transp-Bus Mfg', 'Yes'],
                ['Transp-Comm Veh Mfg', 'Yes'],
                ['Industrial-Composites Mfg', 'Yes'],
                ['Industrial-Indust Machinery & Equip Mfg', 'Yes'],
                ['Transp-Marine Mfg & Maint', 'Yes'],
                ['Industrial-Plastics Mfg', 'Yes'],
                ['Transp-Railcar Mfg & Maint', 'Yes'],
                ['Transp-Rail Fleet Operators', 'Yes'],
                ['Transp-Specialty Veh Mfg', 'Yes'],
                ['Transp-Ship Building & Maint', 'Yes'],
                ['Transp-Two-Wheel Veh Mfg & Maint', 'Yes'],
                ['Transp-Vehicle Parts Mfg', 'Yes'],
                ['Industrial-Woodworking', 'Yes'],
            ]);

            form1.updateHidden('mmmIndustry1', 'Transportation', emTransportationScheme);
            // for Transportation END

            // for SurfaceConditioningFinishing START          
            let emSurfaceConditioningFinishingScheme = new Map([
                ['Transp-Aerospace MRO', 'Yes'],
                ['Transp-Aerospace Mfg', 'Yes'],
                ['Transp-Automotive Mfg', 'Yes'],
                ['Transp-Bus Mfg', 'Yes'],
                ['Transp-Comm Veh Mfg', 'Yes'],
                ['Industrial-Composites Mfg', 'Yes'],
                ['Industrial-Indust Machinery & Equip Mfg', 'Yes'],
                ['Transp-Marine Mfg & Maint', 'Yes'],
                ['Industrial-Plastics Mfg', 'Yes'],
                ['Transp-Railcar Mfg & Maint', 'Yes'],
                ['Transp-Rail Fleet Operators', 'Yes'],
                ['Transp-Specialty Veh Mfg', 'Yes'],
                ['Transp-Ship Building & Maint', 'Yes'],
                ['Transp-Two-Wheel Veh Mfg & Maint', 'Yes'],
                ['Transp-Vehicle Parts Mfg', 'Yes'],
                ['Industrial-Woodworking', 'Yes'],
            ]);
            form1.updateHidden('mmmIndustry1', 'SurfaceConditioningFinishing', emSurfaceConditioningFinishingScheme);
            // for SurfaceConditioningFinishing END

            /*
            * END setting a value 'Yes' to relevant hidden field depending on a chosen Industry (for realizing the scheme of subscription to email groups)
            */

        },

    },

    // TMC Without a Sales Request checkbox (select) field (when [form].settings.leadGenType equal to: TMC_Basic ).
    leadGenType_TMC_Basic: {

        SMPVersion: "1",

        fieldsets: {
            CA: ['emailAddress', 'country', 'elqGlobalLanguage', 'stateProv', 'salutation', 'firstName', 'lastName', 'TMC_comp_type', 'mmmIndustry1', 'mmmJobRole1', 'TMC_proc_type', 'TMC_app_type', 'custEnq', 'TMC_substrate', 'TMC_numberOfOperators', 'company', 'busPhone', 'zipPostal', 'address1', 'selDist'],
        },

        // Fields, which should be optional in CA Form type (only 'static' rules here. For dynamic ones - use 'ValidationRules' method)
        // all standard fields are mandatory by default
        staticValidationRules: {
            selDist: 'false',
            TMC_substrate: 'false',
            busPhone: 'false'

        },

        optionsForFilter: {
            mmmJobRole1: ['EHS Manager', 'Engineer-General', 'Maintenance Manager/Facilities Mgmt', 'Engineer-Manufacturing/Fab', 'Operations Manager', 'Painter/Paint Professional', 'Engineer-Process', 'Engineer-Product', 'Product Manager', 'Production Employee', 'Engineer-Production', 'Production Manager', 'Purchasing/Procurement/Buyer', 'Engineer-Quality', 'Engineer-Safety', 'Safety Manager', 'Welder', 'Other',],
            mmmIndustry1: ['Transp-Aerospace MRO', 'Transp-Aerospace Mfg', 'Transp-Automotive Mfg', 'Transp-Bus Mfg', 'Transp-Comm Veh Mfg', 'Industrial-Composites Mfg', 'Industrial-Indust Machinery & Equip Mfg', 'Transp-Marine Mfg & Maint', 'Industrial-Plastics Mfg', 'Transp-Railcar Mfg & Maint', 'Transp-Rail Fleet Operators', 'Transp-Specialty Veh Mfg', 'Transp-Ship Building & Maint', 'Transp-Two-Wheel Veh Mfg & Maint', 'Transp-Vehicle Parts Mfg', 'Industrial-Woodworking',],
        },


        addedClasses: {
            salesRequest: "MMM--gapTopLrg",
            selDist: "MMM--isVisuallyHidden",
        },


        formTypeSpecifics: {
            // FormType Short name | Array of html names to be shown only for the particular form type
            SAM: ['selDist', 'address1',],
            DEM: ['custEnq', { busPhone: true }], // custEnq is visible for this type of form, busPhone is true only for this type of form
            ASK: ['custEnq', { busPhone: true }],
            CON: ['custEnq', { busPhone: true }],
            LAR: ['custEnq', { busPhone: true }],
        },

        hiddenFields: {
            CollisionRepair: '',
            Marine: '',
            Automotive: '',
            Aerospace: '',
            Transportation: '',
            SurfaceConditioningFinishing: '',
        },

        displayValidationRules: (form1) => {

            form1.showOther('TMC_numberOfOperators', 'selDist', ['6-20', '>20']);

            /*
            * START setting a value 'Yes' to relevant hidden field depending on a chosen Industry (for realizing the scheme of subscription to email groups)
            */

            // for CollisionRepair START
            let emCollisionRepairScheme = new Map([
                ['Transp-Automotive Mfg', 'Yes'],
                ['Transp-Marine Mfg & Maint', 'Yes'],
            ]);

            form1.updateHidden('mmmIndustry1', 'CollisionRepair', emCollisionRepairScheme);
            // for CollisionRepair END

            // for Marine START
            let emMarineScheme = new Map([
                ['Transp-Marine Mfg & Maint', 'Yes'],
            ]);

            form1.updateHidden('mmmIndustry1', 'Marine', emMarineScheme);
            // for Marine END

            // for Automotive START
            let emAutomotiveScheme = new Map([
                ['Transp-Automotive Mfg', 'Yes'],
            ]);

            form1.updateHidden('mmmIndustry1', 'Automotive', emAutomotiveScheme);
            // for Automotive END

            // for Aerospace START
            let emAerospaceScheme = new Map([
                ['Transp-Aerospace MRO', 'Yes'],
                ['Transp-Aerospace Mfg', 'Yes'],
            ]);

            form1.updateHidden('mmmIndustry1', 'Aerospace', emAerospaceScheme);
            // for Aerospace END

            // for Transportation START       
            let emTransportationScheme = new Map([
                ['Transp-Aerospace MRO', 'Yes'],
                ['Transp-Aerospace Mfg', 'Yes'],
                ['Transp-Automotive Mfg', 'Yes'],
                ['Transp-Bus Mfg', 'Yes'],
                ['Transp-Comm Veh Mfg', 'Yes'],
                ['Industrial-Composites Mfg', 'Yes'],
                ['Industrial-Indust Machinery & Equip Mfg', 'Yes'],
                ['Transp-Marine Mfg & Maint', 'Yes'],
                ['Industrial-Plastics Mfg', 'Yes'],
                ['Transp-Railcar Mfg & Maint', 'Yes'],
                ['Transp-Rail Fleet Operators', 'Yes'],
                ['Transp-Specialty Veh Mfg', 'Yes'],
                ['Transp-Ship Building & Maint', 'Yes'],
                ['Transp-Two-Wheel Veh Mfg & Maint', 'Yes'],
                ['Transp-Vehicle Parts Mfg', 'Yes'],
                ['Industrial-Woodworking', 'Yes'],
            ]);

            form1.updateHidden('mmmIndustry1', 'Transportation', emTransportationScheme);
            // for Transportation END

            // for SurfaceConditioningFinishing START          
            let emSurfaceConditioningFinishingScheme = new Map([
                ['Transp-Aerospace MRO', 'Yes'],
                ['Transp-Aerospace Mfg', 'Yes'],
                ['Transp-Automotive Mfg', 'Yes'],
                ['Transp-Bus Mfg', 'Yes'],
                ['Transp-Comm Veh Mfg', 'Yes'],
                ['Industrial-Composites Mfg', 'Yes'],
                ['Industrial-Indust Machinery & Equip Mfg', 'Yes'],
                ['Transp-Marine Mfg & Maint', 'Yes'],
                ['Industrial-Plastics Mfg', 'Yes'],
                ['Transp-Railcar Mfg & Maint', 'Yes'],
                ['Transp-Rail Fleet Operators', 'Yes'],
                ['Transp-Specialty Veh Mfg', 'Yes'],
                ['Transp-Ship Building & Maint', 'Yes'],
                ['Transp-Two-Wheel Veh Mfg & Maint', 'Yes'],
                ['Transp-Vehicle Parts Mfg', 'Yes'],
                ['Industrial-Woodworking', 'Yes'],
            ]);
            form1.updateHidden('mmmIndustry1', 'SurfaceConditioningFinishing', emSurfaceConditioningFinishingScheme);
            // for SurfaceConditioningFinishing END

            /*
            * END setting a value 'Yes' to relevant hidden field depending on a chosen Industry (for realizing the scheme of subscription to email groups)
            */




        },


    }


}