

/**
 * Class for displaying fields
 * @param {Object} el - Form Element
 */

 class DisplayFormFields {    

  constructor (el) {
      this.el = el;
      this.rules = {};
     
  }
  
  _getElByName(name) {
    return $(this.el).find("[name=\"".concat(name, "\"]"));
  }

  _getElById(id) {
    return $(this.el).find("[id=\"".concat(id, "\"]"));
  }

  _addEventListener (element, func) {
    $(element).on('change', () => {return func()});
  }

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
      let source = this._getElByName(f1_name);
      let depend = this._getElByName(f2_name);
   
      let dependId = $(depend).attr('id') ? $(depend).attr('id') : f2_name;        
  
      if ($(source).attr('type') === 'checkbox') {

        const handler = () => {
          $(depend).closest('li').toggleClass('MMM--isVisuallyHidden');
          $("#".concat(dependId, "-error")).hide(); 
        }

        this._addEventListener (source, handler);
      }
  
      if ($(source).prop("tagName") === 'SELECT') {

        const handler = () => {
          $("#".concat(dependId, "-error")).hide();
  
          if ($(source).val() === val) {
            this._showEl($(depend).closest('li'));           
          } else {
            this._hideEl($(depend).closest('li'));           
          }
        }

        this._addEventListener (source, handler);


      }
    }


    
    dependIdFromName (f1_name, f2_id, val) {
      let source = this._getElByName(f1_name);
      let depend = this._getElById(f2_id);

      if ($(source).attr('type') === 'checkbox') {

        const handler = () => {            
          $(depend).toggleClass('MMM--isVisuallyHidden');          
        }

        this._addEventListener (source, handler);
         
         
        }
    
        if ($(source).prop("tagName") === 'SELECT') {

          const handler = () => {            
            let valIsDeclared =  val ? true : false;
            let selectIsBlank = !$(source).val() ? true : false;
            let valIsSelected = ($(source).val() === val) ? true : false;
              
            let ifTrue = valIsSelected || (!valIsDeclared && !selectIsBlank) ? true : false;           
            
            if (ifTrue) {
              this._showEl(depend);             
            }

            if (!ifTrue) {
              this._hideEl(depend);           
            }              
          }
  
          this._addEventListener (source, handler);
      

        }
    }
  
    /**
     * To add 'optional' in label for the first name/last name/salutation fields for Contact Acquisition Form and removing 'optional' from label in a lead gen one
     * @param {Object} data
     * @param {Array} data.labelOptionalNames
     * @param {String} data.optionalText
     * @param {String} data.triggerName
     * @param {String} data.val
     */

      
    addOptionalToLabel (data) { 
      let element = this._getElByName(data.triggerName); 
      
      const handler = () => {
        $(data.labelOptionalNames).each((i,name) => {

          var targetEl = this._getElByName(name);   
          var _id = $(targetEl).attr('id');
          var labelText = $('label[for="' + _id + '"].MMM--blockLabel').text();

          if (($(element).attr('type') === 'checkbox') && ($(element).is(':checked'))) {this._removeOptionalText(_id, name, labelText, data.optionalText)}
          else if (($(element).prop("tagName") === 'SELECT') && ((!data.val) || ($(element).val() === data.val))) {            
            this._removeOptionalText(_id, name, labelText, data.optionalText)}
        else {this._addOptionalText(_id, name, labelText, data.optionalText)};
          
          })
      }
      
      this._addEventListener (element, handler);
        

  }

  _removeOptionalText (_id, name, labelText,optionalText) {
      $('label[for="' + _id + '"].MMM--blockLabel').text(labelText.replace(optionalText, ""));
  }

  _addOptionalText (_id, name, labelText,optionalText) {
      $('label[for="' + this._getElByName(name).attr('id') + '"].MMM--blockLabel').text(labelText + optionalText); 
      $("#".concat(_id, "-error")).hide();
      this._getElByName(name).removeClass('error');
  }


 /* complexDependency (className, attributeName, fNameToShow) {   

    const handler = () => {
      let apps = $(this.el).find(`.${className}:checked`);
      let optNum = 0;
      let lastChosenOpt = '';

      if (apps.length) {            
        $(this.el).find(`[name="${fNameToShow}"] option[data-${attributeName}]`).each(function (i, opt) {
          let attr = $(opt).data(attributeName);
          let optToShow = false;
          $(opt).hide();

          if (typeof attr !== 'undefined' && attr !== false) {
            let attrArr = attr.split(' ');
            $(apps).each(function (i, app) {
                let appName = $(app).attr('name');
                $(attrArr).each(function (i, item) {
                if (appName === item) {
                    optToShow = true;
                    lastChosenOpt = $(opt).val();
                }
                });
            });
          }

          if (optToShow) {
                $(opt).show();
                optNum++;
          }
        });

          if (optNum === 1) {
            this._getElByName(fNameToShow).val(lastChosenOpt);
            this._hideEl(this._getElByName(fNameToShow).closest('li'));
          } else {
            this._showEl(this._getElByName(fNameToShow).closest('li'));
          }

      } else {
          $(this.el).find(`[name="${fNameToShow}"]`).closest('li').addClass('MMM--isVisuallyHidden');
          $(this.el).find(`[name="${fNameToShow}"]`).val('');
      }
  
}

_addEventListener ($(`.${className}`), handler);   

} */



