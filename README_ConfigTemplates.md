# Working with Configuration Templates
## Each form consumes 2 Configuration Templates: 
### First one (Template of fields) is responsible for providing relevant (for the current division, SMP) set of fields, dependencies of their displaying and Validation Rules
### Second one (Language Template): for providing relevant (for the current locale) translations.

1. Template of fields 

([example:](https://images.engage.3m.com/Web/3MCompanyGlobal/%7Bb8c535bc-4579-47b4-a485-ce507735b8ae%7D_smp-emsd-data.js))

This template provides an Object '__globScopeSMPtemplate__', which has some other Objects as its properties, number of which depends on the number of lead generation templates according to the SMP of particular division. For example, for EMSD we have 2 properties:
* leadGenType_CA - It provides settings for the case when 'I want Sales Contact' checkbox is on the page and leadgen fields are hidden untill the checkbox is checked
* leadGenType_Basic  - It provides settings for the case when 'I want Sales Contact' checkbox is not needed.

#### There is the list of Object properties below, by means of which settings of each type of template is being realized:

:red_circle: `SMPVersion` 

+ SMP Version to be reflected in the form hidden field

**Example: **

```javascript
SMPVersion: "2",
```

:red_circle: `fieldsets` 

+ All HTML field names to be included in the form, divided into fieldsets.

**Example: **

```javascript
fieldsets: {
        CA: ['emailAddress','salutation','firstName','lastName','country','elqGlobalLanguage','stateProv','EMSD_cust_type','appHeader', ['app1', 'app3', 'app9', 'app4', 'app6', 'app5', 'app7', 'app8', 'app10', 'app2', 'app11', 'app12', 'app13'],'EMSD_app_purp_other','mmmIndustry1','salesRequest'],
        leadgen: ['mmmJobRole1','EMSD_jr_other','company','busPhone','address1','city','zipPostal','custEnq'],
    },
```
:red_circle: `optionsForFilter` 

+ List of options (their values) in the particular SELECT field, relevant for the current SMP

**Example: **

```javascript
optionsForFilter: {
        mmmJobRole1: ["Consultant", "Engineer-Fire Protection", "Engineer-General", "Marketing", "Purchasing/Procurement/Buyer", "Research & Development", "Sales", "Manager/Supervisor", "Other"],

        mmmIndustry1: ["Transp-Aerospace Mfg", "Transp-Automotive Mfg", "Industrial-Bearings &amp; Gears Mfg", "Industrial-Chemical Mfg", "Construction-Commercial", "Comms-Telecommunications", "Comms-Data Center", "Industrial-Electrical Equip Mfg", "Industrial-Fire Protection &amp; Suppr", "Industrial-Indust Machinery &amp; Equip Mfg", "Industrial-Medical Devices Mfg", "Industrial-Paints &amp; Coatings Mfg", "Utilities-Power Dist &amp; Transmission", "Utilities-Power Generation", "Electronics-Semicon &amp; Circuit Boards", "Industrial-Turbine &amp; Engine Mfg"],
    },
```


:red_circle: `addedClasses` 

+ CSS classes to be added to a <li> wrapper of the field, HTML name of which is provided (as a key)
+ Or: CSS classes to be added to a fieldset, ID of which is provided (as a key)

**Example: **

```javascript
   addedClasses: {
        leadgen: "MMM--isVisuallyHidden",
        EMSD_app_purp_other: "MMM--isVisuallyHidden someCustomClass", 
        mmmIndustry1: "MMM--isVisuallyHidden",
        EMSD_jr_other: "MMM--isVisuallyHidden",    
        salesRequest: "MMM--gapTopLrg"           
    },
```

:red_circle: `validationRules` 

+ This is responsible for setting up Validation Rules

**Example: **

```javascript
validationRules: (validation) => {
    // code for validation is here
}
```

:red_circle: `displayRules` 

+ This is responsible for setting up Displaying Rules

**Example: **

```javascript
displayRules: (display) => {
    // code for Displaying Rules is here
}
```


2. Language Template

([example:](https://images.engage.3m.com/Web/3MCompanyGlobal/{543cc81d-516e-4fd9-a565-7f7d4d5ef6f9}_language-data-en.js))

This template provides an Object '__globScopeLanguageTemplate__', by means of which relevant translations (text in labels, error messages, options) are reflected in the form. Default fields are placed in the properties of the Object's first nesting level, 
**Example: **

```javascript
company: {
        label: "Company",
        errMessage: "Enter your company name"
    },

    city: {
        label: "City",
        errMessage: "Enter your city"
    },
```

and specific for the particular Division fields are combined within a property with an object key, matching with the particular short name of Division 
**Example: **

```javascript
EMSD: {
         EMSD_cust_type: {
            type: "select",
            label: "Company Type",
            errMessage: "Please select one",
            options: [
                ['VAR', 'Converter/VAR'],
                ['Consultancy', 'Consultancy'],
                ['Channel Partner /\ Distributor', 'Distributor/Channel partner'],
                ['End User', 'End User'],
                ['Government', 'Government'],
                ['OEM', 'OEM'],
                ['Tier', 'Tier'],
            ]

        },

        EMSD_app_purp_other: {
            type: "text",
            label: "Other application purpose",
            errMessage: "Enter your application purpose"
        },

    },
```

In case if we need to have different texts for the default fields within different divisions, just add it inside a property of an appropriate HTML name of the field, using a key, matching with a division short name

**Example: **

```javascript
    mmmIndustry1: {
        // Text in label for all divisions, except those, which were provided separately:
        label: "Industry",        
        // Text in label for EMSD only:
            EMSD: {
                label: "Industry/ Market Segment",
            },
            errMessage: "Please select one",
            options:
            [
                // [Backend value, Frontend value]   
                // ...list of options here...             
         
            ],
    }

```