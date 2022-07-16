const Organisation = require("../models/organisation");
const Department = require("../models/department"); //To delete departments if org is deleted
const Employee = require("../models/employee");  // To delete employees if org is deleted

const newOrg = async(req, res)=>{
    const orgId = req.body.orgId;
    const oname = req.body.oname;
    const address = req.body.address;
    const dept = req.body.dept;
    const newOrganisation = new Organisation({
        orgId:orgId,
        oname:oname,
        address:address,
        dept:dept
    });
    const savedOrganisation = await newOrganisation.save();
    res.json(savedOrganisation);
};

const getOrg = async(req, res)=>{
    const organisations = await Organisation.find({});
    res.json(organisations);
};

const getOrgByOid = async(req,res)=>{
    const orgId = req.params.orgid;
    const organisation = await Organisation.find({orgId: orgId});
    res.json(organisation);
};

const getOrgByOrgName = async(req,res)=>{
    const org_name = req.params.orgname;
    const organisation = await Organisation.find({oname: org_name});
    res.json(organisation);
};

const editOrg = async(req,res)=>{
    const _id = req.params.orgid;
    const update = await Organisation.findByIdAndUpdate(_id, {$set:{oid:req.body.oid, oname: req.body.oname}});
    res.json("Status: Updated");
};

const removeOrg = async(req,res)=>{
    const orgId = req.params.orgid;
    const organisation = await Organisation.deleteOne({orgId:orgId});
    const department = await Department.deleteMany({orgId:orgId});
    const employees = await Employee.deleteMany({orgId:orgId});
    res.json("Status: Deleted");
}

module.exports = {newOrg, getOrg, getOrgByOid, getOrgByOrgName, editOrg, removeOrg};
