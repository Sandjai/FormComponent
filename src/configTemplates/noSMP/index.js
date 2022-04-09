export default async function () {
   
    const baseRouting = {
        base: './temporary/test-noSMP-data-default.js'  
    }
    const smpTmpl = await import(`${baseRouting.base}`);    

    return smpTmpl;
}
