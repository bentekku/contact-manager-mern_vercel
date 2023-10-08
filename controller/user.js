// const users = require("../data/data.json").users; // no longer needed as database is now being used
const Contact = require("../model/user").Contact;

// C R U D
// Create POST /
exports.create = async (req, res) => {
  try {
    const { firstName, lastName, maidenName, age, gender, phone, image } =
      req.body;
    const newContact = {
      firstName,
      lastName,
      maidenName,
      age,
      gender,
      phone,
      image,
    };
    const contact = new Contact({ ...newContact });
    //// METHOD 1 FOR ASYNC .SAVE()
    // (async () => {
    //   await contact.save();
    //   await console.log(contact);
    //   await res.status(201).json({ ans: contact });
    // })();
    await contact.save();
    await res.status(201).json({ ans: contact });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// Read GET /
exports.getAll = async (req, res) => {
  try {
    const contact = await Contact.find();
    await res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// Read GET /:id
exports.get = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findById({ _id: id });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// Update PUT /:id
exports.overwrite = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    await res
      .status(202)
      .json({ status: "overwritten the data", user: contact });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// Update PATCH /:id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    await res
      .status(202)
      .json({ status: "replaced only with the provided data", user: contact });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// Delete DELETE /:id
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findOneAndDelete({ _id: id });
    await res.status(202).json({ status: "entry removed", user: contact });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
