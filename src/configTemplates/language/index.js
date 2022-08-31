export default function (language) {
 
const langRouting = {
               
        Bulgarian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{a8bd3b35-0670-4cde-99da-4ce6acd9c9a1}_language-data-bg.js',
        Croatian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{d81cafa0-938d-4062-b8b4-fbd41e98836e}_language-data-hr.js',
        Czech: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{4ad7d5cd-17a7-4378-8a1a-966670a52270}_language-data-cs.js',
        Danish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{aae3a5b9-a25f-4532-bbc4-4c6197d39431}_language-data-da.js',
        Dutch: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{87641d1c-faf4-44cf-b3f4-1377b2b55d51}_language-data-nl.js',
        English: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{543cc81d-516e-4fd9-a565-7f7d4d5ef6f9}_language-data-en.js',
        Estonian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{3d224f5b-76c9-4be3-b136-259ab65c2abc}_language-data-et.js',
        Finnish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{eadb416c-5153-4b87-9215-6be7becc55a2}_language-data-fi.js',
        French: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{e347b50a-a48b-4556-997c-c6a411b6551c}_language-data-fr.js',
        German: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{59fba2ec-eb80-415d-85f5-e549c218a1fe}_language-data-de.js',
        Greek: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{e4cff3ec-b0a7-499b-ac29-a0a934ba403f}_language-data-el.js',
        Hebrew: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{aafaf0bb-19da-4a44-8108-7ca1a9c2ae87}_language-data-iw.js',
        Hungarian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{15809426-16a1-4bf3-90d8-82eee2ec4d4b}_language-data-hu.js',
        Italian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{c4ece686-8662-4755-b6de-480fc8d078d5}_language-data-it.js',
        Latvian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{a3c34d4f-c8ed-42c9-b669-33fc9da8f1e3}_language-data-lv.js',
        Lithuanian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{adbb416d-b5d3-4caf-9b1d-298344916be0}_language-data-lt.js',
        Norwegian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{47cb46af-709f-4b03-a76c-552744672568}_language-data-no.js',
        Polish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{d2561afb-fe13-428e-b907-6af9ce2c05e6}_language-data-pl.js',
        Portuguese: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{2c261101-fd15-4d50-8793-1d5ce64b488a}_language-data-pt.js',
        Romanian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{59110a15-de93-4d19-bf92-03e84a0815fe}_language-data-ro.js',
        Serbian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{1619a415-f5ec-4ec0-9747-b9a0dafdd48c}_language-data-sr.js',
        Slovakian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{3d537998-c514-4fbb-be00-33911c4697ba}_language-data-sk.js',
        Slovenian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{fb338cfd-65b5-4359-93f7-dabcad99ff9c}_language-data-sl.js',
        Spanish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{6a67ca63-14ea-40f9-9644-f5ee3448eac3}_language-data-es.js',
        Swedish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{853a9287-873c-48f4-84d7-d8a8630f1b41}_language-data-sv.js',
        Turkish: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{e8e95aaf-1535-4a35-8870-9d921d0a1107}_language-data-tr.js',
        Ukrainian: 'https://images.engage.3m.com/Web/3MCompanyGlobal/{b90aa56f-150f-4ea5-8ac0-77e3887b4c38}_language-data-uk.js',
    } 
   
/*  
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
*/ 
    const langTmpl = `${langRouting[language]}`;
    

    return langTmpl;
}


