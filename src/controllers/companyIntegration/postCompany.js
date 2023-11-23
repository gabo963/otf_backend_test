const hubspot = require("@hubspot/api-client");
require("dotenv").config();
const { MIRROR_ACCESS_TOKEN } = process.env;

const postCompany = async (newCompanyInfo) => {
    const hubspotClient = new hubspot.Client({ accessToken: MIRROR_ACCESS_TOKEN });

    const response = await hubspotClient.crm.companies.basicApi.create({
        properties: newCompanyInfo,
    });

    return response;
};

module.exports = postCompany;
