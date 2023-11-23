<p><a target="_blank" href="https://app.eraser.io/workspace/KYdxoBrgBap2CP6eQmC2" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

Gabriel Sarmiento, OTF Backend Developer test.

---

## How the OTF API Works
The OTF API is designed to both migrate the Rick & Morty API into Hubspot and integrate two hubspot instances. It is hosted on the render tool.

### Endpoints
The solution is hosted on render, the following link can be utilized to run these endpoints [﻿otf-test.onrender.com](https://otf-test.onrender.com/) 

1. `GET /`  - The main endpoint, to see if the instance is up and running.
2. `POST /migrate` - This endpoint will start a migration from the Rick & Morty API into the Hubspot Source instance.
3. `POST /contactUpdate` - This endpoint is designed to be called by the Source Hubspot's application webhook, it will update an specific contact detail's on the mirror instance.
4. `POST /companyUpdate` - This endpoint is designed to be called by the Source Hubspot's application webhook, it will update an specific company detail's on the mirror instance.
### Migration
Migrations should normally be started by a shell command on a server, but for the purpose of the test I have made it into a endpoint. `POST /migrate` 

The General idea can be seen below, The OTF API Extracts data from the Rick & Morty API and posts it into the Hubspots Source account

![Migration Diagram](/.eraser/KYdxoBrgBap2CP6eQmC2___q6qlbL6mFhMEOI5uxTMlimftZCM2___---figure---4b5hXrXG0VeF40GTh7j5R---figure---o2X-eR3i2cBpZqfmP5ea8w.png "Migration Diagram")

[﻿View on Eraser](https://app.eraser.io/workspace/KYdxoBrgBap2CP6eQmC2?elements=o2X-eR3i2cBpZqfmP5ea8w) 

The OTF API gets both locations and characters, processes them to build associations and maps them to the hubspot properties.

![OTF Migration DIagram](undefined "OTF Migration DIagram")

It has a batch balancer to create the records on hubspot since the batch api only allows 100 items at a time.

### Integration
On the integration I leverage the two workflows on the Source Hubspot Instance to shoot webhooks every time a record of either contact or company is changed. When this happens the two endpoints are triggered. If the changed record already exists on the Mirror instance (key is the Rick & Morty ID) then the record is updated, on the contrary if no record exists yet on the mirror it is created.

![Integration Diagram](/.eraser/KYdxoBrgBap2CP6eQmC2___q6qlbL6mFhMEOI5uxTMlimftZCM2___---figure---Z4qbgiIs0FVlJ0RTwT_pZ---figure---ka0Yhxkeq_AST1mnv3S1UQ.png "Integration Diagram")

#### Endpoints
1. `POST /contactUpdate` - This endpoint is designed to be called by the Source Hubspot's application webhook, it will update an specific contact detail's on the mirror instance.
2. `POST /companyUpdate` - This endpoint is designed to be called by the Source Hubspot's application webhook, it will update an specific company detail's on the mirror instance.
---

## Technologies Used
The OTF API was built using express.js 

Multiple relevant packages where employed:

[﻿developers.hubspot.com/docs/api/overview](https://developers.hubspot.com/docs/api/overview) 

[﻿www.npmjs.com/package/@hubspot/api-client](https://www.npmjs.com/package/@hubspot/api-client) 

[﻿rickandmortyapi.com/documentation/#rest](https://rickandmortyapi.com/documentation/#rest) 






<!--- Eraser file: https://app.eraser.io/workspace/KYdxoBrgBap2CP6eQmC2 --->