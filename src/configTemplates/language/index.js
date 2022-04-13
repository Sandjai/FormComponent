export default async function (language) {
    
    const langRouting = {
        English: './temporary/test-language-data-en.js',
        /*English: 'https://images.engage.3m.com/Web/3MCompanyGlobal/......min.js'*/
        French: './temporary/test-language-data-fr.js',
        Russian: './temporary/test-language-data-ru.js',
       
    }

    const langTmpl = await import(`${langRouting[language]}`);
    

    return langTmpl;
}


