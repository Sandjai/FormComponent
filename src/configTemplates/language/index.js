export default function (language) {

    const langRouting = {
        English: './temporary/test-language-data-en.js',
        /*English: 'https://images.engage.3m.com/Web/3MCompanyGlobal/......min.js'*/
        Russian: './temporary/test-language-data-en.js'
    }

    return langRouting[language];
}


