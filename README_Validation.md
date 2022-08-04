# Validation Class
## This class is responsible for Validation Rules only

:red_circle: `To group checkboxes with different HTML names and provide a one common error message for them` 

```javascript
 checkboxesGroups(data) 

     /**
     * Method for combining checkboxes into a group
     * @param {Array} data - Array of Objects in format:  [{namesOfgroup: '', errorMessage: '', condition}, ... ]
     * @param {string} namesOfgroup - HTML names of checkboxes in format: 'chbx chbx2 chbx3'
     * @param {string} errorMessage - Secondary source of error message (1st prioritet is value in 'data-msg-required')
     * @param {number} numMin - minimum number of checkboxes to be checked (default = 1)
     * @param {number} numMax - maximum number of checkboxes to be checked (default = all checkboxes)
     * @param {Function} condition - advanced method, optional (just in case if you want to rewrite totally the normal behaviour of validation for checkboxes. Only if you have any complicated logic, different from the default one). Should return true or false.
     */

   
```

**Example: **

```javascript

        validation.checkboxesGroups([

            {namesOfgroup: 'app1 app2 app3 app4 app5 app6 app7 app8 app9 app10 app11 app12 app13',
            errorMessage: 'Please choose at least one application type'
            },
                           

        ]);
  ```

  :red_circle: `To set Validation Rules depending on a condition` 
 

+ To show another fieldset

```javascript
addDependencyRule(fields, condition)

  /** 
     *  @param {Array} fields
     *  @param {Function} condition - should retutn {boolean}: true or false
     *
     */
 ```        

**Examples: **

```javascript
const appOtherCondition = function () {return ($('[name="app13"]').is(':checked'))};    
validation.addDependencyRule (['EMSD_app_purp_other'], appOtherCondition);
```

```javascript
const leadGenCondition = function () {return ($('[name="salesRequest"]').is(':checked'))};   
// ALL Fields (INCLUDING HIDDEN ONES, which are in MQL fieldset), which should be mandatory in MQL Form type (in case if they are visible)
        var leadGenMandatoryFields = ['custEnq', 'zipPostal', 'city', 'address1', 'busPhone', 'company', 'mmmJobRole1', 'firstName', 'lastName', 'salutation', 'EMSD_jr_other', 'EMSD_app_purp_other'];
```        


  :red_circle: `render` 
Should go at the very end, after the others method, being called in this class



