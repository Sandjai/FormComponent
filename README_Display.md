# Display Class
## This class is responsible for displaying/passing relevant values to form fields functionality only. 

:red_circle: `To show another field/fieldset` 

+ To show another field

```javascript
 showOther(f1_name, f2_name, val = "Other")
 /**
     * showOther - Sets dependencies between field №1 and hidden field №2 to be shown
     * @param {string} f1_name - HTML name of the field 1
     * @param {string} f2_name - HTML name of the dependable field
     * @param {string} value - if tag name of field1 is 'SELECT', val - is a value which should trigger field2 (= "Other" by default)
     * 
     */
```

**Examples: **

```javascript
// We want to show field 'jobRoleOther' when value of 'mmmJobRole1' is equal to "Other"
  display.showOther('mmmJobRole1', 'jobRoleOther');
  ```
  ```javascript
// We want to show field 'company' when value of 'mmmJobRole1' is equal to "Marketing"
  display.showOther('mmmJobRole1', 'company', "Marketing");
  ```
```javascript
// We want to show field 'address1' when checkbox 'agree' is checked
  display.showOther('agree', 'address1');
```

+ To show another fieldset

```javascript
dependIdFromName (f1_name, f2_id, val)

 /**
 * Shows/hides element(ex: fieldset) depending on a field 1.
 * 
 * @param {string} f1_name - HTML name of the field 1
 * @param {string} f2_id - ID of the dependable element (fieldset)
 * @param {string} val - if tag name of field1 is 'SELECT', val - is a value which should trigger field2
 */
 ```        

**Examples: **

```javascript
// We want to show fieldset 'leadgen' when 'salesRequest' field is equal to 'Yes'
   display.dependIdFromName ('salesRequest', 'leadgen', 'Yes');
```

```javascript
// We want to show fieldset 'leadgen' when checkbox 'salesRequest' is checked
   display.dependIdFromName ('salesRequest', 'leadgen');
```

:red_circle: `Add "optional" to label` 

```javascript
 /**
            /**
             * To add 'optional' in label for Contact Acquisition Form and removing 'optional' from label in a lead gen one
             * @param {Object} data
             * @param {Array} data.labelOptionalNames - array of HTML names (/name) of the dependable fields 
             * @param {string} data.triggerName - field which should trigger an action
             * @param {string, Array} data.val - value or values of options which should trigger an event (in case of SELECT)
             * @param {boolean} data.reverseAction - make it true for changing a behaviour to an opposite one (by default it is false)
             */

            addOptionalToLabel ({data})
```
**Examples: **
+ If trigger field is a checkbox with name 'salesRequest'. 
If 'salesRequest' is NOT checked, fields from  `labelOptionalNames` will have 'optional' in label.
```javascript
display.addOptionalToLabel ({
                    labelOptionalNames: ['firstName','lastName','salutation'],                     
                    triggerName: 'salesRequest'
                })

```
+ If trigger field is a SELECT field with name 'salesRequest'. If 'salesRequest' is NOT equal to 'Yes',
fields from  `labelOptionalNames` will have 'optional' in label.
```javascript
display.addOptionalToLabel ({
                    labelOptionalNames: ['firstName','lastName','salutation'],                     
                    triggerName: 'salesRequest',
                    val: 'Yes'
                })

```

+ If trigger field is a SELECT field with name 'country'. If 'country' is equal to one of the values
from the fields in `val` property, 'salutation' will NOT have 'optional' in label.
(Because `reverseAction: false`, as by default)

```javascript
display.addOptionalToLabel({
      labelOptionalNames: ['salutation'],                     
      triggerName: 'country',
      val: ['Austria', 'Germany', 'Switzerland'],
    })

```

