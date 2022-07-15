const Organisation = require("../models/organisation");

const newOrg = async(req, res)=>{
    const oid = req.body.oid;
    const oname = req.body.oname;
    const address = req.body.address;
    const dept = req.body.dept;
    
    const newOrganisation = new Organisation({
        oid:oid,
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
    const org_id = req.params.orgid;
    const organisation = await Organisation.find({oid: org_id});
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
    const _id = req.params.orgid;
    const organisation = await Organisation.findByIdAndDelete(_id);
    res.json("Status: Deleted");
}

module.exports = {newOrg, getOrg, getOrgByOid, getOrgByOrgName, editOrg, removeOrg};
