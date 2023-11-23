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

![Migration Diagram](/.eraser/KYdxoBrgBap2CP6eQmC2___q6qlbL6mFhMEOI5uxTMlimftZCM2___---figure---La8Z40ZsiMfItn1EKDkKW---figure---o2X-eR3i2cBpZqfmP5ea8w.png "Migration Diagram")

[﻿View on Eraser](https://app.eraser.io/workspace/KYdxoBrgBap2CP6eQmC2?elements=o2X-eR3i2cBpZqfmP5ea8w) 

The OTF API gets both locations and characters, processes them to build associations and maps them to the hubspot properties.

![OTF Migration DIagram](/.eraser/KYdxoBrgBap2CP6eQmC2___q6qlbL6mFhMEOI5uxTMlimftZCM2___---figure---dR_vF3PYwGVmkXebeLwAl---figure---q2cxhRCQbcGzy0boQ48IPQ.png "OTF Migration DIagram")

It has a batch balancer to create the records on hubspot since the batch api only allows 100 items at a time.

### Integration



<!--- Eraser file: https://app.eraser.io/workspace/KYdxoBrgBap2CP6eQmC2 --->