const { Router } = require('express');

const { checkMigration } = require("../handlers/migrationHandler");

const router = Router();

// routes start_migratiob

router.get("/", checkMigration);

// routes webhook

module.exports = router;