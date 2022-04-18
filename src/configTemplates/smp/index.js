export default function (div) {
   
    const division = div.slice(0, div.indexOf(' '));
   
    const smpRouting = {
        EMSD: 'https://images.engage.3m.com/Web/3MCompanyGlobal/%7Bb8c535bc-4579-47b4-a485-ce507735b8ae%7D_smp-emsd-data.js',       
        
    }

    const smpTmpl = `${smpRouting[division]}`;    

    return smpTmpl;
}

