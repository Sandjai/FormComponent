       /**
 * Class for displaying fields
 * @param {Object} el - Form Element
 */
       

        export default class DisplayFormFields {    

          // Just Default value
        optionalText = "optional";

          constructor (el) {
              this.el = el;
              this.depChbxGrId = 0;
              this.rules = [];
        
        
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
                      $(depend).addClass('MMM--isVisuallyHidden')         
                    }              
                  }
                }
                this.rules.push([source, handler]);
            }
          
            /**
             * To add 'optional' in label for Contact Acquisition Form and removing 'optional' from label in a lead gen one
             * @param {Object} data
             * @param {Array} data.labelOptionalNames
             * @param {String} data.optionalText
             * @param {String} data.triggerName
             * @param {String} data.val
             */
        
              
            addOptionalToLabel (data) { 
              const optionalText =  data.optionalText ? ` (${data.optionalText.toLowerCase()})` : ` (${this.optionalText.toLowerCase()})`;
             
              let element = $(this.el).find("[name=\"".concat(data.triggerName, "\"]")); 
              
              const handler = () => {
                $(data.labelOptionalNames).each((i,name) => {        
                  var targetEl = $(this.el).find("[name=\"".concat(name, "\"]"));   
                  var _id = $(targetEl).attr('id');
                  var labelText = $('label[for="' + _id + '"].MMM--blockLabel').text();
        
                  if (($(element).attr('type') === 'checkbox') && ($(element).is(':checked'))) {this._removeOptionalText(_id, name, labelText, optionalText)}
                  else if (($(element).prop("tagName") === 'SELECT') && ((!data.val) || ($(element).val() === data.val))) {            
                    this._removeOptionalText(_id, name, labelText, optionalText)}
                else {this._addOptionalText(_id, name, labelText, optionalText)};
                  
                  })
              }
              
              this.rules.push([element, handler]);
         
                
        
          }

          /**
           * @param {Array} names - Array of HTML names
           * @param {String} optionalText
           */

          makeOptional (names,optionalText) {
            
            for (let name of names) {                    
              var targetEl = $(this.el).find("[name=\"".concat(name, "\"]"));   
              var labelTextPrev =  $(targetEl.prev('label.MMM--blockLabel')).text();  
              var labelTextNext =  $(targetEl.next('label.MMM--blockLabel')).text();   
              if (labelTextPrev != '') {
                $(targetEl.prev('label.MMM--blockLabel')).text(labelTextPrev + ` (${optionalText.toLowerCase()})`);
              } else if (labelTextNext != '') {
                $(targetEl.next('label.MMM--blockLabel')).text(labelTextNext + ` (${optionalText.toLowerCase()})`);
              }
          }
        }
        
          optionalText (_id, name, labelText,optionalText) {
              $('label[for="' + _id + '"].MMM--blockLabel').text(labelText.replace(optionalText, ""));
          }
        
          _addOptionalText (_id, name, labelText,optionalText) {
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
              
                 if (item.replace("&amp;", "&") === $(opt).val()) {                
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
        
        
        complexDepFromCheckboxes (fNameToShow, scheme) {           
          this._addComplexDependency ([], fNameToShow, scheme);
        }
        
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
      
          const className = 'js-dep_gr' + this.depChbxGrId;
      
          $(chbxesGroup).each((i, item) => {
            $(`[name="${item}"]`).addClass(className)
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
