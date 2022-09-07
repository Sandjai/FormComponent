# FormComponent
This constructor (js class) is used for generating either MQL forms depending on a locale, business division and appropriate SMP (Sales and Marketing Partnership agreement) or Contact Acquisition ones.

## How to use 
Business Division (for identifying which SMP template to use) is taken from the form name. Or it can be hardcoded in `setHiddenFields` method for the `division1` field (optionally).
Country (which country to be preselected in country field) and language (to select the right language template) are taken from the relevant meta tag on LP ("DCSext.locale"):
```html
    <meta name="DCSext.locale" content="en_GB">
```

Form type is taken from the form name exactly:
TEST-EMSD-202202-en_EMEA-`CON`-testLeadGen_emsd

If for example to change -CON- to any non MQL form type, it will use a default non-MQL template. Form name is reflected in 2 places on LP:
```html
    <form name="TEST-EMSD-202202-en_EMEA-CON-testLeadGen_emsd"></form>
```
AND:
```javascript
    new window.FormComponent("TEST-EMSD-202202-en_EMEA-CON-testLeadGen_emsd");
```

## Generation of the form 
### (initilization of the FormComponent, including all its methods must NOT be included into the domReady)

1. Call the 'FormComponent' class and pass it to a variable. In case if you have several forms on LP, each of them should be passed to a unique variable, like below:
```javascript
    var form1 = new window.FormComponent("TEST-EMSD-202202-en_EMEA-CON-testLeadGen_emsd");  /* Initializing Form #1 */
    var form2 = new window.FormComponent("TEST-EMSD-202202-en_EMEA-SUB-testSubscribe");     /* Initializing Form #2 */
    /* ... etc ...*/
```
Or, as another variant (preferable): is to use one the same variable (like 'form1') for all instances of the form, but being wrapped with a self invoked function, like below:
```javascript
    (function() {  
        var form1 = new window.FormComponent("TEST-EMSD-202202-en_EMEA-CON-testLeadGen_emsd");
    })()
    (function() {  
        var form1 = new window.FormComponent("TEST-EMSD-202202-en_EMEA-SUB-testSubscribe");
    })()
    /* ... etc ...*/
```
2. Provide settings for the hidden fields. Use method `setHiddenFields()`, called on a relevant form's variable (in example below variable is 'form1')
```javascript
    form1.setHiddenFields({          
	  sFDCLastCampaignName: "EMSD-2002-EMEA-GLC-MUL-Lead_gen_test_campaign-A",
	  sFDCLastCampaignID: "7012K00000169GbQAI",
	  sFDCLastCampaignStatus: "Optional",
	  leadSourceMostRecent1: "Website",
	  CTA: "Contact Us"  
	  })
    /* ... etc ...*/
```
3. In case if the form which is needed to be generated, totally matching with the default SMP template, no actions are needed here. Otherwise relevant methods (described below) should be used for achieving an appropriate result.

4. This is a final step - rendering a form. Just call method `render()` on an appropriate form variable (in example below it is a 'form1'):
```javascript
    form1.render();
```

## Methods of the FormComponent
### The two important (and mandatory) methods have been described above (`setHiddenFields()` and `render()`):
+ `setHiddenFields(data)`
Is used for setting hidden fields
```javascript
    /**
         * @param {Object} data  Key - HTML name of the hidden field, Value - its value
    */
```
+ `render()` 
Render a form ( :heavy_exclamation_mark: This method must always be the last one, at the very end. :heavy_exclamation_mark: )

### There are optional methods, used for manipulations with the form directly from LP:

:red_circle: `settings` - Allow to set some parameters of the form tag, apply custom (different from default) settings needed for the form generation

#### To change from internal TY page (which is by default) to external:

```javascript
form1.settings.vendor = 'elq-direct'; 
```

#### To change leadgen form from the option with checkbox "I want Sales Contact" (which is by default) to an option without that checkbox (+all leadgen fields are visible)

```javascript
form1.settings.leadGenType = "Basic";
```

#### To change leadgen form to the option WITH checkbox "I want Sales Contact" 

```javascript
form1.settings.leadGenType = "CA";
```

:red_circle: `changeOrder(arr)` 
OR
`changeOrder(arr, 'after')`
 Changing order of the fields. 
