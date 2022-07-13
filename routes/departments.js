const router = require("express").Router();
const Department = require("../model/department");

router.post("/newdepartment", async(req, res)=>{
    const did = req.body.did;
    const dname = req.body.dname;
    const oid = req.body.oid;
    
    const newDepartment = new Department({
        did:did,
        dname:dname,
        oid:oid,
    });
    const savedDepartment = await newDepartment.save();
    res.json(savedDepartment);
});

router.get("/getdepartments", async(req, res)=>{
    const departments = await Department.find({});
    res.json(departments);
});

router.patch("/editdepartment/:deptid", async(req,res)=>{
    const _id = req.params.deptid;
    const update = await Department.findByIdAndUpdate(_id, {$set:{oid:req.body.oid, dname: req.body.dname, did: req.body.did}});
    res.json("Status: Updated");
});

router.get("/getdept/:deptid", async(req,res)=>{
    const _id = req.params.deptid;
    const department = await Department.findById(_id);
    res.json(department);
});

router.delete("/removedept/:deptid", async(req,res)=>{
    const _id = req.params.deptid;
    const department = await Department.findByIdAndDelete(_id);
    res.json("Status: Deleted");
});

module.exports = router;