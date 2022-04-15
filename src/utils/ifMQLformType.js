export default function (FormType) {
    
    const mqlFormTypes = 'SAM Sample Request DEM Demo Request ASK Ask An Expert CON Contact Us LAR Large Order';  

    if (mqlFormTypes.indexOf(FormType) != -1) {
        return true;
    } else {
        return false;
    }    
}
