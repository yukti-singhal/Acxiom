const Membership = require('../models/Membership');

exports.getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addMembership = async (req, res) => {
  try {
    const { type, maxBooks, duration, fineRate } = req.body;
    const newMembership = new Membership({
      type,
      maxBooks,
      duration,
      fineRate
    });
    await newMembership.save();
    res.status(201).json(newMembership);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateMembership = async (req, res) => {
  try {
    const { type, maxBooks, duration, fineRate } = req.body;
    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      { type, maxBooks, duration, fineRate },
      { new: true }
    );
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }
    res.json(membership);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};