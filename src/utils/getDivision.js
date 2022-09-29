

    export default function (name) {

        let divisions;
        
        if (typeof __FC_commonConfig__ === 'undefined' || !__FC_commonConfig__.hasOwnProperty('existingDivisions')) {
            divisions = {
                AAD: 'AAD - Automotive Aftermarket Division',
                AASD: 'AASD - Automotive & Aerospace Solutions Division',
                AdMD: 'AdMD - Advanced Material Division',
                ASD: 'ASD - Abrasive Systems Division',
                CBS: 'CBS - Consumer Business Sponsored',
                CHC: 'CHC - Consumer Health Care Division',
                CHIM: 'CHIM - Construction & Home Improvement Division',
                CMSD: 'CMSD - Closure and Masking Systems Division',
                CORP: 'CORP - Corporate',
                CSD: 'CSD - Commercial Solutions Division',
                DDSD: 'DDSD - Drug Delivery Systems',
                DMSD: 'DMSD - Display Materials & Systems Division',
                EAR: 'EAR - Aearo Technologies LLC',
                EMD: 'EMD - Electrical Markets Division',
                EMSD: 'EMSD - Electronics Materials Solutions Division',
                FSD: 'FSD - Food Safety',
                GOV: 'GOV - Government Markets',
                HCD: 'HCD - Home Care Division',
                HIS: 'HIS - Health Information Systems',
                IATD: 'IATD - Industrial Adhesives and Tapes Division',
                IMPD: 'IMPD - Industrial Mineral Products Division',
                IPD: 'IPD - Infection Prevention Division',
                ISMC: 'ISMC - Industrial and Safety Market Center',
                LITT: 'LITT - Littmann Stethoscopes',
                MEG: "MEG - Meguiar's",
                MMC: 'MMC - Medical Markets Center',
                MMT: 'MMT - Medical Materials &amp; Technologies',
                MSD: 'MSD - Medical Solutions Division',
                MULT: 'MULTI - Multiple Divisions',
                OCSD: 'OCSD - Oral Care Solutions Division',
                PSD: 'PSD - Personal Safety Division',
                SOSD: 'SOSD - Stationery & Office Supplies Division',
                SPSD: 'SPSD - Separation and Purification Science Division',
                TSD: 'TSD - Transportation Safety Division',
                VAS: 'VAS - Visual Attention Services',
                // Part of ASD:
                TMC: 'ASD - Abrasive Systems Division',
        }
        } else {
            divisions = __FC_commonConfig__.existingDivisions;
        }

        

    
    const divs = Object.keys(divisions);  

    let division = null;

    for (let div of divs) {       
        if (name.indexOf(`${div}-`) != -1) {           
            division =  divisions[div];
            break;            
        }  
    }

    if (division === null) {     
        return null;
    }

    return division;

}
