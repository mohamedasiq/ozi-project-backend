const router = require("express").Router();
const Message = require("../models/Message");

//add

// router.post("/", async (req, res) => {
//   const newMessage = new Message(req.body);

//   try {
//     const savedMessage = await newMessage.save();
//     res.status(200).json(savedMessage);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post("/", async (req, res) => {
  console.log(req.body)
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/roomId/:roomId", async (req, res) => {
  try {
    console.log("Entering into message room")
    const messages = await Message.find({
      roomId: req.params.roomId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/conversations/:conversationId", async (req, res) => {
  try {
    console.log("Entering into message conversation")
    console.log(req.params.conversationId)
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    console.log('Room Messages ' + messages)
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
