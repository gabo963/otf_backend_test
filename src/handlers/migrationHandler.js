const getCharactersToMigrate = require("../controllers/getCharactersToMigrate");
const getLocationsToMigrate = require("../controllers/getLocationsToMigrate");
const postHubspotCompanies = require("../controllers/postHubspotCompanies");
const postHubspotContacts = require("../controllers/postHubspotContacts");
const migrationController = require("../controllers/migrationController");
const getContact = require("../controllers/getContact");
const putContact = require("../controllers/putContact");
const postContact = require("../controllers/postContact");

const checkMigration = async (req, res) => {
    try {
        res.status(200).json({ response: "Hola Mundo, el backend esta funcionando. Esta es la pruieba para OTF de Gabriel Sarmiento" });
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

        let companiesResponses = [];
        locations.forEach((location) => {
            companiesResponses.push({ id: companyResponse[location.location_id], ...location });
        });

        res.status(201).json({ result: "Success!", companies: companiesResponses, contacts: charactersResponse });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};

const contactUpdate = async (req, res) => {
    try {
        const { character_id, firstname, lastname, gender, status_character, character_species, createdate } = req.body;
        let message = "";

        const exist = await getContact(character_id);
        let contact = {};
        console.log(exist);

        if (exist.total > 0) {
            contact = await putContact({ id: exist.results[0].id, character_id, firstname, lastname, gender, status_character, character_species, createdate });
            message = `contact with id ${contact.id} has been updated`;
        } else {
            contact = await postContact({ character_id, firstname, lastname, gender, status_character, character_species, createdate });
            message = `contact with id ${contact.id} has been created`;
        }

        res.status(200).json({ response: message, contact });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};

const companyUpdate = async (req, res) => {
    try {
        //TODO: copy contact update, update workflow on hubspot
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};

module.exports = { checkMigration, migrate, contactUpdate, companyUpdate };