By default: last item in Array (arr) - is a field, right before which should be placed the rest fields from the Array (arr).
For changing the default behaviour from 'right before' to 'right after' an additional parameter 'place' (equal to 'after') should be added.
```javascript
    /**
     * @param {Array} arr  - Array of HTML names of the fields
     * @param {string} place  - Equal to 'after' in case if needed to change a default behaviour
     */
```
**Example:**
```javascript
form1.changeOrder(['salutation','firstName','lastName','EMSD_cust_type']); /* To move fields 'salutation','firstName','lastName' right before the 'EMSD_cust_type' field */
form1.changeOrder(['city','zipPostal'], 'after');   /* To move 'city' right after the 'zipPostal' field */
``` 

:red_circle: `newField({ label: '', errMessage: '', type: '', options: '', name: '', value: '', className: '', required: 'false' })`
New field declaration. (Adding a new declarated field to a form is managed via a next method below).
```javascript
 /**
     * 
     * @param {Object} data - Includes settings of the new field:
     * label: '',       - Mandatory
     * errMessage: '',  - Mandatory
     * type: '',        - Mandatory: (possible values for type: 'text', 'textarea', checkbox', 'radio', 'select', 'header')
     * options: '',     - only in case if type = 'select'
     * name: '',        - Mandatory: (should be matching with the HTML name field of the form)      
     * className: '',   - Optional: class for <li> wrapper of the field         
     
*/

newField({ label: '', errMessage: '', type: '', options: '', name: '', value: '', className: ''})

```
**Examples:**
1) create a text field
```javascript
  form1.newField({
      label: 'Text field', 
      errMessage: 'This field is mandatory', 
      type: 'text', 
      name: 'txtField',
    });
```

:red_circle: `addField(name)`
OR
`addField(name, placeBefore, ifMandatory)`
Adds a new field to LP
```javascript
 /**
     * @param {string} name - HTML name of the new form field 
     * @param {string} placeBefore - HTML name of the form field, before which a new field should be added. 
     * @param {boolean} ifMandatory - by default it's 'false'. Place 'true' if this fields needs to be mandatory.
     * If this variable is absent, new field is being added to the very end of the form. 
*/

addField(name, placeBefore, ifMandatory)

```
**Example:**
```javascript
  form1.addField('testChbx'); /* Adds optional field 'testChbx' to the very end of the form */
  form1.addField('testCustomField', 'custEnq'); /* Adds optional field 'testCustomField' right before the 'custEnq' field */ 
  form1.addField('address2', 'city', 'true'); /* Adds mandatory field 'address2' right before the 'city' field */ 
```   


:red_circle: `addField(name)`
OR
`addField(name, placeBefore, ifMandatory)`
Adds a new field to LP
```javascript
 /**
     * @param {string} names - array of HTML names of the new form fields 
     * @param {string} placeBefore - HTML name of the form field, before which a new field should be added. 
     * @param {boolean} ifMandatory - by default it's 'false'. Place 'true' if this fields needs to be mandatory.
     * If this variable is absent, new field is being added to the very end of the form. 
*/

addFields(names, placeBefore)

```
**Example:**
```javascript
  form1.addFields(['testChbx','testCustomField'], 'custEnq'); /* Adds optional fields right before the 'custEnq' field */ 
```   


:red_circle: `removeFields(names)`
Removes fields from the form
```javascript
/**
    * @param {string, Array} name - HTML name of the form (can be of 'string' type (one name), or as an array of several names)
*/
removeFields(name);
removeFields([name1, name2, name3]);
```
**Example:**
```javascript
    form1.removeField('address1'); /* Removes a field with HTML name 'address1' from the form */ 
```    

:red_circle: `addClass(item, cl)`
Adds CSS class, which can be added according to 1 of the 3 scenarios: 
1) To a fieldset (if ID of the fieldset is provided, as 'item' parameter. On lead gen forms there are 2 fieldsets: with ID = "CA" and with ID = "leadgen")
2) To li, which is a  wrapper of the field (if HTMl name of the field is provided as 'item' parameter) 
3) form  tag (if parameter 'item' is equal to 'form')
 
```javascript
/**
     * @param {string} item - item shoud be equal to: ID of fieldset, HTML name of the field, or 'form'
     * @param {string} cl class name
     *      
*/
addClass(item, cl)
```
**Examples:**
1) Adding a CSS class 'MMM--gapTopMed'  to a fieldset
 with ID 'leadgen':
