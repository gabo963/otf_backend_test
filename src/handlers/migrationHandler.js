const checkMigration = async (req, res) => {
    try {
        res.status(200).json({response: "Hola Mundo, el backend esta funcionando."})
    } catch (error) {
        res.status(404).json({error: error.message});
    }
    
};

module.exports = { checkMigration };