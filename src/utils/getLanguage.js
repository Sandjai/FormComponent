export default function (lang) {
    
    const data = {
        ar:'Arabic',
        be:'Belarussian',
        bg:'Bulgarian',
        zh:'Chinese',
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
        id:'Indonesian',
        it:'Italian',
        ja:'Japanese',
        ko:'Korean',
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
        th:'Thai',
        tr:'Turkish',
        uk:'Ukrainian',
        
        null: 'English'
    }

    return(data[lang]);

}