complexDependency (className, attributeName, fNameToShow) {   

  const handler = () => {
    let apps = $(this.el).find(`.${className}:checked`);
    let optNum = 0;
    let lastChosenOpt = '';

    if (apps.length) {            
      $(this.el).find(`[name="${fNameToShow}"] option[data-${attributeName}]`).each(function (i, opt) {
        let attr = $(opt).data(attributeName);
        let optToShow = false;
        $(opt).hide();

        if (typeof attr !== 'undefined' && attr !== false) {
          let attrArr = attr.split(' ');
          $(apps).each(function (i, app) {
              let appName = $(app).attr('name');
              $(attrArr).each(function (i, item) {
              if (appName === item) {
                  optToShow = true;
                  lastChosenOpt = $(opt).val();
              }
              });
          });
        }

        if (optToShow) {
              $(opt).show();
              optNum++;
        }
      });
        
      
      if (optNum === 1) {
        this._getElByName(fNameToShow).val(lastChosenOpt);
        this._hideEl(this._getElByName(fNameToShow).closest('li'));
      } else {
        this._showEl(this._getElByName(fNameToShow).closest('li'));                
      }


    } else {
        $(this.el).find(`[name="${fNameToShow}"]`).closest('li').addClass('MMM--isVisuallyHidden');
        $(this.el).find(`[name="${fNameToShow}"]`).val('');
    }

}

_addEventListener ($(`.${className}`), handler);   

}

complexDepFromSelect (fName1, fNameToShow, scheme) {

  let fNameToShowOpts = this._getElByName($(`${fNameToShow} option`));

  //let fNameToShowOpts = $(this.el).find(`[name="${fNameToShow}"] option`);

  const handler = () => {

    let lastChosenOpt = '';
    let optNum = 0;
    let arrOfOpts = [];
    let fName1Val = this._getElByName(fName1).val(); 
  
  
   scheme.forEach((value, key) => {
  
       $(value).each((i, item) => {
  
            if (item === fName1Val) {arrOfOpts.push(key)}
       });
  }); 
  
  
   $(fNameToShowOpts).each((i2,opt) => {    
  
       if ($(opt).val() != null) {
        $(opt).hide();
        $(arrOfOpts).each((i,item) => {
            if (item === $(opt).val()) {                
                lastChosenOpt = $(opt).val();
                optNum++;
                $(opt).show();
                return;                
            }
       
       })
        
  
   }
   })
  
   if (optNum === 1) {
    this._getElByName(fNameToShow).val(lastChosenOpt);
    this._hideEl(this._getElByName(fNameToShow).closest('li'));
  } else {
    this._showEl(this._getElByName(fNameToShow).closest('li'));                
  }
  
  } 

  this._addEventListener(this._getElByName(fName1), handler);  

}

updateHidden (f1Name, f2Name, scheme) {

  let field1 = this._getElByName(f1Name);
  let field2 = this._getElByName(f2Name);

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

  this._addEventListener(field1, handler);

}
}