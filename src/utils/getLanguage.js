export default function (lang) {

    let data;

    if (typeof __FC_commonConfig__ === 'undefined' || !__FC_commonConfig__.hasOwnProperty('languages')) {
        data = {        
            ar:'Arabic',
            bg:'Bulgarian',       
            hr:'Croatian',
            cs:'Czech',
            da:'Danish',
            nl:'Dutch',
            en:'English',
            et:'Estonian',
            fi:'Finnish',
            fr:'French',
            de:'German',
            el:'Greek',
            iw:'Hebrew',
            hu:'Hungarian',
            it:'Italian',        
            lv:'Latvian',
            lt:'Lithuanian',
            no:'Norwegian',
            pl:'Polish',
            pt:'Portuguese',
            ro:'Romanian',
            ru:'Russian',
            sr:'Serbian',
            sk:'Slovakian',
            sl:'Slovenian',
            es:'Spanish',
            sv:'Swedish',       
            tr:'Turkish',
            uk:'Ukrainian',
            
            null: 'English'
        }
    } else {
        data = __FC_commonConfig__.languages;
    }

    return(data[lang]);

}