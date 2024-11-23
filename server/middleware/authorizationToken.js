import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from the Authorization header

  if (!token) {
    console.log("token",token)
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    console.log("token==send by front end",token)
    console.log("JWT_SECRET from process.env.JWT_SECRET", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET||'2112c41503b68f3452961e600c2b9aee80f1e704fb88542d4a9f731e725b5995');
    console.log("decoded==",decoded)
    req.user = decoded; // Attach decoded token payload to request object
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    console.error("Error name:", error.name); // Provides specific error type
    return res.status(403).json({ message: 'Invalid token.' });
}
};

export default authenticateToken;
