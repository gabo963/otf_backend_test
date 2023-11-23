const hubspot = require("@hubspot/api-client");
require("dotenv").config();
const { MIRROR_ACCESS_TOKEN } = process.env;

const postContact = async (newContactInfo) => {
    const hubspotClient = new hubspot.Client({ accessToken: MIRROR_ACCESS_TOKEN });

    const response = await hubspotClient.crm.contacts.basicApi.create({
        properties: newContactInfo,
    });

    return response;
};

module.exports = postContact;
