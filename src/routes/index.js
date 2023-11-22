const { Router } = require("express");

const { checkMigration, migrate, companyUpdate, contactUpdate } = require("../handlers/migrationHandler");

const router = Router();

// routes start_migratiob

router.get("/", checkMigration);
router.post("/migrate", migrate);
router.post("/contactUpdate", contactUpdate);
router.post("/companyUpdate", companyUpdate);

// routes webhook

module.exports = router;
