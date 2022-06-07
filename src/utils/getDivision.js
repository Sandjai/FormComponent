

    export default function (name) {

        const divisions = {
            AAD: 'AAD - Automotive Aftermarket',
            AASD: 'AASD - Automotive &amp; Aerospace Solutions Division',
            AdMD: 'AdMD - Advanced Materials Division',
            ASD: 'ASD - Abrasive Systems',
            CBS: 'CBS - Consumer Business Sponsored',
            CHC: 'CHC - Consumer Health Care',
            CHIM: 'CHIM - Construction &amp; Home Improvement Division',
            CMSD: 'CMSD - Closure and Masking Systems Division',
            CORP: 'CORP - Corporate',
            CSD: 'CSD - Commercial Solutions Division',
            DDSD: 'DDSD - Drug Delivery Systems',
            DMSD: 'DMSD - Display Materials &amp; Systems Division',
            EAR: 'EAR - Aearo Technologies LLC',
            EMD: 'EMD - Electrical Markets Division',
            EMSD: 'EMSD - Electronics Materials Division',
            FSD: 'FSD - Food Safety',
            GOV: 'GOV - Government Markets',
            HCD: 'HCD - Home Care Division',
            HIS: 'HIS - Health Information Systems',
            IATD: 'IATD - Industrial Adhesives &amp; Tapes Division',
            IMPD: 'IMPD - Industrial Mineral Products Division',
            IPD: 'IPD - Infection Prevention',
            ISMC: 'ISMC - Industrial and Safety Market Center',
            LITT: 'LITT - Littmann Stethoscopes',
            MEG: 'MEG - Meguiar\'s',
            MMC: 'MMC - Medical Markets Center',
            MMT: 'MMT - Medical Materials &amp; Technologies',
            MSD: 'MSD - Medical Solutions Division',
            MULT: 'MULTI - Multiple Divisions',
            OCSD: 'OCSD - Oral Care Solutions Division',
            PSD: 'PSD - Personal Safety Division',
            SOSD: 'SOSD - Stationary &amp; Office Supplies Division',
            SPSD: 'SPSD - Separation and Purification Science Division',
            TSD: 'TSD - Transportation Safety Division',
            VAS: 'VAS - Visual Attention Services',        
    };

    
    const divs = Object.keys(divisions);  

    let division = null;

    for (let div of divs) {       
        if (name.indexOf(`${div}-`) != -1) {           
            division =  divisions[div];
            break;            
        }  
    }

    if (division === null) {
        console.error('Division was identified incorrectly. Please specify it in setHiddenFields if default value (EMSD) is not relevant.');
        division = divisions.EMSD;
    }

    return division;

}
