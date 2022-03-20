/**
 * Class for the Form Validation, based on Jquery Validator
 * @param {Object} el - Form element
 */

 class FormValidationRules {

    static _instance_ = 0;

    constructor(el) {

        this.el = el;
        this.ids = [];
        this.groups = {};
        this.rules = {};
        this._multiRules = {};
        this.instance = ++this.constructor._instance_;        
    }

    /**
     * Method for combining checkboxes into a group
     * @param {Array} data - Array of Objects in format:  [{namesOfgroup: '', errorMessage: '', condition}, ... ]
     * @param {String} namesOfgroup - HTML names of checkboxes in format: 'chbx chbx2 chbx3'
     * @param {String} errorMessage
     * @param {Boolean} condition - set condition for making mandatory, if needed. If not - don't use this parameter. Should return true or false. 
     * @param {Number} numMin - minimum number of checkboxes to be checked (defaul = 1)
     * @param {Number} numMax - maximum number of checkboxes to be checked (default = all checkboxes)
     */

    checkboxesGroups(data) { 
 
        let arrWithIds = [];
        $(data).each((i, item) => {
            let index = 'js-chbxGroupAuto_'+ this.instance + i;

            arrWithIds.push(index);

            this._addClass(index, item);
            this._createChbxGroup(index, item);

            
                $.validator.addMethod(index, function (value) {
                 
                    if (!item.errorMessage) {item.errorMessage = 'Please select an option'}
                    if (!item.condition) {item.condition = ()=>{return true}}
                    if (!item.numMin) {item.numMin = 1} 
                  	if (!item.numMax) {item.numMax = $(`.${index}`).size()} 
                  
                  	if (!item.condition()) {
                          return true;       
                                     
                    }                  
                    else if ($(`.${index}`).is(':checked')) {
                        return (($(`.${index}:checked`).size() >= (item.numMin)) && ($(`.${index}:checked`).size() <= item.numMax));
                    } else {
                        return false;
                    }
                }, item.errorMessage);
            
        })

        this.ids = arrWithIds;

    }

    _addClass(index, item) {

        let names = item.namesOfgroup.split(' ');
        let arr = [];

        $(names).each((i, name)=> {
            arr.push('[name="' + name + '"]');
        })

        let str = arr.toString();


        $(str).addClass('js-chbxGroupAuto');
        $(str).addClass(index);
        $(str).attr('data-chbxIdAuto', index);

    }

    _createChbxGroup(index, item) {
        this.groups[index] = item.namesOfgroup;

    }

    _getChbxGroups() {
        return this.groups;
    }

    _getRules() {
        return this.rules;
    }

    /**
     * Toggling mandatory/optional
     * @param {Array} arr - array of HTML names
     * @param {Boolean} trueOrFalse
     */

    addRule(arr, trueOrFalse) {

        $(arr).each((i, item) => {
            $(`[name="${item}"]`).add('rules', { required: trueOrFalse })               
        })

    }


    /** 
     *  @param {Array} fields
     *  @param {Function} condition
     *
     */

    
    addDependencyRule(fields, condition) {
        

        $(fields).each((i, item) => {            
            if ($(this.el).find(`[name="${item}"]`)) {                
                if (this.rules[item]) {
                    this._addDependencyRule (item, condition);                   
                    this.rules[item] = {
                        required: {
                            depends: (element) => {
                                if (!$(element).closest('li').hasClass('MMM--isVisuallyHidden')) {
                                    
                                    return this._isRequired(item);
                                } else return false;
                                
                            }
                        }
                    }

                    
                } else {
                    this._multiRules[item] = condition;
                    this.rules[item] = {
                        required: {
                            depends: function depends(element) {
                                if (!$(element).closest('li').hasClass('MMM--isVisuallyHidden')) {
                                    return condition();
                                } else return false;
                                
                            }
                        }
                    }
                }
        }

        })

    }
    

    _addDependencyRule (item, condition){
        let currentCond = this._multiRules[item];
        let condArr = [];
        if (Array.isArray(currentCond)) {
            currentCond.push(condition);
            condArr = currentCond;
        }
            else {                
                condArr.push(currentCond);
                condArr.push(condition);                
            }

            this._multiRules[item] = condArr;
    
      
        
    }



        _isRequired(item) {

            let trueOrFalse = false;            

        $(this._multiRules[item]).each((i, func) => {                    
          

            if(typeof(func) === 'function') {                

                if(func()) {
                    trueOrFalse = true;
                }
                
                    
            }
        })
        
        return trueOrFalse;
       

       
    }




    /**
     * Should go at the very end, after the others method, being called in this class
     */
    render() {
        this.el.validate({
            groups: this._getChbxGroups(),
            rules: this._getRules(),
          
           
            errorPlacement: function errorPlacement(error, element) {

                if ((element.attr('type') === 'checkbox') && (element.hasClass('js-chbxGroupAuto'))) {
                    let attribute = $(element).attr('data-chbxIdAuto');                    
                    let elements = document.querySelectorAll(`[data-chbxIdAuto=${attribute}]`);
                 let lastEl =  elements[elements.length - 1];
                  
                  let parentOfLastEl = lastEl.closest('li');		
                  
                  
                    if (parentOfLastEl.nextElementSibling === null || parentOfLastEl.nextElementSibling === undefined) {
                     
                        $(parentOfLastEl).parent().after(error);
                      } else {
                        $(lastEl).parent().after(error);
                      }

                } else {
                    element.closest('li').after(error);
                }

            },
            submitHandler: elqFormHandler,
        });


    }

}
