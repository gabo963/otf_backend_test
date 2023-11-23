const hubspot = require("@hubspot/api-client");
require("dotenv").config();
const { MIRROR_ACCESS_TOKEN } = process.env;

const putContact = async (newContactInfo) => {
    const hubspotClient = new hubspot.Client({ accessToken: MIRROR_ACCESS_TOKEN });

    const { character_id, firstname, lastname, gender, status_character, character_species } = newContactInfo;

    const response = await hubspotClient.crm.contacts.basicApi.update(newContactInfo.id, {
        properties: { character_id, firstname, lastname, gender, status_character, character_species },
    });

    return response;
};

module.exports = putContact;
