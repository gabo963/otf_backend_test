const getCharactersToMigrate = require("../controllers/getCharactersToMigrate");
const getLocationsToMigrate = require("../controllers/getLocationsToMigrate");
const postHubspotCompanies = require("../controllers/postHubspotCompanies");
const postHubspotContacts = require("../controllers/postHubspotContacts");

const checkMigration = async (req, res) => {
    try {

        const contacts = [
            {
                character_id: 1,
                firstname: "Rick",
                lastname: "Sanchez",
                status_character: "Alive",
                character_species: "Human",
                character_gender: "Male",
                location: 1
            },
            {
                character_id: 2,
                firstname: "Morty",
                lastname: "Smith",
                status_character: "Alive",
                character_species: "Human",
                character_gender: "Male",
                location: 3
            }
        ]


        const companies = [
            {
                location_id: 1,
                name: "Earth (C-137)",
                location_type: "Planet",
                dimension: "Dimension C-137",
                creation_date: "2017-11-10"
            },
            {
                location_id: 3,
                name: "Abadango",
                location_type: "Cluster",
                dimension: "unknown",
                creation_date: "2012-11-10"
            },
        ]
        	
        const contactResponse = await postHubspotContacts(contacts);
        const companyResponse = await postHubspotCompanies(companies);
        res.status(200).json({
            response: "Hola Mundo, el backend esta funcionando.",
            companies: companyResponse,
            contacts: contactResponse
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message});
    }
};

const migrate = async (req, res) => {
    try {

        const characters = await getCharactersToMigrate();
        const locations = await getLocationsToMigrate();

        res.status(200).json({characters, locations});

        // aca corre la migracion
        
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message});
    }
}



module.exports = { checkMigration, migrate };