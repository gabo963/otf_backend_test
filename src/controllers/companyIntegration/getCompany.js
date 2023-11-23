const hubspot = require("@hubspot/api-client");
require("dotenv").config();
const { MIRROR_ACCESS_TOKEN } = process.env;

const getCompany = async (companyRmId) => {
    const hubspotClient = new hubspot.Client({ accessToken: MIRROR_ACCESS_TOKEN });

    const publicObjectSearchRequest = {
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: "location_id",
                        operator: "EQ",
                        value: companyRmId,
                    },
                ],
            },
        ],
        properties: ["name", "location_id"],
        limit: 10,
        after: 0,
    };

    const response = await hubspotClient.crm.companies.searchApi.doSearch(publicObjectSearchRequest);
    return response;
};

module.exports = getCompany;
