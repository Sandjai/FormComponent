## Working with Configuration Templates
### Each form consumes 2 Configuration Templates: 
#### First one (Template of fields) is responsible for providing relevant (for the current division, SMP) set of fields, dependencies of their displaying and Validation Rules
#### Second one (Language Template): for providing relevant (for the current locale) translations.

1. Template of fields 

([example](https://images.engage.3m.com/Web/3MCompanyGlobal/%7Bb8c535bc-4579-47b4-a485-ce507735b8ae%7D_smp-emsd-data.js))

This template provides an Object __globScopeSMPtemplate__, which has some other Objects as its properties, number of which depends on the number of lead generation templates according to the SMP of particular division. For example, for EMSD we have 2 properties:
* leadGenType_CA - It provides settings for the case when 'I want Sales Contact' checkbox is on the page and leadgen fields are hidden untill the checkbox is checked
* leadGenType_Basic  - It provides settings for the case when 'I want Sales Contact' checkbox is not needed.

#### There is the list of Object properties below, by means of which settings of each type of template is being realized:


:red_circle: `SMPVersion` 

+ SMP Version to be reflected in the form hidden field

**Example:**

```javascript
SMPVersion: "2",
```

:red_circle: `fieldsets` 

+ All HTML field names to be included in the form, divided into fieldsets.

**Example:**

```javascript
fieldsets: {
        CA: ['emailAddress','salutation','firstName','lastName','country','elqGlobalLanguage','stateProv','EMSD_cust_type','appHeader', ['app1', 'app3', 'app9', 'app4', 'app6', 'app5', 'app7', 'app8', 'app10', 'app2', 'app11', 'app12', 'app13'],'EMSD_app_purp_other','mmmIndustry1','salesRequest'],
        leadgen: ['mmmJobRole1','EMSD_jr_other','company','busPhone','address1','city','zipPostal','custEnq'],
    },
```
*In example above you may notice, that checkboxes 'app1', 'app2', 'app3', ... are placed inside an array - this is for having them in 2 columns layout (relevant for checkboxes only). In this case checkboxes are wrapped with an additional <ul> tag with a class 'app_group' (name of the class is generated automatically my means of concatenation of the HTML name of the first checkbox (without a number) and a string '_group')*

:red_circle: `staticValidationRule` 

+ Fields, which should be optional, have a value: 'false'. Mandatory ones should have a value 'true'. By default all fields are mandatory.

**Example:**

```javascript
    staticValidationRules: {
        firstName: 'false',
        lastName: 'false',
        salutation: 'false',
        mmmIndustry1: 'false',
        salesRequest: 'false',     
    },
```

:red_circle: `optionsForFilter` 

+ List of options (their values) in the particular SELECT field, relevant for the current SMP

**Example:**

```javascript
optionsForFilter: {
        mmmJobRole1: ["Consultant", "Engineer-Fire Protection", "Engineer-General", "Marketing", "Purchasing/Procurement/Buyer", "Research & Development", "Sales", "Manager/Supervisor", "Other"],

        mmmIndustry1: ["Transp-Aerospace Mfg", "Transp-Automotive Mfg", "Industrial-Bearings &amp; Gears Mfg", "Industrial-Chemical Mfg", "Construction-Commercial", "Comms-Telecommunications", "Comms-Data Center", "Industrial-Electrical Equip Mfg", "Industrial-Fire Protection &amp; Suppr", "Industrial-Indust Machinery &amp; Equip Mfg", "Industrial-Medical Devices Mfg", "Industrial-Paints &amp; Coatings Mfg", "Utilities-Power Dist &amp; Transmission", "Utilities-Power Generation", "Electronics-Semicon &amp; Circuit Boards", "Industrial-Turbine &amp; Engine Mfg"],
    },
```


:red_circle: `addedClasses` 

+ CSS classes to be added to a <li> wrapper of the field, HTML name of which is provided (as a key)
+ Or: CSS classes to be added to a fieldset, ID of which is provided (as a key)

**Example:**

```javascript
   addedClasses: {
        leadgen: "MMM--isVisuallyHidden",
        EMSD_app_purp_other: "MMM--isVisuallyHidden someCustomClass", 
        mmmIndustry1: "MMM--isVisuallyHidden",
        EMSD_jr_other: "MMM--isVisuallyHidden",    
        salesRequest: "MMM--gapTopLrg"           
    },
```

:red_circle: `displayValidationRules` 

+ This is responsible for setting up custom Displaying & Validation Rules (setting up dependencies). Just use relevant methods inside (described in main Readme file). 

**Example:**

```javascript
    displayValidationRules: (form1) => {

        form1.addDependency({
            mandatory: ['custEnq', 'zipPostal', 'city', 'address1', 'busPhone', 'company', 'mmmJobRole1', 'firstName', 'lastName', 'salutation'],          
            fieldset: "leadgen",
            firstOptional: ['firstName','lastName','salutation'],
            triggerName: 'salesRequest',
            
        });

        form1.showOther ('app13','EMSD_app_purp_other');
        form1.showOther ('mmmJobRole1', 'EMSD_jr_other');

    }    

```


2. Language Template

([example](https://images.engage.3m.com/Web/3MCompanyGlobal/{543cc81d-516e-4fd9-a565-7f7d4d5ef6f9}_language-data-en.js))

This template provides an Object __globScopeLanguageTemplate__, by means of which relevant translations (text in labels, error messages, options) are reflected in the form. Default fields are placed in the properties of the Object's first nesting level, 
**Example:**

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
**Example:**

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

**Example:**

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


## Existing templates:

1. Template of Fields:
EMSD: 'http://localhost:8080/src/configTemplates/smp/temporary/test-smp-data-emsd.js',

2. Language templates:
Bulgarian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{a8bd3b35-0670-4cde-99da-4ce6acd9c9a1}_language-data-bg.js',
Croatian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{d81cafa0-938d-4062-b8b4-fbd41e98836e}_language-data-hr.js',
Czech: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{4ad7d5cd-17a7-4378-8a1a-966670a52270}_language-data-cs.js',
Danish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{aae3a5b9-a25f-4532-bbc4-4c6197d39431}_language-data-da.js',
Dutch: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{87641d1c-faf4-44cf-b3f4-1377b2b55d51}_language-data-nl.js',
English: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{543cc81d-516e-4fd9-a565-7f7d4d5ef6f9}_language-data-en.js',
Estonian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{3d224f5b-76c9-4be3-b136-259ab65c2abc}_language-data-et.js',
Finnish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{eadb416c-5153-4b87-9215-6be7becc55a2}_language-data-fi.js',
French: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{e347b50a-a48b-4556-997c-c6a411b6551c}_language-data-fr.js',
German: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{59fba2ec-eb80-415d-85f5-e549c218a1fe}_language-data-de.js',
Greek: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{e4cff3ec-b0a7-499b-ac29-a0a934ba403f}_language-data-el.js',
Hebrew: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{aafaf0bb-19da-4a44-8108-7ca1a9c2ae87}_language-data-iw.js',
Hungarian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{15809426-16a1-4bf3-90d8-82eee2ec4d4b}_language-data-hu.js',
Italian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{c4ece686-8662-4755-b6de-480fc8d078d5}_language-data-it.js',
Latvian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{a3c34d4f-c8ed-42c9-b669-33fc9da8f1e3}_language-data-lv.js',
Lithuanian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{adbb416d-b5d3-4caf-9b1d-298344916be0}_language-data-lt.js',
Norwegian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{47cb46af-709f-4b03-a76c-552744672568}_language-data-no.js',
Polish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{d2561afb-fe13-428e-b907-6af9ce2c05e6}_language-data-pl.js',
Portuguese: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{2c261101-fd15-4d50-8793-1d5ce64b488a}_language-data-pt.js',
Romanian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{59110a15-de93-4d19-bf92-03e84a0815fe}_language-data-ro.js',
Serbian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{1619a415-f5ec-4ec0-9747-b9a0dafdd48c}_language-data-sr.js',
Slovakian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{3d537998-c514-4fbb-be00-33911c4697ba}_language-data-sk.js',
Slovenian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{fb338cfd-65b5-4359-93f7-dabcad99ff9c}_language-data-sl.js',
Spanish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{6a67ca63-14ea-40f9-9644-f5ee3448eac3}_language-data-es.js',
Swedish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{853a9287-873c-48f4-84d7-d8a8630f1b41}_language-data-sv.js',
Turkish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{e8e95aaf-1535-4a35-8870-9d921d0a1107}_language-data-tr.js',
Ukrainian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{b90aa56f-150f-4ea5-8ac0-77e3887b4c38}_language-data-uk.js',


### Technical information about the tool 
**(!is still in progress!)**
There are 2 JS classes for managing display&validation rules (for achieving more flexability by mixing them in appropriate way in FormComponent methods)
- Constructor for Validation Rules: https://github.com/gsemakin/FormComponent/blob/master/README_Validation.md
- Constructor for Displaying Rules: https://github.com/gsemakin/FormComponent/blob/master/README_Display.md   