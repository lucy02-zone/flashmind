const jwt = require("jsonwebtoken");

const protect = async (
  req,
  res,
  next
) => {

  console.log(
    "AUTH HEADER:",
    req.headers.authorization
  );

  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      req.user = {
        id: decoded.id
      };

      next();

    } else {

      return res.status(401).json({
        success: false,
        message: "Not authorized"
      });

    }

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });

  }

};

module.exports = protect;