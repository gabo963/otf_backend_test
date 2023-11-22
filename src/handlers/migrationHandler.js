const getCharactersToMigrate = require("../controllers/getCharactersToMigrate");
const getLocationsToMigrate = require("../controllers/getLocationsToMigrate");
const postHubspotCompanies = require("../controllers/postHubspotCompanies");
const postHubspotContacts = require("../controllers/postHubspotContacts");

const checkMigration = async (req, res) => {
    try {
        res.status(200).json({ response: "Hola Mundo, el backend esta funcionando." });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};

const migrate = async (req, res) => {
    try {
        const characters = await getCharactersToMigrate();
        const locations = await getLocationsToMigrate();
        const companyResponse = await postHubspotCompanies(locations);
        const contactResponse = await postHubspotContacts(characters, companyResponse);

        res.status(200).json({ companies: companyResponse, contacts: contactResponse });

        // aca corre la migracion
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};

module.exports = { checkMigration, migrate };
