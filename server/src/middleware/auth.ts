// responsible for handling authentication by verifying the JWT token in incoming requests from the client
// If the token is valid, the middleware will add the user object to the request object
// it ensures that the user is authenticated before accessing the protected routes
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define a custom interface that extends JwtPayload
interface CustomJwtPayload extends JwtPayload {
  username: string;
}

// Augment the express Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: CustomJwtPayload;
  }
}

// Middleware function to authenticate JWT tokens
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, return a 401 Unauthorized response
  if (token == null) {
    res.sendStatus(401);
    return;
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
    // If token verification fails, return a 403 Forbidden response
    if (err) {
      res.sendStatus(403);
      return;
    }
    // Attach the decoded user information to the request object
    req.user = user as CustomJwtPayload; // Use the custom interface
    // Pass control to the next middleware function or route handler
    next();
  });
};
