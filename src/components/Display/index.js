       /**
 * Class for displaying fields
 * @param {Object} el - Form Element
 */
       

        export default class DisplayFormFields {    

          static instance = 0;       

          constructor (el, optionalText) {
              this.el = el;
              this.depChbxGrId = 0;
              this.rules = [];
              this.optionalText = optionalText;
        
            this.constructor.instance++;
            
              this.initEvent();            
          }
        
          initEvent() {
            $(this.el).on('change', this._onChange.bind(this));   
          }
        
          _onChange (event) {
           
            const targetEl = event.target;
            
            $(this.rules).each((i,item) => { 
              
                   
              if ($(item[0]).attr('name') === $(targetEl).attr('name')) {                     
                if (item[1]()) {
                  return false;
                }
              }
            })
          }
        
        /*
          
          _getElByName (name) {
            return $(this.el).find("[name=\"".concat(name, "\"]"));
          }
        
          _getElById (id) {
            return $(this.el).find("[id=\"".concat(id, "\"]"));
          }
        
          */
        
        
        
          _hideEl (el) {
            $(el).closest('li').addClass('MMM--isVisuallyHidden');
          }
        
          _showEl (el) {
            $(el).closest('li').removeClass('MMM--isVisuallyHidden');
          }
        
         
        
        
          /**
           * Sets dependencies between field №1 and hidden field №2 to be shown
           * @param {string} f1_name - HTML name of the field 1
           * @param {string} f2_name - HTML name of the dependable field
           * @param {string} value - if tag name of field1 is 'SELECT', val - is a value which should trigger field2 (= "Other" by default)
           * 
           */
          
          showOther(f1_name, f2_name, val = "Other") {        
              let source = $(this.el).find("[name=\"".concat(f1_name, "\"]"));
              let depend = $(this.el).find("[name=\"".concat(f2_name, "\"]"));
              let handler;
           
              let dependId = $(depend).attr('id') ? $(depend).attr('id') : f2_name;        
          
              if ($(source).attr('type') === 'checkbox') {
        
                handler = () => {
                  $(depend).closest('li').toggleClass('MMM--isVisuallyHidden');
                  $("#".concat(dependId, "-error")).hide(); 
                }

              }
          
              if ($(source).prop("tagName") === 'SELECT') {
        
                handler = () => {
                  $("#".concat(dependId, "-error")).hide();
          
                  if ($(source).val() === val) {
                    this._showEl($(depend).closest('li'));
                    return true;
                  } else {
                    this._hideEl($(depend).closest('li'));           
                  }
                }
              }
              this.rules.push([source, handler]);
            }
        
            /**
             * Shows/hides element(ex: fieldset) depending on a field 1.
             * 
             * @param {string} f1_name - HTML name of the field 1
             * @param {string} f2_id - ID of the dependable element (fieldset)
             * @param {string} val - if tag name of field1 is 'SELECT', val - is a value which should trigger field2
             */
        
            
            dependIdFromName (f1_name, f2_id, val) {
              let source = $(this.el).find("[name=\"".concat(f1_name, "\"]"));
              let depend = $(this.el).find("[id=\"".concat(f2_id, "\"]"));
              let handler;
              
        
              if ($(source).attr('type') === 'checkbox') {
        
                handler = () => {            
                  $(depend).toggleClass('MMM--isVisuallyHidden');          
                }
              }
            
                if ($(source).prop("tagName") === 'SELECT') {
        
                  handler = () => {            
                    let valIsDeclared =  val ? true : false;
                    let selectIsBlank = !$(source).val() ? true : false;
                    let valIsSelected = ($(source).val() === val) ? true : false;
                      
                    let ifTrue = valIsSelected || (!valIsDeclared && !selectIsBlank) ? true : false;           
                    
                    if (ifTrue) {
                     
                     // this._showEl(depend);  
                     $(depend).removeClass('MMM--isVisuallyHidden');
                      return true;
                      
                    }
        
                    if (!ifTrue) {
                      $(depend).addClass('MMM--isVisuallyHidden');         
                    }              
                  }
                }
                this.rules.push([source, handler]);
            }
          
            /**
             * To add 'optional' in label for Contact Acquisition Form and removing 'optional' from label in a lead gen one
             * @param {Object} data
             * @param {Array} data.labelOptionalNames - array of HTML names (/name) of the dependable fields 
             * @param {string} data.triggerName - field which should trigger an action
             * @param {string, Array} data.val - value or values of options which should trigger an event (in case of SELECT)
             * @param {boolean} data.reverseAction - make it true for changing a behaviour to an opposite one (by default it is false)
             */
        
              
            addOptionalToLabel (data) { 

              (data.reverseAction === true) ? (data.reverseAction === true) : (data.reverseAction === false);
              
              const optionalText =  this.optionalText ? ` (${this.optionalText.toLowerCase()})` : ` (${this.optionalText.toLowerCase()})`;             
              const element = $(this.el).find("[name=\"".concat(data.triggerName, "\"]")); 
              
              const handler = () => {
            
                $(data.labelOptionalNames).each((i,name) => {       
                   
                  var targetEl = $(this.el).find("[name=\"".concat(name, "\"]"));   
                  var _id = $(targetEl).attr('id');
                  var labelText = $('label[for="' + _id + '"].MMM--blockLabel').text();

                  var rem_add = () => {
                    if (!data.reverseAction) {
                      this._removeOptionalText(_id, name, labelText, optionalText);
                    } else {
                      this._addOptionalText(_id, name, labelText, optionalText);
                    }  
                  }

                  var add_rem = () => {
                    if (!data.reverseAction) {
                      this._addOptionalText(_id, name, labelText, optionalText);                      
                    } else {
                      this._removeOptionalText(_id, name, labelText, optionalText);                      
                    }  
                  }
        
                  if (($(element).attr('type') === 'checkbox') && ($(element).is(':checked'))) {
                    rem_add();                 
                  }
                  else if (($(element).prop("tagName") === 'SELECT') && (($(element).val() === data.val)) && (!Array.isArray(data.val))) {            
                    rem_add(); 
                  }
                  else if (($(element).prop("tagName") === 'SELECT') && (Array.isArray(data.val))) {  
                   
                    if (data.val.includes($(element).val())) {
                      rem_add();                   
                      }
                     else {
                      add_rem();
                    }
                  }      
                    
                  else {
                    add_rem();
                   }                 
                  })
              }
              
              this.rules.push([element, handler]); 
                
        
          }

      

          /**
           * @param {Array} names - Array of HTML names
           * @param {string} optionalText
           */

          makeOptional (names,optionalText) {
            
            for (let name of names) {       
           
              var targetEl = $(this.el).find("[name=\"".concat(name, "\"]"));   
              if (targetEl.attr('type') != "checkbox") {
                var labelText =  $(targetEl.closest('li').find('label.MMM--blockLabel')).text();               
                
                $(targetEl.closest('li').find('label.MMM--blockLabel')).text(labelText + ` (${optionalText.toLowerCase()})`);
  
              }
            
          }
        }
        
          optionalText (_id, name, labelText,optionalText) {
              $('label[for="' + _id + '"].MMM--blockLabel').text(labelText.replace(optionalText, ""));
          }
        
          _addOptionalText (_id, name, labelText,optionalText) {
           
            // for handling a case of country+busPhone triggering twice
           if ($('label[for="' + _id + '"].MMM--blockLabel').text().includes(optionalText)) {
            return;
           }

              $('label[for="' + $(this.el).find("[name=\"".concat(name, "\"]")).attr('id') + '"].MMM--blockLabel').text(labelText + optionalText); 
              $("#".concat(_id, "-error")).hide();
              $(this.el).find("[name=\"".concat(name, "\"]")).removeClass('error');
          }

          _removeOptionalText (_id, name, labelText,optionalText) {
            $('label[for="' + _id + '"].MMM--blockLabel').text(labelText.replace(optionalText, ""));
        }          
         
        _findInScheme(scheme, name, arrOfOpts) {
          scheme.forEach((value, key) => {  
            $(value).each((i, item) => {  
                 if (item === name) {arrOfOpts.push(key)}
            });
        }); 
        }

        
        _showOptions(fNameToShow, fNameToShowOpts, arrOfOpts, lastChosenOpt) {
          
          let optNum = 0;
          let optVal = '';
          
          $(fNameToShowOpts).each((i2,opt) => {    
       
            if ($(opt).val() != null) {
             $(opt).hide();
             $(arrOfOpts).each((i,item) => {
              
                 if (item.replace("&amp;", "&") === $(opt).val().replace("&amp;", "&")) {          
                       
                     lastChosenOpt = $(opt).val();
                   	if (optVal != lastChosenOpt) {
                     optNum ++;
                    }                   
                   	optVal = lastChosenOpt;
                   
                     $(opt).show();
                                    
                 }
            
            })
        
           }
        })
          
          // Show field if number of options > 1          
            if (optNum === 1) {
            
            $(this.el).find(`[name="${fNameToShow}"]`).val(lastChosenOpt);
            $(this.el).find(`[name="${fNameToShow}"]`).closest('li').addClass('MMM--isVisuallyHidden');
        } 
          
          else {           
            $(this.el).find(`[name="${fNameToShow}"]`).closest('li').removeClass('MMM--isVisuallyHidden');
        }   
          
        }
        
         /**
         * complexDepFromCheckboxes - Shows SELECT field and generates a relevant list of options depending on a scheme of chosen checkboxes
         * @param {string} fNameToShow - HTML name of the SELECT field, which is needed to be shown
         * @param {Map} scheme - scheme of dependencies. On the left hand of the Map is a value of options in SELECT, on the right hand: an array of HTML names of checkboxes.      
         */
        
        complexDepFromCheckboxes (fNameToShow, scheme) {           
          this._addComplexDependency ([], fNameToShow, scheme);
        }
        
        /**
          * complexDepFromSelect - Shows SELECT field and generates a relevant list of options depending on a scheme of chosen option
        * @param {string} fNameToShow - HTML name of the field1
        * @param {string} fNameToShow - HTML name of the SELECT field, which is needed to be shown
        * @param {Map} scheme - scheme of dependencies. On the left hand of the Map is a value of options in SELECT to be shown, on the right hand: an array of values of relevant options from the field 1.      
        */


        complexDepFromSelect (fName1, fNameToShow, scheme) { 
          this._addComplexDependency (fName1, fNameToShow, scheme);
        }
        
      _addComplexDependency (fName1, fNameToShow, scheme) {
        
        
        if (Array.isArray(fName1)) {
          
          ++this.depChbxGrId;
          let chbxesGroup = fName1;
                      
          const allValues = [...scheme.values()].reduce((previous, current) => {return previous.concat(current)}, []);
          chbxesGroup = Array.from(new Set(allValues));   
      
          chbxesGroup.map((checkboxName) => {
            return $(this.el).find("[name=\"".concat(checkboxName, "\"]"));
          });
      
          const className = 'js_Display__dep_group' + this.constructor.instance + '-' + this.depChbxGrId;
          
          $(chbxesGroup).each((i, item) => {
            $(this.el).find(`[name="${item}"]`).addClass(className)
          })
      
          const handler = () => {
            
            let checkedCheckboxes = $(this.el).find(`.${className}:checked`);            
            
            let lastChosenOpt = '';
            let arrOfOpts = [];
          
      
            if ($(checkedCheckboxes).size()) {
              
              $(checkedCheckboxes).each((i, item)=> {
                let name = $(item).attr('name');
      
                this._findInScheme(scheme, name, arrOfOpts);
      
                let fNameToShowOpts = $(this.el).find(`[name="${fNameToShow}"] option`);
             
                this._showOptions (fNameToShow, fNameToShowOpts, arrOfOpts, lastChosenOpt);                
       
              })
            } else {
               $(this.el).find(`[name="${fNameToShow}"]`).closest('li').addClass('MMM--isVisuallyHidden');
              	$(this.el).find(`[name="${fNameToShow}"]`).val('');
            }
          }
      
 		                      
           const targetFields = $(this.el).find(`.${className}`);
     		$(targetFields).each((i,targetField) => {
            this.rules.push([targetField, handler]);
            })
            
        }
      
        if (typeof fName1 === 'string') {
      
          //let fNameToShowOpts = $(this.el).find($(`${fNameToShow} option`));
      let fNameToShowOpts = $(this.el).find(`[name="${fNameToShow}"] option`);
      
          const handler = () => {
            let lastChosenOpt = '';
            let optNum = 0;
            let arrOfOpts = [];
            let fName1Val = $(this.el).find("[name=\"".concat(fName1, "\"]")).val();
            
            this._findInScheme(scheme, fName1Val, arrOfOpts)
            this._showOptions (fNameToShow, fNameToShowOpts, arrOfOpts, lastChosenOpt); 
        
        } 
      
          const targetField = $(this.el).find("[name=\"".concat(fName1, "\"]"));
          this.rules.push([targetField, handler]);
          
        }
        
      }  
        
        
        updateHidden (f1Name, f2Name, scheme) {
        
          let field1 = $(this.el).find("[name=\"".concat(f1Name, "\"]"));
          let field2 = $(this.el).find("[name=\"".concat(f2Name, "\"]"));
        
          const handler = () => {
            let chosenVal =  $(field1).val();
            let value = scheme.get(chosenVal);
        
             if(value) {
                 $(field2).val(value);
             }    
             else {
                 $(field2).val('');
             }  
             
         }
         this.rules.push([field1, handler]);
        }
         }

window.DisplayFormFields = DisplayFormFields;