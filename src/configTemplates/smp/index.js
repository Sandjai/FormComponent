export default function (div) {
   
    const division = div.slice(0, div.indexOf(' '));
   
    const smpRouting = {
        EMSD: 'http://localhost:8080/src/configTemplates/smp/temporary/test-smp-data-emsd.js',
        /*EMSD: 'https://images.engage.3m.com/Web/3MCompanyGlobal/......min.js'*/    
        TSD: './temporary/test-smp-data-tsd.js',
        
        
    }

    const smpTmpl = `${smpRouting[division]}`;    

    return smpTmpl;
}