```javascript
form1.addClass('leadgen', 'MMM--gapTopMed');

```
2) Adding a CSS class 'inputLiClass'  to a li, which is a  wrapper of the field with HTML name 'firstName' like this:
```html
<li class="inputLiClass">
    <input name = "firstName" ...>
</li>
```

```javascript
form1.addClass('firstName', 'inputLiClass');
```

3) Adding a CSS class 'formTESTclass'  to a form tag:
```javascript
form1.addClass('form', 'formTESTclass');
```

:red_circle: `removeClasses(item)`
Removes all CSS classes from:
1) A fieldset (if ID of the fieldset is provided, as 'item' parameter. On lead gen forms there are 2 fieldsets: with ID = "CA" and with ID = "leadgen")
2) A li, which is a  wrapper of the field (if HTMl name of the field is provided as 'item' parameter) 
3) form  tag (if parameter 'item' is equal to 'form')
 
```javascript
/**
     * @param {string} item - item shoud be equal to: ID of fieldset, HTML name of the field     * 
     *      
*/
removeClasses(fName)
```
**Examples:**

```javascript
form1.removeClasses('mmmIndustry1');

```
:red_circle: `setLabel(name, val)`
Sets a new text for label of the field
```javascript
 /**
     * @param {string} name - HTM name of the field
     * @param {string} val - new Text for the label 
     */
    setLabel(name, val)
```
**Example:**
```javascript
form1.setLabel('country', 'Country');
```

:red_circle: `setErrMessage(name, val)`
Set a new text for the error message of the field
```javascript
 /**
     * @param {string} name  - HTM name of the field
     * @param {string} val  - new Text for the error message  
     */
    setErrMessage(name, val)
```
**Example:**
```javascript
form1.setErrMessage('EMSD_app_purp_other', 'Please specify your application type');
```
:red_circle: `setTY(header, paragraph)`
Sets a new text for TY message
```javascript
 /**
     * @param {string} header - text №1
     * @param {string} paragraph - text №2
     */
    setTY(header, paragraph)
```
**Example:**
```javascript
form1.setTY('Thanks', 'Your form was sumbitted');
```

:red_circle: `setOptions(name, val)`
Set new options in select field
```javascript
 /**
     * @param {string} name - HTM name of the field
     * @param {Array of Arrays} val - // [[Backend value, Frontend value], [Backend value, Frontend value], [Backend value, Frontend value], [...]] 
     */
    setOptions(name, val)
```
**Example:**
```javascript
form1.setOptions('mmmIndustry1', [
    // [[Backend value, Frontend value]
    ["Transp-Bus Mfg", "Bus Manufacturing"],
    ["Transp-Car Care Centers", "Car Care Centers"],
    ["Industrial-Chemical Mfg", "Chemical Manufacturing"],
    ["Transp-Collison Repair", "Collison Repair"],
    ["Transp-Comm & Specialty Veh Maint", "Commercial & Specialty Vehicle Maintenance"],
]);
```

:red_circle: `selectedItems - (works for selects, checkboxes, radio buttons)`
Preselects option in select tag

***Add a key, equal to a fields' HTML name and store there a value of an option, which you'd like to have preselected, like below***
**Examples:**
1) To make Germany be a preselected country
```javascript
form1.selectedItems.country = 'Germany';
```

2) To make 'Fire Protection Engineer' be a preselected jobRole
```javascript
form1.selectedItems.mmmJobRole1 = 'Engineer-Fire Protection';
```

**Make checkbox to be checked**
Add a key, equal to a fields' HTML name and store there a value equal to: true

```javascript
/* make checkbox with HTML name 'app1' to be checked */
  form1.selectedItems.app1 = true;
```


:red_circle: `updateSelectOpts(name, ...options)`
Rewrites options in select field in provided order

**Example:**
Rewrites options in select field (HTML name === "mmmJobRole1") in provided order ("Firefighter","Safety Manager","Other"_)
```javascript
 form1.updateSelectOpts ("mmmJobRole1", "Firefighter","Safety Manager","Other");
```

:red_circle: `hideFields(...items)`
 items - HTML name(s) of the field(s), needed to be hidden (by adding a CSS class 'MMM--isVisuallyHidden'). Also, this method makes a field to be optional in terms of Validation.
```javascript
 /**
     * 
     * @param  {...string} items - Strings of items, separated with commas
     */
    hideFields(...items)
```

