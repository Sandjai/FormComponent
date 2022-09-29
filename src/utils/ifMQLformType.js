export default function (FormName) {
    let mqlFormTypes;    

    if (typeof __FC_commonConfig__ === 'undefined' || !__FC_commonConfig__.hasOwnProperty('mqlFormTypes')) {
    
        mqlFormTypes = ['SAM', 'DEM', 'ASK', 'CON', 'LAR'];  

    } else {
        mqlFormTypes = __FC_commonConfig__.mqlFormTypes;
    }

    let formType = null;

    for (let type of mqlFormTypes) {
        if (FormName.indexOf(`-${type}-`) != -1) {           
            formType =  type;
        }  
    }

    return formType ? formType : false;
     
}


//'Sample Request','Demo Request', 'Ask An Expert', 'Contact Us', 'Large Order'