export default function (FormName) {
    
    const mqlFormTypes = ['SAM', 'DEM', 'ASK', 'CON', 'LAR'];  

    let formType = null;

    for (let type of mqlFormTypes) {
        if (FormName.indexOf(`-${type}-`) != -1) {           
            formType =  type;
        }  
    }

    return formType ? formType : false;



     
}


//'Sample Request','Demo Request', 'Ask An Expert', 'Contact Us', 'Large Order'