**Examples:**
1) To hide a field with HTML name 'EMSD_cust_type'
```javascript
form1.hideFields('EMSD_cust_type'); 
```
2) To hide fields with HTML names 'app1','app2',..., app13
```javascript
 form1.hideFields('app1','app2','app3','app4','app5','app6','app7','app8','app9','app10','app11','app12','app13');
```

:red_circle: `staticValidationRules`
Special Object for storing changes in static validation rules.

**Examples:**
```javascript
form1.staticValidationRules = {     
        firstName: 'false',
        lastName: 'false',
        salutation: 'false',
        mmmIndustry1: 'true',
        salesRequest: 'false',     
    },
```
OR the same:

```javascript
form1.staticValidationRules.firstName = 'false';
form1.staticValidationRules.lastName = 'false';
form1.staticValidationRules.salutation = 'false';
form1.staticValidationRules.mmmIndustry1 = 'true';
form1.staticValidationRules.salesRequest = 'false';
```

:red_circle: `showOther (fName1, fName2, opt)`

```javascript
 /**
         * 
         * @param {string} fName1 - HTML name of the field (checkbox or SELECT)
         * @param {string} fName2 - HTML name of the dependable field        
         * @param {string} opt - Optional. Default value = "Other". Value of option in Select (fName1) field, which should trigger fName2 to appear 
         */
    showOther(fName1, fName2, opt)
```

**Examples:**
1) To show mandatory field 'EMSD_app_purp_other' if checkbox 'app13' is checked
```javascript
form1.showOther ('app13','EMSD_app_purp_other');        
```
2) To show optional field 'EMSD_jr_other' if 'mmmJobRole1' is equal to 'Other' (which is a default value)
```javascript
form1.staticValidationRules.EMSD_jr_other = 'false'; // to make 'Other Job Role' field to be optional
form1.showOther ('mmmJobRole1', 'EMSD_jr_other');

```
2) To show optional field 'textField' if 'distributor' is equal to 'Some Dealer'
```javascript
form1.staticValidationRules.EMSD_jr_other = 'false'; // to make 'Other Job Role' field to be optional
form1.showOther ('distributor', 'textField', 'Some Dealer');

```


:red_circle: `addDependency(data)` Shows/hides fieldset depending on a made choice in checkbox or 
     SELECT field ('Yes' AND 'on' are default values)

```javascript
   
         /**
     * addDependency(data) - Shows/hides fieldset depending on a made choice in checkbox or 
     * select field ('Yes' AND 'on' are default values)
     * @param {Object} data 
     * 
     * @param {Array} data.mandatory - Array of HTML names of the fields, which 
     * should be mandatory in case if trigger-event happends     * 
     * @param {string} data.fieldset - ID of the dependable element (fieldset)
     * @param {Array} data.firstOptional - HTML names of the fields, which should be optional first, and mandatory after
     * the event has been triggered
     * @param {string} data.triggerName - HTML name of the field, which should trigger an event (select or checkbox)
     * @param {string, Array} data.optionValue - optional, just value(s) for a select field, which should trigger an event ('Yes' AND 'on' are default values)
     * @param {Function} data.condition - optional, just for adding additional conditions (default one was being set up automatically).
     * data.condition is a Function, which should return Boolean
     */
        

form1.addDependency (data);

```

**Examples:**
1) To show fieldset with ID "leadgen" with the fields included inside when 'salesRequest' is checked (in case of checkbox)
or equal to 'Yes' or 'on' in case of a SELECT field. Mandatory fields: 'company', 'city', 'address1', 'busPhone'.
Even though 'company' is in another fieldset, it will become mandatory if "leadgen" fieldset will be shown, and optional, in case 
when "leadgen" fieldset is hidden. 

```javascript

   form1.addDependency({
            mandatory: ['company', 'city', 'address1', 'busPhone'],          
            fieldset: "leadgen",
            firstOptional: ['company'],
            triggerName: 'salesRequest',
            
        });
```

2) To show fieldset with ID "customFieldset" with the fields included inside when 'mmmJobRole1' is equal to 
'Engineer-General' or 'Engineer-Fire Protection'. Mandatory fields: 'company', 'mmmIndustry1'.

```javascript

   form1.addDependency({
            mandatory: ['company', 'mmmIndustry1'],          
            fieldset: "customFieldset",            
            triggerName: 'mmmJobRole1',
            optionValue: ["Engineer-General", "Engineer-Fire Protection"]            
        });
```


:red_circle: `checkboxesGroup (namesOfgroup)`

