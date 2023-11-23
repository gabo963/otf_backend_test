const { Router } = require("express");

const { checkMigration, migrate, companyUpdate, contactUpdate } = require("../handlers/migrationHandler");

const router = Router();

router.get("/", checkMigration);

// routes start_migration

router.post("/migrate", migrate);

// routes webhook

router.post("/contactUpdate", contactUpdate);
router.post("/companyUpdate", companyUpdate);

module.exports = router;
