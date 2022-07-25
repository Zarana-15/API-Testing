const Department = require("../models/department");
const Employee = require("../models/employee");  //To delete employees when department is deleted
const Organisation = require("../models/organisation");

const newDept = async(req, res)=>{
    try{
      const deptId = req.body.deptId;
      const dname = req.body.dname;
      const orgId = req.body.orgId;
      const newDepartment = new Department({
          deptId:deptId,
          dname:dname,
          orgId:orgId,
      });
      const org = await Organisation.findOne({orgId:orgId})
      console.log(org)
      if(org != null){
        const savedDepartment = await newDepartment.save();
        res.json(savedDepartment);
        const organisation = await Organisation.updateOne({orgId:orgId},{ $push: { dept: deptId } });
      }
      else{
        res.json("Organisation Does not Exist.")
      }
      
    }
    catch(e){
      console.error("Cannot add department. "+e)
  }
};

const getDept = async(req, res)=>{
    const departments = await Department.find({});
    res.json(departments);
};

const getDeptByDid = async(req,res)=>{
    const deptId = req.params.deptid;
    const department = await Department.find({deptId: deptId});
    res.json(department);
};

const getDeptByOid =  async(req,res)=>{
    const orgId = req.params.orgid;
    const department = await Department.find({orgId: orgId});
    res.json(department);
};

const editDept = async(req,res)=>{
    const deptId = req.params.deptid;
    const org = await Department.findOne({deptId:deptId})
    var jsonOrg = JSON.parse(JSON.stringify(org))
    const orgId = jsonOrg.orgId
    const update = await Department.updateOne({deptId:deptId}, {$set:{dname:req.body.dname, deptId:req.body.deptId}});
    const updateemp = await Employee.updateMany({deptId:deptId}, {$set:{deptId:req.body.deptId}})
    const organisation = await Organisation.updateOne({orgId:orgId}, { $pull: { dept: deptId }})
    const organisation2 = await Organisation.updateOne({orgId:orgId},{ $push: { dept: req.body.deptId }})
    res.json("Status: Updated");
};

const removeDept = async(req,res)=>{
    const deptId = req.params.deptid;
    const dept = await Department.findOne({deptId : deptId},{_id:0, __v:0});
    var jsondept = JSON.parse(JSON.stringify(dept));
    const orgId = jsondept["orgId"];
    console.log(orgId) 
    const department = await Department.deleteOne({deptId:deptId});
    const employees = await Employee.deleteMany({deptId:deptId});
    const organisation = await Organisation.updateMany({orgId:orgId}, { $pull: { dept: deptId } })
    res.json(orgId);
};

const atlasSearch = async(req, res)=>{
    const val = req.params.value
    try {
        const pipeline = [
            {
              '$search': {
                'index': 'searchDepartment', 
                'text': {
                  'query': val, 
                  'path': ['dname', 'deptId', 'orgId']
                }
              }
            }, {
              '$project': {
                'deptId': 1, 
                'orgId': 1, 
                'dname': 1, 
                '_id': 0, 
                'score': {
                  '$meta': 'searchScore'
                }
              }
            }
          ];

          const aggregateResult = await Department.aggregate(pipeline);
          //const aggResArray = await aggregateResult.toArray();
          res.json(aggregateResult)
    }
    catch (e){
        console.error(`Unable to search: ${e}`)
        res.json("Unable to Search")
    }
}

module.exports = {newDept, getDept, getDeptByDid, getDeptByOid, editDept, removeDept, atlasSearch};