```javascript
/**
     * Method for combining checkboxes into a group
     * @param {string} namesOfgroup - (mandatory) HTML names of checkboxes in format: 'chbx chbx2 chbx3' (separated by space)
     * @param {Array} data - (optional)  Object of settings   
     * @param {number} data.numMin - (optional) minimum number of checkboxes to be checked (default = 1)
     * @param {number} data.numMax - (optional) maximum number of checkboxes to be checked (default = all checkboxes)
     * @param {string} data.errorMessage - (optional) Secondary source of error message (1st prioritet is value in 'data-msg-required')
     */
form1.checkboxesGroup (namesOfgroup, {data});

```

**Examples:**
1) To combine checkboxes with different names into a one validation group

```javascript
form1.checkboxesGroup ('app1 app2 app3 app4 app5 app6 app7 app8 app9 app10 app11 app12 app13');        
```
```javascript
form1.checkboxesGroup ('app1 app2 app3 app4 app5 app6 app7 app8 app9 app10 app11 app12 app13', {numMax: 3})
```



:red_circle: `addDependencyFromCheckboxes('fNameToShow', scheme)`
To show/hide relevant options in SELECT field, which is dependable of checked checboxes

```javascript
   
         /**
         * Shows SELECT field and generates a relevant list of options depending on a scheme of chosen checkboxes
         * @param {string} fNameToShow - HTML name of the SELECT field, which is needed to be shown
         * @param {Map} scheme - scheme of dependencies. On the left hand of the Map is a value of options in SELECT, on the right hand: an array of HTML names of checkboxes.      
         */
        

form1.addDependencyFromCheckboxes (fNameToShow, scheme);

```

**Examples:**
1) To show relevant Industries in SELECT field depending on a chosen checkboxes (Applications)

```javascript

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
```

:red_circle: `addDependencyFromCheckboxes('fNameToShow', scheme)`
To show/hide relevant options in SELECT field, which is dependable of checked checboxes

```javascript
   
         /**
         * Shows SELECT field and generates a relevant list of options depending on a scheme of chosen checkboxes
         * @param {string} fNameToShow - HTML name of the SELECT field, which is needed to be shown
         * @param {Map} scheme - scheme of dependencies. On the left hand of the Map is a value of options in SELECT, on the right hand: an array of HTML names of checkboxes.      
         */
        

form1.addDependencyFromSelect (fName1, fNameToShow, scheme);

```

**Examples:**
1) To show relevant Industries in SELECT field depending on a chosen option in field1

```javascript

    let schemeForIndustry = new Map([
                  
            ['Transp-Aerospace Mfg',        				['option1', 'option3', 'option5']],
            ['Transp-Automotive Mfg',     					['option1', 'option4']],
            ['Industrial-Bearings &amp; Gears Mfg',      	['option1', 'option2']],
            ['Industrial-Chemical Mfg',      				['option3', 'option5']],
            ['Comms-Data Center',      						['option2', 'option3', 'option4', 'option5']],
            ['Industrial-Electrical Equip Mfg',      		['option2', 'option3']],
            ['Industrial-Fire Protection &amp; Suppr',      ['option1']],                            
        ])

 form1.addDependencyFromSelect('mmmIndustry1', schemeForIndustry);        
```


:red_circle: `updateHidden (f1Name, f2Name, scheme)`
To pass a relevant value to a hidden field, dependable from a chosen option in the SELECT field

```javascript
   
    /**
     * 
     * @param {string} f1Name - HTML name of the SELECT field
     * @param {string} f2Name - HTML name of the Hidden field, value to which we need to pass (dependable from a chosen option in SELECT field)
     * @param {Map} scheme - Map of dependencies
     */
    
    form1.updateHidden (f1Name, f2Name, scheme)

```

**Examples:**

```javascript

    let customScheme = new Map([
                  
            ['Transp-Aerospace Mfg',        				'value1'],
            ['Transp-Automotive Mfg',     					'value2'],
            ['Industrial-Bearings &amp; Gears Mfg',      	'value3'],
            ['Industrial-Chemical Mfg',      				'value4'],
            ['Comms-Data Center',      						'value5'],
            ['Industrial-Electrical Equip Mfg',      		'value6'],
            ['Industrial-Fire Protection &amp; Suppr',      'value7'],                            
        ])

 form1.updateHidden ('mmmIndustry1', 'hiddenField1', customScheme);        
```




    

         