+ If trigger field is a SELECT field with name 'country'. If 'country' is equal to one of the values
from the fields in `val` property, fields from  `labelOptionalNames` will have 'optional' in label.
(Because `reverseAction: true`. Otherwise, if `reverseAction: false`, as by default, action will
be changed to an opposite one.)
```javascript
display.addOptionalToLabel({
      labelOptionalNames: ['firstName', 'lastName'],                     
      triggerName: 'country',
      val: ['Austria', 'Germany', 'Switzerland'],
      reverseAction: true,
    })

```

:red_circle: `To generate a list of options depending on checkboxes` 

```javascript
 complexDepFromCheckboxes (fNameToShow, scheme)
 /**
     * complexDepFromCheckboxes - Shows SELECT field and generates a relevant list of options depending on a scheme of chosen checkboxes
     * @param {string} fNameToShow - HTML name of the SELECT field, which is needed to be shown
     * @param {Map} scheme - scheme of dependencies. On the left hand of the Map is a value of options in SELECT, on the right hand: an array of HTML names of checkboxes.      
     */
```
**Example: **
+ Generating a list of options for 'mmmIndustry1' field depending on choosen checkboxes (app1, app2, app3, ...)
(if there is only one option to be shown - field2 will not appear, but it will be preselected with a relevant option)

```javascript
const schemeForIndustry = new Map([

    //Values of options to be shown              //Array of names of checkboxes                        
    ['Transp-Aerospace Mfg',        				      ['app1', 'app2', 'app3', 'app4']],
    ['Transp-Automotive Mfg',     					      ['app1', 'app2', 'app4']],
    ['Industrial-Bearings &amp; Gears Mfg',      	['app11', 'app13']],                 
                                    
    ])

display.complexDepFromCheckboxes ('mmmIndustry1', schemeForIndustry);
```


:red_circle: `To generate a list of options depending on checked checkboxes` 

```javascript
 complexDepFromSelect (field1Name, fNameToShow, scheme)
 /**
     * complexDepFromSelect - Shows SELECT field and generates a relevant list of options depending on a scheme of chosen option
     * @param {string} field1Name - HTML name of the field1
     * @param {string} fNameToShow - HTML name of the SELECT field, which is needed to be shown
     * @param {Map} scheme - scheme of dependencies. On the left hand of the Map is a value of options in SELECT to be shown, on the right hand: an array of values of relevant options from the field 1.      
     */
```
**Example: **
+ Generating a list of options for 'EMSD_cust_type' field depending on choosen option in field 'mmmJobRole1'
(if there is only one option to be shown - field2 will not appear, but it will be preselected with a relevant option)

```javascript
    const scheme2 = new Map([

    //Values of options to be shown              //Array of values of options of the field 1                        
    ['Consultant',        		                  ['VAR', 'Consultancy', 'End User']],
    ['Engineer-Fire Protection',                ['Government', 'OEM']],
    ['Marketing',      	                        ['Tier']],                 
                                    
    ])

    display.complexDepFromSelect ('mmmJobRole1', 'EMSD_cust_type', scheme2);
```

:red_circle: `To pass a value to a hidden field depending on a chosen option in the field 1` 

```javascript
 updateHidden ('field1', 'hiddenField', scheme);
 /**
     * complexDepFromCheckboxes - Shows SELECT field and generates a relevant list of options depending on a scheme of chosen checkboxes
     * @param {string} field1     - HTML name of the SELECT field 1
     * @param {string} hiddenField - HTML name of the hidden field
     * @param {Map} scheme - scheme of dependencies. On the left hand of the Map is a value of options in SELECT field1, on the right hand: a relevant value for a hidden field 'hiddenField3'.   
     */
```
**Example: **
+ Passes a relevant value to a hidden field 'hiddenField3'.

```javascript
   const schemeForHidden = new Map([

    //Values of options from the field 1        //Value for the hidden field                        
    ['Consultant',        		                  'value 1'],
    ['Engineer-Fire Protection',                'value 2'],
    ['Marketing',      	                        ''],                 
                                    
    ])

    display.updateHidden ('mmmJobRole1', 'hiddenField3', schemeForHidden);
```
