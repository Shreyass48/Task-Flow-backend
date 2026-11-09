const { registerUser, loginUser } = require("../services/auth-service");

module.exports.register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.cookie("token", user.token);

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "user",
      },
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports.login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    res.cookie("token", result.token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { email: result.email },
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.cookie("token", "");
    res.json({ msg: "Logout Successful" });
  } catch (error) {
    res.send(error.message);
  }
};
