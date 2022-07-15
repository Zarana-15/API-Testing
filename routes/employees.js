const router = require("express").Router();
const EmpController = require('../controllers/employeesController'); 

router.post("/newemployee", EmpController.newEmp);

router.get("/getemployees", EmpController.getEmp);

router.patch("/editemployee/:empid", EmpController.editEmp);

router.get("/getemp/id/:empid", EmpController.getEmpByEid);

router.get("/getemp/did/:deptid", EmpController.getEmpByDid);

router.get("/getemp/oid/:orgid", EmpController.getEmpByOid);

router.delete("/removeemp/:empid", EmpController.removeEmp);

module.exports = router;