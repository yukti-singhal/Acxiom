const User = require('../models/User');
const Membership = require('../models/Membership');

exports.addUser = async (req, res) => {
  try {
    const { username, password, isAdmin, membershipType } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const membership = await Membership.findOne({ type: membershipType });
    if (!membership) {
      return res.status(400).json({ message: 'Invalid membership type' });
    }

    user = new User({
      username,
      password,
      isAdmin,
      membership: membership._id
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, membershipType } = req.body;

    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const membership = await Membership.findOne({ type: membershipType });
    if (!membership) {
      return res.status(400).json({ message: 'Invalid membership type' });
    }

    user.membership = membership._id;
    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};