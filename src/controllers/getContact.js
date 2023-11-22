const hubspot = require("@hubspot/api-client");
require("dotenv").config();
const { SOURCE_ACCESS_TOKEN, MIRROR_ACCESS_TOKEN } = process.env;

const getContact = async (contactRmId) => {
    const hubspotClient = new hubspot.Client({ accessToken: SOURCE_ACCESS_TOKEN });

    const publicObjectSearchRequest = {
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "character_id",
                        operator: "EQ",
                        value: contactRmId,
                    },
                ],
            },
        ],
        properties: ["firstname", "lastname", "character_id"],
        limit: 10,
        after: 0,
    };

    const response = await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest);
    return response;
};

module.exports = getContact;
