export default function (language) {
    
    const langRouting = {
        English1: 'https://www.3m.com/3m_theme_assets/themes/3MTheme/assets/scripts/build/kungfu/Eloqua/eloquaLanguages.js',       
        French: 'https://images.engage.3m.com/Web/3MCompanyGlobal/%7b9b0ad87f-12a2-4c55-9828-8c91588c353e%7d_language-data-fr.js',    
        English: 'http://localhost:8080/src/configTemplates/language/temporary/test-language-data-en.js'  
       
    }

    const langTmpl = `${langRouting[language]}`;
    

    return langTmpl;
}


