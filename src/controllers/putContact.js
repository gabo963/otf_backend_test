const hubspot = require("@hubspot/api-client");
require("dotenv").config();
const { MIRROR_ACCESS_TOKEN } = process.env;

const putContact = async (newContactInfo) => {
    const hubspotClient = new hubspot.Client({ accessToken: MIRROR_ACCESS_TOKEN });

    return newContactInfo.id;

    // TODO: https://developers.hubspot.com/docs/api/crm/contacts Patch contact
};

module.exports = putContact;
