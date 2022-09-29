

    export default function (leadGentype, division) {
        let div = division.slice(0, division.indexOf(' '));
        let leadGenTypesExisting;

        if (typeof __FC_commonConfig__ === 'undefined' || !__FC_commonConfig__.hasOwnProperty('leadGenTypesExisting')) {       

            leadGenTypesExisting = {
                AAD: ['CA', 'Basic',],
                AASD: ['CA', 'Basic',],
                AdMD: ['CA', 'Basic',],
                ASD: ['CA', 'Basic', 'TMC_Basic', 'TMC_CA'],
                CBS: ['CA', 'Basic',],
                CHC: ['CA', 'Basic',],
                CHIM: ['CA', 'Basic',],
                CMSD: ['CA', 'Basic',],
                CORP: ['CA', 'Basic',],
                CSD: ['CA', 'Basic',],
                DDSD: ['CA', 'Basic',],
                DMSD: ['CA', 'Basic',],
                EAR: ['CA', 'Basic',],
                EMD: ['CA', 'Basic',],
                EMSD: ['CA', 'Basic',],
                FSD: ['CA', 'Basic',],
                GOV: ['CA', 'Basic',],
                HCD: ['CA', 'Basic',],
                HIS: ['CA', 'Basic',],
                IATD: ['CA', 'Basic',],
                IMPD: ['CA', 'Basic',],
                IPD: ['CA', 'Basic',],
                ISMC: ['CA', 'Basic',],
                LITT: ['CA', 'Basic',],
                MEG: ['CA', 'Basic',],
                MMC: ['CA', 'Basic',],
                MMT: ['CA', 'Basic',],
                MSD: ['CA', 'Basic',],
                MULT: ['CA', 'Basic',],
                OCSD: ['CA', 'Basic',],
                PSD: ['CA', 'Basic',],
                SOSD: ['CA', 'Basic',],
                SPSD: ['CA', 'Basic',],
                TSD: ['CA', 'Basic',],
                VAS: ['CA', 'Basic',],
                TMC: ['CA', 'Basic', 'TMC_Basic', 'TMC_CA'],
              
              
            };
        } else {
            leadGenTypesExisting = __FC_commonConfig__.leadGenTypesExisting;
        }

    return leadGenTypesExisting[div].includes(leadGentype);

}
