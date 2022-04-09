export default {
    
    statement: "All fields are required unless indicated optional",
    submit: "Submit",

    emailAddress: {
        label: "Business Email Address",
        errMessage: "Enter a business email address",
        emailMessage: "Email address is not the correct format"
    },
    
    firstName: {
        label: "First Name",
        errMessage: "Enter your first name"            
    },
    
    lastName: {
        label: "Last Name",
        errMessage: "Enter your last name"            
    },

    company: {
        label: "Company",
        errMessage: "Enter your company name"            
    },

    city: {
        label: "City",
        errMessage: "Enter your city"            
    },

    zipPostal: {
        label: "Post Code",
        errMessage: "Enter your zip code"            
    },

    busPhone: {
        label: "Business Phone",
        errMessage: "Enter your business phone"            
    },

    address1: {
        label: "Address",
        errMessage: "Enter your street address"            
    },

    address2: {
        label: "Street address",
        errMessage: "Enter your street address"            
    },

    mmmJobRole1: {
        label: "Job Role",
        errMessage: "Please select one",
        options: {
            default: "Select One",
            emsd: [
                // [Backend value, Frontend value]                
                ["Chief Executive Officer","Chief Executive Officer"],
                ["Distributor","Distributor"],
                ["Fabricator","Fabricator"],
                ["Firefighter","Firefighter"],
                ["Healthcare Professional","Healthcare Professional"],
                ["Industrial Hygienist","Industrial Hygienist"],
                ["Installer","Installer"],
                ["Law Enforcement","Law Enforcement"],
                ["Machinist/Operator","Machinist/Operator"],
                ["Maintenance Mgr/Facilities Mgmt","Maintenance Manager/Facilities Mgmt"],
                ["Military Officer","Military Officer"],
                ["Occupational Health Manager","Occupational Health Manager"],
                ["Painter/Paint Professional","Painter/Paint Professional"],
                ["President/Owner","President/Owner"],
                ["Production Manager","Production Manager"],
                ["Project Manager","Project Manager"],
                ["Purchasing/Procurement/Buyer","Purchasing/Procurement/Buyer"],
                ["Safety Consultant","Safety Consultant"],
                ["Engineer-Safety","Safety Engineer"],
                ["Safety Manager","Safety Manager"],
                ["Sales","Sales"],
                ["Trainer/Training","Trainer/Training"],
                ["Welder","Welder"],
                ["Other","Other"],
            ]
        }            
    },

    jr_other: {
        label: "Other Job role",
        errMessage: "Enter your job role"            
    },

    mmmIndustry1: {
        label: "Industry",
        errMessage: "Please select one",
        options: {
            default: "Select One",
            emsd: [
                // [Backend value, Frontend value]                
                ["Transp-Aerospace Mfg","Aerospace Manufacturing"],
                ["Transp-Automotive Mfg","Automotive Manufacturing"],
                ["Industrial-Bearings &amp; Gears Mfg","Bearings &amp; Gears Manufacturing"],
                ["Industrial-Chemical Mfg","Chemical Manufacturing"],
                ["Construction-Commercial","Commercial Construction"],
                ["Comms-Telecommunications","Communications/Telecomm"],
                ["Comms-Data Center","Data Center"],
                ["Industrial-Electrical Equip Mfg","Electrical Equipment Manufacturing"],
                ["Industrial-Fire Protection &amp; Suppr","Fire Protection &amp; Suppression"],
                ["Industrial-Indust Machinery &amp; Equip Mfg","Indust Machinery &amp; Equip Manufacturing"],
                ["Industrial-Medical Devices Mfg","Medical Devices Manufacturing<"],
                ["Industrial-Paints &amp; Coatings Mfg","Paints &amp; Coatings Manufacturing<"],
                ["Utilities-Power Dist &amp; Transmission","Power Distribution &amp; Transmission<"],
                ["Utilities-Power Generation","Power Generation<"],
                ["Electronics-Semicon &amp; Circuit Boards","Semiconductors &amp; Circuit Boards"],
                ["Industrial-Turbine &amp; Engine Mfg","Turbine &amp; Engine Manufacturing"],
            ]
        }            
    },

    salesRequest: {
        label: "I would like to speak to a 3M representative",
        errMessage: "Please select one",
        options: {
            default: "Select One",
            all: [
                ["Yes","Yes"],
                ["No","No"],
            ]
        }            
    },

    custEnq: {
        label: "What is your Challenge or Application",
        errMessage: "Please enter your Challenge or Application"            
    },

    selDist: {
        label: "Selected Distributor",
        errMessage: "Specify a distributor",
        options: {
            default: "Select One",
        }                     
    },

    country: {
        label: "Country/Region",
        errMessage: "Enter your country/region"   
    },

    elqGlobalLanguage: {
        label: "Preferred Language",
        errMessage: "Select your language"   
    },

    stateProv: {
        label: "State",
        errMessage: "Select a state"  
    },

    optin: {
        label: "Subscribe to Newsletter",        
    },
    
    dataPrivacy: {
        label: "Data Privacy",
    },

    marketingConsent: {
        label: "Marketing Consent",
        errMessage: "test"  
    },

    profilingConsent: {
        label: "Profiling Consent",
    },

    endDevices: {
        label: "End Devices Consent",
    },

    consentText: {
        label: "",
    }
}

