const router = require("express").Router();

const { User, validate } = require("../models/user");
const Contract = require("../models/contract");

const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exist" });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({
      ...req.body,
      password: hashPassword,
      services: {
        laundress: {
          description: "",
          location: "",
          labor: 0,
          rating: 0,
          active: false,
        },
        babysitter: {
          description: "",
          location: "",
          labor: 0,
          rating: 0,
          active: false,
        },
        cleaner: {
          description: "",
          location: "",
          labor: 0,
          rating: 0,
          active: false,
        },
      },
    }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});
router.get("/", async (req, res) => {
  User.find().then((data) => res.send(data));
});
router.get("/:email", async (req, res) => {
  User.findOne({ email: req.params.email }).then((data) => res.send(data));
});
router.get("/:id", async (req, res) => {
  await User.findById(req.params.id).then((data) => res.send(data));
});
// IF THE USER WILL CREATE A JOB POST ABOUT LAUNDRESS
router.put("/laundress-input/:email", async (req, res) => {
  User.findOne({ email: req.params.email })
    .then((data) => {
      const laundress = data.services.laundress;
      laundress.description = req.body.description;
      laundress.location = req.body.location;
      laundress.labor = req.body.labor;
      data
        .save()
        .then(() => res.json("laundress input updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
// IF THE USER WILL CREATE A JOB POST ABOUT BABYSITTER
router.put("/babysitter-input/:email", async (req, res) => {
  User.findOne({ email: req.params.email })
    .then((data) => {
      const babysitter = data.services.babysitter;
      babysitter.description = req.body.description;
      babysitter.location = req.body.location;
      babysitter.labor = req.body.labor;
      data
        .save()
        .then(() => res.json("babysitter input updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
}); // IF THE USER WILL CREATE A JOB POST ABOUT CLEANER
router.put("/cleaner-input/:email", async (req, res) => {
  User.findOne({ email: req.params.email })
    .then((data) => {
      const cleaner = data.services.cleaner;
      console.log(cleaner);
      cleaner.description = req.body.description;
      cleaner.location = req.body.location;
      cleaner.labor = req.body.labor;
      data
        .save()
        .then(() => res.json("cleaner input updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
// ACTIVATE OR DEACTIVATE SERVICE STATUS
router.put("/activate-laundress/:email", async (req, res) => {
  User.findOne({ email: req.params.email })
    .then((data) => {
      const laundress = data.services.laundress;
      laundress.active = req.body.active;
      data
        .save()
        .then(() => res.json("laundress status updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.put("/activate-babysitter/:email", async (req, res) => {
  User.findOne({ email: req.params.email })
    .then((data) => {
      const babysitter = data.services.babysitter;
      babysitter.active = req.body.active;
      data
        .save()
        .then(() => res.json("babysitter status updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.put("/activate-cleaner/:email", async (req, res) => {
  User.findOne({ email: req.params.email })
    .then((data) => {
      const cleaner = data.services.cleaner;
      cleaner.active = req.body.active;
      data
        .save()
        .then(() => res.json("cleaner status updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//RECRUITER DASHBORD BE
router.get("/recruiter-dashboard/:id", async (req, res) => {
  try {
    Contract.find({ recruiterId: { $eq: req.params.id } })
      .populate("freelancerId")
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.log(err);
  }
});
router.delete("/:id", async (req, res) => {
  Contract.deleteOne({ _id: req.params.id }).then((data) => {
    data.deletedCount === 1
      ? res.send({ message: "Booking deleted!" })
      : (res.status(400),
        res.send({
          error: `Booking with id: ${req.params.id} does not exist!`,
        }));
  });
});

// FREELANCER DASHBOARD BE
router.get("/freelancer-dashboard/:id", async (req, res) => {
  try {
    Contract.find({ freelancerId: { $eq: req.params.id } })
      .populate("recruiterId")
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.log(err);
  }
    
});

module.exports = router;
