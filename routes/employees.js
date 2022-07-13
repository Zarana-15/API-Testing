const router = require("express").Router();
const Employee = require("../model/employee");

router.post("/newemployee", async(req, res)=>{
    const eid = req.body.eid;
    const name = req.body.name;
    const oid = req.body.oid;
    const oname = req.body.oname;
    const did = req.body.did;
    
    const newEmployee = new Employee({
        eid:eid,
        name:name,
        oid:oid,
        oname:oname,
        did:did
    });
    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
});

router.get("/getemployees", async(req, res)=>{
    const employees = await Employee.find({});
    res.json(employees);
});

router.patch("/editemployee/:empid", async(req,res)=>{
    const _id = req.params.empid;
    const update = await Employee.findByIdAndUpdate(_id, {$set:{name:req.body.name,oid:req.body.oid, oname: req.body.oname, did: req.body.did}});
    res.json("Status: Updated");
});

router.get("/getemp/:empid", async(req,res)=>{
    const _id = req.params.empid;
    const employee = await Employee.findById(_id);
    res.json(employee);
});

router.delete("/removeemp/:empid", async(req,res)=>{
    const _id = req.params.empid;
    const employee = await Employee.findByIdAndDelete(_id);
    res.json("Status: Deleted");
});

module.exports = router;