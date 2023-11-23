const { getLocations } = require("rickmortyapi");

const getLocationsToMigrate = async () => {
    let locations = []
    let page = 1
    let maxPages = 2

    while( page < maxPages ) {
        
        const dirtyLocations = await getLocations({page: page})
        maxPages = dirtyLocations.data.info.pages;

        let locationData = dirtyLocations.data.results;

        locationData = locationData.map( (location) => {
            return { 
                location_id: location.id,
                name: location.name,
                location_type: location.type,
                dimension: location.dimension,
                creation_date: location.created.split("T")[0]
            }
        });

        locations = locations.concat(locationData)
        page++;
    }

    return locations;
};

module.exports = getLocationsToMigrate;