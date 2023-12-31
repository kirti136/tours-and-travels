const validateRegistrationCredentials = (req, res, next) => {
  const { username, email, password, dateOfBirth } = req.body;

  const usernameRegex = /^[a-zA-Z0-9_.]+$/;
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/;
  const passwordMinLength = 6; 
  const usernameMinLength = 6;

  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }

  if (!username.match(usernameRegex)) {
    return res.status(400).json({
      message:
        "Invalid username format. It should contain lowercase, uppercase, or underscore characters only.",
    });
  }

  if (username.length < usernameMinLength) {
    return res.status(400).json({
      message: `Username should be at least ${usernameMinLength} characters long.`,
    });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  if (!email.match(emailRegex)) {
    return res.status(400).json({
      message:
        'Invalid email format. It should be alphanumeric characters followed by "@" and a valid domain.',
    });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

  if (password.length < passwordMinLength) {
    return res.status(400).json({
      message: `Password should be at least ${passwordMinLength} characters long.`,
    });
  }

  if (!dateOfBirth) {
    return res.status(400).json({ message: "Date of birth is required." });
  }

  const dateOfBirthRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateOfBirth.match(dateOfBirthRegex)) {
    return res
      .status(400)
      .json({ message: 'Date of birth should be in the "DD/MM/YYYY" format.' });
  }

  //  DateOfBirth validation
  const [day, month, year] = dateOfBirth.split("/");
  const currentYear = new Date().getFullYear();
  if (
    parseInt(day, 10) > 31 ||
    parseInt(month, 10) > 12 ||
    parseInt(year, 10) > currentYear
  ) {
    return res.status(400).json({
      message: "Invalid date of birth. Check day, month, and year values.",
    });
  }

  // If all checks pass, move to the next middleware
  next();
};

module.exports = { validateRegistrationCredentials };
