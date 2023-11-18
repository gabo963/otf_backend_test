const { Router } = require('express');

const { checkMigration, migrate } = require("../handlers/migrationHandler");

const router = Router();

// routes start_migratiob

router.get("/", checkMigration);
router.post("/migrate", migrate)

// routes webhook

module.exports = router;