const hubspot = require('@hubspot/api-client')
require("dotenv").config()
const {SOURCE_ACCESS_TOKEN} = process.env;

const postHubspotCompanies = async ( companies ) => {
    
    const hubspotClient = new hubspot.Client({ accessToken: SOURCE_ACCESS_TOKEN });

    const promises = []

    for( let i = 0; i < companies.length; i++) {
        const promise = hubspotClient.crm.companies.basicApi.create({
            "properties": {
                ...companies[i]
        }});
        promises.push(promise);
    }

    result = await Promise.all(promises);

    const locations = {};

    result.forEach( response => {   
        locations[parseInt(response.properties.location_id)] = response.id;
    });

    return locations;
};

module.exports = postHubspotCompanies;