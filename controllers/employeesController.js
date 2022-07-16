const Employee = require("../models/employee");
const Department = require("../models/department");
const Organisation = require("../models/organisation");

const newEmp = async(req, res)=>{
    const empId = req.body.empId;
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const orgId = req.body.orgId;
    const deptId = req.body.deptId;
    const joiningDate = req.body.joiningDate;
    const newEmployee = new Employee({
        empId:empId,
        name:name,
        age:age,
        email:email,
        orgId:orgId,
        deptId:deptId,
        joiningDate:joiningDate
    });
    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
};

const getEmp = async(req, res)=>{
    const employees = await Employee.find({}).sort({empId:1});
    res.json(employees);
};

const getEmpByEid = async(req,res)=>{
    const empId = req.params.empid;
    const employee = await Employee.find({empId: empId}).sort({empId:1});
    res.json(employee);
};

const getEmpByDid = async(req,res)=>{
    const deptId = req.params.deptid;
    const employee = await Employee.find({deptId: deptId}).sort({empId:1});
    res.json(employee);
};

const getEmpByOid = async(req,res)=>{
    const orgId = req.params.orgid;
    const employee = await Employee.find({orgId: orgId}).sort({empId:1});
    res.json(employee);
};

const editEmp = async(req,res)=>{
    const _id = req.params.empid;
    const update = await Employee.findByIdAndUpdate(_id, {$set:{name:req.body.name,oid:req.body.oid, oname: req.body.oname, did: req.body.did}});
    res.json("Status: Updated");
};

const removeEmp = async(req,res)=>{
    const empId = req.params.empid;
    const employee = await Employee.deleteOne({empId:empId});
    res.json("Status: Deleted");
};

module.exports = {newEmp, getEmp, getEmpByEid, getEmpByDid, getEmpByOid, editEmp, removeEmp};