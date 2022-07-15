const Employee = require("../models/employee");

const newEmp = async(req, res)=>{
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
};

const getEmp = async(req, res)=>{
    const employees = await Employee.find({});
    res.json(employees);
};

const getEmpByEid = async(req,res)=>{
    const emp_id = req.params.empid;
    const employee = await Employee.find({emp_id: emp_id});
    res.json(employee);
};

const getEmpByDid = async(req,res)=>{
    const dept_id = req.params.deptid;
    const employee = await Employee.find({dept_id: dept_id});
    res.json(employee);
};

const getEmpByOid = async(req,res)=>{
    const org_id = req.params.orgid;
    const employee = await Employee.find({org_id: org_id});
    res.json(employee);
};

const editEmp = async(req,res)=>{
    const _id = req.params.empid;
    const update = await Employee.findByIdAndUpdate(_id, {$set:{name:req.body.name,oid:req.body.oid, oname: req.body.oname, did: req.body.did}});
    res.json("Status: Updated");
};

const removeEmp = async(req,res)=>{
    const _id = req.params.empid;
    const employee = await Employee.findByIdAndDelete(_id);
    res.json("Status: Deleted");
};

module.exports = {newEmp, getEmp, getEmpByEid, getEmpByDid, getEmpByOid, editEmp, removeEmp};