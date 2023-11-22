const getCharactersToMigrate = require("../controllers/getCharactersToMigrate");
const getLocationsToMigrate = require("../controllers/getLocationsToMigrate");
const postHubspotCompanies = require("../controllers/postHubspotCompanies");
const postHubspotContacts = require("../controllers/postHubspotContacts");
const migrationController = require("../controllers/migrationController");

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
        const locations = await getLocationsToMigrate();
        const characters = await getCharactersToMigrate();

        const companyResponse = await migrationController(100, locations, postHubspotCompanies);
        const charactersResponse = await migrationController(100, characters, postHubspotContacts, companyResponse);

        res.status(200).json({ companies: companyResponse, contacts: charactersResponse });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};

module.exports = { checkMigration, migrate };
