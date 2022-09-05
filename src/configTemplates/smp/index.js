export default function (div) {
   
    const division = div.slice(0, div.indexOf(' '));
  /* 
   const smpRouting = {
        EMSD: 'https://images.engage.3m.com/Web/3MCompanyGlobal/%7Bb8c535bc-4579-47b4-a485-ce507735b8ae%7D_smp-emsd-data.js',  
        ASD: 'https://images.engage.3m.com/Web/3MCompanyGlobal/%7b2204e807-b1fc-48f9-9125-6ef8b6e975ae%7d_smp-asd-data.js',     
        
    } 
*/  
 
     const smpRouting = {
        EMSD: 'http://localhost:8080/src/configTemplates/smp/temporary/test-smp-data-emsd.js',
       
        TSD: './temporary/test-smp-data-tsd.js',

        ASD: 'http://localhost:8080/src/configTemplates/smp/temporary/test-smp-data-asd.js',
        
        
    }
     
  
    const smpTmpl = `${smpRouting[division]}`;    

    return smpTmpl;
}

