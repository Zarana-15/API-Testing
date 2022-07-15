const router = require("express").Router();
const DeptController = require('../controllers/departmentsController')

router.post("/newdepartment", DeptController.newDept);

router.get("/getdepartments", DeptController.getDept);

router.patch("/editdepartment/:deptid", DeptController.editDept);

router.get("/getdept/did/:deptid", DeptController.getDeptByDid);

router.get("/getdept/oid/:orgid", DeptController.getDeptByOid);

router.delete("/removedept/:deptid", DeptController.removeDept);

module.exports = router;