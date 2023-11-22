const hubspot = require("@hubspot/api-client");
require("dotenv").config();
const { MIRROR_ACCESS_TOKEN } = process.env;

const putContact = async (newContactInfo) => {
    const hubspotClient = new hubspot.Client({ accessToken: MIRROR_ACCESS_TOKEN });

    const publicObjectSearchRequest = {
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "character_id",
                        operator: "EQ",
                        value: `1`,
                    },
                ],
            },
        ],
        properties: ["createdate", "firstname", "lastname", "character_id"],
        limit: 10,
        after: 0,
    };

    const response = await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest);

    console.log(response);
    return response;
};

module.exports = putContact;
