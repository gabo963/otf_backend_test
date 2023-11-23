const hubspot = require("@hubspot/api-client");
require("dotenv").config();
const { MIRROR_ACCESS_TOKEN } = process.env;

const putCompany = async (newCompanyInfo) => {
    const hubspotClient = new hubspot.Client({ accessToken: MIRROR_ACCESS_TOKEN });

    const { name, dimension, location_id, creation_date, location_type } = newCompanyInfo;

    const response = await hubspotClient.crm.companies.basicApi.update(newCompanyInfo.id, {
        properties: { name, dimension, location_id, creation_date, location_type },
    });

    return response;
};

module.exports = putCompany;
