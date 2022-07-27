const Organisation = require("../models/organisation");
const Department = require("../models/department"); //To delete departments if org is deleted
const Employee = require("../models/employee");  // To delete employees if org is deleted

const newOrg = async(req, res)=>{
    try{
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
    }
    catch(e){
        console.error("Unable to create Organisation. "+e);
    }
};

const getOrg = async(req, res)=>{
    try{
        const organisations = await Organisation.find({});
        res.json(organisations);
        return organisations;
    }
    catch(e){
        console.error("Cannot get organisation. "+e)
        res.json("Cannot get Organisation.")
    }
};

const getOrgByOid = async(req,res)=>{
    try{
        const orgId = req.params.orgid;
        const organisation = await Organisation.find({orgId: orgId});
        res.json(organisation);
    }
    catch(e){
        console.error("Cannot get organisation. "+e)
        res.json("Cannot get Organisation.")
    }
};

const getOrgByOrgName = async(req,res)=>{
    try{
        const org_name = req.params.orgname;
        const organisation = await Organisation.find({oname: org_name});
        res.json(organisation);
    }
    catch(e){
        console.error("Cannot get organisation. "+e)
        res.json("Cannot get Organisation.")
    }
};

const editOrg = async(req,res)=>{
    try{
        const orgId = req.params.orgid;
        const update = await Organisation.updateOne({orgId:orgId}, {$set:{orgId:req.body.orgId, address:req.body.address}});
        const updateemp = await Employee.updateMany({orgId:orgId}, {$set:{orgId:req.body.orgId}})
        const updatedept = await Department.updateMany({orgId:orgId}, {$set:{orgId:req.body.orgId}})
        res.json("Status: Updated");
    }
    catch(e){
        console.error("Cannot Update organisation. "+e)
        res.json("Cannot Update Organisation.")
    }
};

const removeOrg = async(req,res)=>{
    try {
        const orgId = req.params.orgid;
        const organisation = await Organisation.deleteOne({orgId:orgId});
        const department = await Department.deleteMany({orgId:orgId});
        const employees = await Employee.deleteMany({orgId:orgId});
        res.json("Status: Deleted");
    }
    catch(e){
        console.error("Cannot delete organisation. "+e)
        res.json("Cannot delete Organisation.")
    }
}

const atlasSearch = async(req, res)=>{
    const val = req.params.value
    try {
        const pipeline = [
            {
              '$search': {
                'index': 'searchOrganisation', 
                'text': {
                  'query': val, 
                  'path': ['oname']
                }
              }
            }, {
              '$project': {
                'orgId': 1, 
                'oname': 1, 
                'dept': 1, 
                'address':1,                
                '_id': 0, 
                'score': {
                  '$meta': 'searchScore'
                }
              }
            }
          ];
          const aggregateResult = await Organisation.aggregate(pipeline);
          //const aggResArray = await aggregateResult.toArray();
          res.json(aggregateResult)
    }
    catch (e){
        console.error(`Unable to search: ${e}`)
        res.json("Unable to Search")
    }
}


module.exports = {newOrg, getOrg, getOrgByOid, getOrgByOrgName, editOrg, removeOrg, atlasSearch};
