const router = require("express").Router();
const EmpController = require('../controllers/employeesController'); 

router.post("/newemp", EmpController.newEmp);

router.get("/getemps", EmpController.getEmp);

router.get("/getemp/id/:empid", EmpController.getEmpByEid);

router.get("/getemp/name/:name", EmpController.getEmpByName);

router.get("/getemp/did/:deptid", EmpController.getEmpByDid);

router.get("/getemp/oid/:orgid", EmpController.getEmpByOid);

router.get("/getemp/didoid/", EmpController.getEmpByDidOid);

router.patch("/editemp/:empid", EmpController.editEmp);

router.delete("/removeemp/:empid", EmpController.removeEmp);

router.get("/atlassearch/:value", EmpController.atlasSearch);

router.get("/atlassearchdynamic/:value", EmpController.atlasSearchDynamic);

router.get("/atlassearchdidoid/", EmpController.atlasSearchDidOid);

module.exports = router;