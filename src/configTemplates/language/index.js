export default function (language) {
   
  /* const langRouting = {
               
        French: 'https://images.engage.3m.com/Web/3MCompanyGlobal/%7B9b0ad87f-12a2-4c55-9828-8c91588c353e%7D_language-data-fr.js',    
        English: 'https://images.engage.3m.com/Web/3MCompanyGlobal/%7B38fbe65b-6625-4718-b4af-2e2ce6036e37%7D_language-data-en.js'  
       
    } */

     const langRouting = {      
        
        Bulgarian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-bg.js',
        Croatian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-hr.js',
        Czech: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-cs.js',
        Danish: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-da.js',
        Dutch: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-nl.js',
        English: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-en.js',
        Estonian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-et.js',
        Finnish: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-fi.js',
        French: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-fr.js',
        German: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-de.js',
        Greek: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-el.js',
        Hebrew: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-iw.js',
        Hungarian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-hu.js',
        Italian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-it.js',
        Latvian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-lv.js',
        Lithuanian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-lt.js',
        Norwegian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-no.js',
        Polish: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-pl.js',
        Portuguese: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-pt.js',
        Romanian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-ro.js',
        Russian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-ru.js',
        Serbian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-sr.js',
        Slovakian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-sk.js',
        Slovenian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-sl.js',
        Spanish: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-es.js',
        Swedish: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-sv.js',
        Turkish: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-tr.js',
        Ukrainian: 'http://localhost:8080/src/configTemplates/language/temporary/language-data-uk.js',
       
    } 

    const langTmpl = `${langRouting[language]}`;
    

    return langTmpl;
}


