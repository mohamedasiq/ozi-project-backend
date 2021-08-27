const router = require("express").Router();
const Room = require("../models/Room");
const { route } = require("./users");

router.get("/", async (req, res) => {
    console.log("Entered into a rooms")
    try {
        var rmList = await Room.find()
        console.log(rmList)
        res.status(201).json(rmList)
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post("/addmembers", async(req,res) => {
    console.log("Entered into a room members")
    try {
        console.log("Room members " + req.body.roomId + " " + req.body.userId)
        var rmList = await Room.findOneAndUpdate(
            { _id: req.body.roomId }, 
            { $addToSet: { members: req.body.userId } })
        console.log(rmList)
        res.status(201).json(rmList)
    } catch (err) {
      res.status(500).json(err);
    }
})

module.exports = router;