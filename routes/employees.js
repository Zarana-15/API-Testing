const router = require("express").Router();
const EmpController = require('../controllers/employeesController'); 

router.post("/newemp", EmpController.newEmp);

router.get("/getemps", EmpController.getEmp);

router.get("/getemp/id/:empid", EmpController.getEmpByEid);

router.get("/getemp/did/:deptid", EmpController.getEmpByDid);

router.get("/getemp/oid/:orgid", EmpController.getEmpByOid);

router.patch("/editemp/:empid", EmpController.editEmp);

router.delete("/removeemp/:empid", EmpController.removeEmp);

module.exports = router;