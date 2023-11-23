const getCharactersToMigrate = require("../controllers/migration/getCharactersToMigrate");
const getLocationsToMigrate = require("../controllers/migration/getLocationsToMigrate");
const postHubspotCompanies = require("../controllers/migration/postHubspotCompanies");
const postHubspotContacts = require("../controllers/migration/postHubspotContacts");
const migrationController = require("../controllers/migration/migrationController");

const getContact = require("../controllers/contactIntegration/getContact");
const putContact = require("../controllers/contactIntegration/putContact");
const postContact = require("../controllers/contactIntegration/postContact");

const getCompany = require("../controllers/companyIntegration/getCompany");
const putCompany = require("../controllers/companyIntegration/putCompany");
const postCompany = require("../controllers/companyIntegration/postCompany");

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
        const { name, dimension, createdate, location_id, creation_date, location_type } = req.body;
        let message = "";

        const exist = await getCompany(location_id);
        let company = {};

        if (exist.total > 0) {
            company = await putCompany({ id: exist.results[0].id, name, dimension, createdate, location_id, creation_date, location_type });
            message = `company with id ${company.id} has been updated`;
        } else {
            company = await postCompany({ name, dimension, createdate, location_id, creation_date, location_type });
            message = `company with id ${company.id} has been created`;
        }

        res.status(200).json({ response: message, company });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};

module.exports = { checkMigration, migrate, contactUpdate, companyUpdate };
