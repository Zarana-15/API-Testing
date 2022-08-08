const Employee = require("../models/employee");
const Department = require("../models/department");
const Organisation = require("../models/organisation");

const newEmp = async(req, res)=>{
    var lastemp = await Employee.find({}).sort({empId:-1}).limit(1)
    var jsonemp = JSON.parse(JSON.stringify(lastemp))
    const empId = jsonemp[0].empId + 1
    const name = req.body.name;
    const age = req.body.age;
    const orgId = req.body.orgId;
    const deptId = req.body.deptId;
    var fullname = name.toLowerCase().split(" ");
    var email = "";
    var flag = 0;
    try {
        var oname = await Organisation.find({orgId:orgId})
        var jsonorg = JSON.parse(JSON.stringify(oname))
        const orgName = jsonorg[0].oname
        //console.log(orgName)
        email = fullname[0]+"."+fullname[1]+"_"+empId+"@"+orgName.toLowerCase()+".com"
        //console.log(oname)
        var dname = await Department.find({orgId:orgId,deptId:deptId})
        //console.log(dname[0].dname)
        if(dname[0].dname == "random value") console.log("something's wrong")  
    }
    catch(e)
    {
        flag = 1;
        console.log("Errrorrr!"+e)
        console.log("Department or organisation does not exist.")
        //res.json("Cannot find Organisation or Department!")
    }
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const joiningDate = dd + '/' + mm + '/' + yyyy;
    if(flag!=1)
    {
        const newEmployee = new Employee({
            name:name,
            age:age,
            email:email,
            empId:empId,
            orgId:orgId,
            deptId:deptId,
            joiningDate:joiningDate
        });
        const savedEmployee = await newEmployee.save();
        res.json(savedEmployee);
    }
    else
    {
        res.json("Department or Organization does not exist.")
    }    
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

const getEmpByName = async(req,res)=>{
    const ename = req.params.name;
    const employee = await Employee.find({name: {$regex : ename, $options:"$i" }});
    res.json(employee);
}

const getEmpByLoc = async(req, res) => {
  const location = req.params.location;
  const employee = await Employee.find({'preferredLocations': {$regex: location, $options: '$i'}})
  res.json(employee);
}

const newQuery = async(req, res) => {
  const value = req.params.value;
  const employee = await Employee.find({$or : [  
    {'name': {$regex: value, $options:"$i" }},
    {'preferredLocations': value},
    {'skills': value}       
    ]});
  res.json(employee);
}

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

const getEmpByDidOid = async(req,res)=>{
    const deptId = req.headers.deptid;
    const orgId = req.headers.orgid;
    const employee = await Employee.find({orgId: orgId, deptId:deptId}).sort({empId:1});
    res.json(employee);
}

const editEmp = async(req,res)=>{
    const empId = req.params.empid;
    const update = await Employee.updateOne({empId : empId}, {$set:{name:req.body.name, age: req.body.age}});
    res.json("Status: Updated");
};

const removeEmp = async(req,res)=>{
    const empId = req.params.empid;
    const employee = await Employee.deleteOne({empId:empId});
    res.json("Status: Deleted");
};

const atlasSearch = async(req, res)=>{
    const val = req.params.value
    try {
        const pipeline = [
            {
              '$search': {
                'index': 'searchEmployee', 
                'text': {
                  'query': val, 
                  //'path': ['name', 'deptId', 'orgId', 'joiningDate']
                  'path':['name', 'skills', 'preferredLocations']
                }
              }
             }
          ];

          const aggregateResult = await Employee.aggregate(pipeline);
          //const aggResArray = await aggregateResult.toArray();
          res.json(aggregateResult)
    }
    catch (e){
        console.error(`Unable to search: ${e}`)
        res.json("Unable to Search")
    }
}

//Create the index on cluster again. You have deleted
const atlasSearchName = async(req, res)=>{  
    const val = req.params.value
    try {
        const pipeline = [
            {
              '$search': {
                'index': 'searchEmpName', 
                'text': {
                  'query': val, 
                  //'path': ['name', 'deptId', 'orgId', 'joiningDate']
                  'path':['name']
                }
              }
            }
          ];

          const aggregateResult = await Employee.aggregate(pipeline);
          //const aggResArray = await aggregateResult.toArray();
          res.json(aggregateResult)
    }
    catch (e){
        console.error(`Unable to search: ${e}`)
        res.json("Unable to Search")
    }
}

const atlasSearchLoc = async(req, res)=>{  
    const val = req.headers.value
    try {
        const pipeline = [
            {
              '$search': {
                'index': 'searchEmpLoc', 
                'text': {
                  'query': val, 
                  //'path': ['name', 'deptId', 'orgId', 'joiningDate']
                  'path':['preferredLocations']
                }
              } 
            }
          ];

          const aggregateResult = await Employee.aggregate(pipeline);
          //const aggResArray = await aggregateResult.toArray();
          res.json(aggregateResult)
    }
    catch (e){
        console.error(`Unable to search: ${e}`)
        res.json("Unable to Search")
    }
}

module.exports = {newEmp, getEmp, getEmpByEid, getEmpByName, getEmpByLoc, getEmpByDid, getEmpByOid, getEmpByDidOid, editEmp, removeEmp, atlasSearch, atlasSearchName, atlasSearchLoc, newQuery};