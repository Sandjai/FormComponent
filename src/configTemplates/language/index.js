export default function (language) {
    
   const langRouting = {
               
        French: 'https://images.engage.3m.com/Web/3MCompanyGlobal/%7B9b0ad87f-12a2-4c55-9828-8c91588c353e%7D_language-data-fr.js',    
        English: 'https://images.engage.3m.com/Web/3MCompanyGlobal/%7B38fbe65b-6625-4718-b4af-2e2ce6036e37%7D_language-data-en.js'  
       
    } 

    /* const langRouting = {
               
        French: 'http://localhost:8080/src/configTemplates/language/temporary/test-language-data-fr.js',    
        English: 'http://localhost:8080/src/configTemplates/language/temporary/test-language-data-en.js'  
       
    } */

    const langTmpl = `${langRouting[language]}`;
    

    return langTmpl;
}


