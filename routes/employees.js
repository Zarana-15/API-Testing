const router = require("express").Router();
const EmpController = require('../controllers/employeesController'); 

router.post("/newemp", EmpController.newEmp);

router.get("/getemps", EmpController.getEmp);

router.get("/getemp/id/:empid", EmpController.getEmpByEid);

router.get("/getemp/name/:name", EmpController.getEmpByName);

router.get("/getemp/location/:location", EmpController.getEmpByLoc);

router.get("/getemp/did/:deptid", EmpController.getEmpByDid);

router.get("/getemp/oid/:orgid", EmpController.getEmpByOid);

router.get("/getemp/didoid/", EmpController.getEmpByDidOid);

router.patch("/editemp/:empid", EmpController.editEmp);

router.delete("/removeemp/:empid", EmpController.removeEmp);

router.get("/atlassearch/:value", EmpController.atlasSearch);

router.get("/atlassearchname/:value", EmpController.atlasSearchName);

router.get("/atlassearchloc/", EmpController.atlasSearchLoc);

router.get("/newquery/:value", EmpController.newQuery);

module.exports = router;