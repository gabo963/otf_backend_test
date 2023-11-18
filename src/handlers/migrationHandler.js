const getCharactersToMigrate = require("../controllers/getCharactersToMigrate");
const getLocationsToMigrate = require("../controllers/getLocationsToMigrate");

const checkMigration = async (req, res) => {
    try {
        res.status(200).json({response: "Hola Mundo, el backend esta funcionando."})
    } catch (error) {
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
        res.status(404).json({error: error.message});
    }
}



module.exports = { checkMigration, migrate };