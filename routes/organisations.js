const router = require("express").Router();
const OrgController = require('../controllers/organisationsController'); 

router.post("/neworganisation", OrgController.newOrg);

router.get("/getorganisations", OrgController.getOrg);

router.patch("/editorganisation/:orgid", OrgController.editOrg);

router.get("/getorg/oid/:orgid", OrgController.getOrgByOid);

router.get("/getorg/oname/:orgname", OrgController.getOrgByOrgName);

router.delete("/removeorg/:orgid", OrgController.removeOrg);

module.exports = router;