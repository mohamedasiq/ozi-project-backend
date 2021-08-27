const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

// router.post("/", async (req, res) => {
//   const newConversation = new Conversation({
//     members: [req.body.senderId, req.body.receiverId],
//   });

//   try {
//     const savedConversation = await newConversation.save();
//     res.status(200).json(savedConversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.post("/", async (req, res) => {
  console.log("Entered new conversation")
  const conversation = await Conversation.find({
    members: { $eq: [req.body.senderId,req.body.receiverId] },
  });

  const conversationr = await Conversation.find({
    members: { $eq: [req.body.receiverId,req.body.senderId] },
  });
  
  if(conversation.length>0 || conversationr.length>0)
  {
    console.log("conversation")
    console.log(conversation)
    res.status(200).json(conversation.length>0 ? conversation[0] : conversationr[0]);
  }
  else{
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      console.log(savedConversation)
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  console.log("Entered into a conversation")
  console.log(req.params.userId)
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    console.log(conversation)
    console.log("Outing into a conversation")
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
