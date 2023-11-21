const hubspot = require('@hubspot/api-client')
const {SOURCE_ACCESS_TOKEN} = process.env;
const hubspotClient = new hubspot.Client({ accessToken: SOURCE_ACCESS_TOKEN })

const postHubspotCompanies = async ( companies ) => {

    const response = await hubspotClient.apiRequest({
        method: 'POST',
        path: '/crm/v3/objects/companies',
        body: {
            "properties": {
                "name": "La Empresa de Gabo",  
                "domain": "gabo.com",
                "city": "Cambridge",
                "industry": "Technology",
                "phone": "555-555-555",
                "state": "Massachusetts",
                "lifecyclestage": "51439524"
            }
            },
        defaultJson: false
    });

    console.log(response);

};

module.exports = postHubspotCompanies;