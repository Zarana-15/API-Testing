const router = require("express").Router();
const Organisation = require("../model/organisation");

router.post("/neworganisation", async(req, res)=>{
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
});

router.get("/getorganisations", async(req, res)=>{
    const organisations = await Organisation.find({});
    res.json(organisations);
});

router.patch("/editorganisation/:orgid", async(req,res)=>{
    const _id = req.params.orgid;
    const update = await Organisation.findByIdAndUpdate(_id, {$set:{oid:req.body.oid, oname: req.body.oname}});
    res.json("Status: Updated");
});

router.get("/getorg/:orgid", async(req,res)=>{
    const _id = req.params.orgid;
    const organisation = await Organisation.findById(_id);
    res.json(organisation);
});

router.delete("/removeorg/:orgid", async(req,res)=>{
    const _id = req.params.orgid;
    const organisation = await Organisation.findByIdAndDelete(_id);
    res.json("Status: Deleted");
});

module.exports = router;