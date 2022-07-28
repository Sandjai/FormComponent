export default function (div) {
   
    const division = div.slice(0, div.indexOf(' '));
   
   const smpRouting = {
        EMSD: 'https://images.engage.3m.com/Web/3MCompanyGlobal/%7Bb8c535bc-4579-47b4-a485-ce507735b8ae%7D_smp-emsd-data.js',       
        
    } 

   /*
     const smpRouting = {
        EMSD: 'http://localhost:8080/src/configTemplates/smp/temporary/test-smp-data-emsd.js',
       
        TSD: './temporary/test-smp-data-tsd.js',
        
        
    }
     */
    
    const smpTmpl = `${smpRouting[division]}`;    

    return smpTmpl;
}

