const hubspot = require("@hubspot/api-client");
require("dotenv").config();
const { SOURCE_ACCESS_TOKEN } = process.env;

const postHubspotContacts = async (contacts, associations) => {
    const hubspotClient = new hubspot.Client({ accessToken: SOURCE_ACCESS_TOKEN });

    const contactsToBeSentOut = contacts.map((contact) => {
        const { character_id, firstname, lastname, status_character, character_species, character_gender, location } = contact;

        if (location && associations[location]) {
            return {
                properties: { character_id, firstname, lastname, status_character, character_species, character_gender },
                associations: [
                    {
                        types: [
                            {
                                associationCategory: "HUBSPOT_DEFINED",
                                associationTypeId: 1,
                            },
                        ],
                        to: { id: associations[location] },
                    },
                ],
            };
        } else {
            return { properties: { character_id, firstname, lastname, status_character, character_species, character_gender } };
        }
    });

    const response = await hubspotClient.crm.contacts.batchApi.create({
        inputs: contactsToBeSentOut,
    });

    return response.results;
};

module.exports = postHubspotContacts;
