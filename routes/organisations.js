const router = require("express").Router();
const OrgController = require('../controllers/organisationsController'); 

router.post("/neworg", OrgController.newOrg);

router.get("/getorgs", OrgController.getOrg);

router.get("/getorg/oid/:orgid", OrgController.getOrgByOid);

router.get("/getorg/oname/:orgname", OrgController.getOrgByOrgName);

router.patch("/editorg/:orgid", OrgController.editOrg);

router.delete("/removeorg/:orgid", OrgController.removeOrg);

module.exports = router;