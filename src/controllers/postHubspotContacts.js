const hubspot = require('@hubspot/api-client')
require("dotenv").config()
const {SOURCE_ACCESS_TOKEN} = process.env;

const postHubspotContacts = async ( contacts ) => {
    
    const hubspotClient = new hubspot.Client({ accessToken: SOURCE_ACCESS_TOKEN });

    const promises = []
    const locations = {};

    for( let i = 0; i < contacts.length; i++) {
        const {character_id, firstname, lastname, status_character, character_species, character_gender, location} = contacts[i];
        locations[character_id] = location;
        const promise = hubspotClient.crm.contacts.basicApi.create({
            "properties": {
                character_id, firstname, lastname, status_character, character_species, character_gender
        }});
        promises.push(promise);
    }

    result = await Promise.all(promises);

    const created = {};

    result.forEach( response => {
        const id = parseInt(response.properties.character_id);
        created[id] = [response.id, locations[id]];
    });

    return created;
};

module.exports = postHubspotContacts;