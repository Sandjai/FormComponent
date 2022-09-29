export default function () {

    let baseFieldsTmpl;

    if (typeof __FC_commonConfig__ === 'undefined' || !__FC_commonConfig__.hasOwnProperty('nonSMP_baseTemplate')) {
        baseFieldsTmpl = 'https://images.engage.3m.com/Web/3MCompanyGlobal/%7B6245aff6-8ec8-4952-b531-562bfdc4d998%7D_test-nosmp-base-data.js';    
    }  else {
        baseFieldsTmpl = __FC_commonConfig__.nonSMP_baseTemplate;
    }

    return baseFieldsTmpl;
}
