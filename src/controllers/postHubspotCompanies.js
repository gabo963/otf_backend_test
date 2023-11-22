const hubspot = require("@hubspot/api-client");
require("dotenv").config();
const { SOURCE_ACCESS_TOKEN } = process.env;

const postHubspotCompanies = async (companies) => {
    const hubspotClient = new hubspot.Client({ accessToken: SOURCE_ACCESS_TOKEN });

    const companiesToBeSent = companies.map((company) => {
        return {
            properties: { ...company },
        };
    });

    const response = await hubspotClient.crm.companies.batchApi.create({
        inputs: companiesToBeSent,
    });

    const companiesObject = {};

    response.results.forEach((response) => {
        companiesObject[parseInt(response.properties.location_id)] = response.id;
    });

    return companiesObject;
};

module.exports = postHubspotCompanies;
