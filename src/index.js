'use strict'

import './js/components/validation'
import './js/components/display'
import './js/components/Form/form'

class FormGen {
    constructor (formName) {
        this.formName = formName;
        render();
    }

    


render() {
    new Form(this.formName);
}

}