const router = require("express").Router();
const DeptController = require('../controllers/departmentsController')

router.post("/newdept", DeptController.newDept);

router.get("/getdepts", DeptController.getDept);

router.get("/getdept/did/:deptid", DeptController.getDeptByDid);

router.get("/getdept/oid/:orgid", DeptController.getDeptByOid);

router.patch("/editdept/:deptid", DeptController.editDept);

router.delete("/removedept/:deptid", DeptController.removeDept);

module.exports = router;