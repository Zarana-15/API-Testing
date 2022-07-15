const Department = require("../models/department");

const newDept = async(req, res)=>{
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
};

const getDept = async(req, res)=>{
    const departments = await Department.find({});
    res.json(departments);
};

const getDeptByDid = async(req,res)=>{
    const dept_id = req.params.deptid;
    const department = await Department.find({did: dept_id});
    res.json(department);
};

const getDeptByOid =  async(req,res)=>{
    const org_id = req.params.orgid;
    const department = await Department.find({oid: org_id});
    res.json(department);
};

const editDept = async(req,res)=>{
    const _id = req.params.deptid;
    const update = await Department.findByIdAndUpdate(_id, {$set:{oid:req.body.oid, dname: req.body.dname, did: req.body.did}});
    res.json("Status: Updated");
};

const removeDept = async(req,res)=>{
    const _id = req.params.deptid;
    const department = await Department.findByIdAndDelete(_id);
    res.json("Status: Deleted");
};

module.exports = {newDept, getDept, getDeptByDid, getDeptByOid, editDept, removeDept};