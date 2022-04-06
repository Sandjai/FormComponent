export default function (div) {
    
    division = div.slice(0, div.indexOf(' '));

    const smpRouting = {
        EMSD: './temporary/test-smp-data-emsd.js',
        /*EMSD: 'https://images.engage.3m.com/Web/3MCompanyGlobal/......min.js'*/    
        TSD: './temporary/test-smp-data-tsd.js'    
    }

    return smpRouting[division];
}
