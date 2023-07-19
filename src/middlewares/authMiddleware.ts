import { UserDataServiceProvider } from "../services/userDataServiceProvider";
import jwt from 'jsonwebtoken'

const userDataServiceProvider = new UserDataServiceProvider()

export class AuthMiddleware {

  public async validateAccessToken(req, res, next) {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        const respData = {
          success: false,
          message: "No Authorization Token",
        };
        return res.status(403).json(respData);
      }

      // Decode JWT received via Header
      const userDetails = jwt.decode(accessToken);

      // Fetch User From DB
      const user: any = await userDataServiceProvider.userById(
        userDetails.id
      );
      // if (userDetails.user_type !== 'USER') {
      //   const respData = {
      //     success: false,
      //     message: "Invalid user type",
      //   };
      //   return res.status(403).json(respData);
      // }

      const tokenSecret = process.env.JWT_SECRET + user.password;

      try {
        // Verify JWT
        jwt.verify(accessToken, tokenSecret);

        // Add User to the Request Payload
        req.user = user;
        next();
      } catch (error) {
        let respData = {
          success: false,
          message: error.message,
          error: error,
        };
        return res.status(401).json(respData);
      }
    } catch (error) {
      let respData = {
        success: false,
        message: "Invalid Access Token",
      };
      return res.status(401).json(respData);
    }
  }

  public async validateAccessTokenForAdmin(req, res, next) {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        const respData = {
          success: false,
          message: "No Authorization Token",
        };
        return res.status(403).json(respData);
      }

      // Decode JWT received via Header
      const userDetails = jwt.decode(accessToken);

      // Fetch User From DB
      const user: any = await userDataServiceProvider.userById(
        userDetails.id
      );

      if (userDetails.user_type !== 'ADMIN') {
        const respData = {
          success: false,
          message: "Invalid user type",
        };
        return res.status(403).json(respData);
      }

      const tokenSecret = process.env.JWT_SECRET + user.password;

      try {
        // Verify JWT
        jwt.verify(accessToken, tokenSecret);

        // Add User to the Request Payload
        req.user = user;
        next();
      } catch (error) {
        let respData = {
          success: false,
          message: error.message,
          error: error,
        };
        return res.status(401).json(respData);
      }
    } catch (error) {
      let respData = {
        success: false,
        message: "Invalid Access Token",
      };
      return res.status(401).json(respData);
    }
  }

  public async validateAccessTokenForAgent(req, res, next) {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        const respData = {
          success: false,
          message: "No Authorization Token",
        };
        return res.status(403).json(respData);
      }

      // Decode JWT received via Header
      const userDetails = jwt.decode(accessToken);

      // Fetch User From DB
      const user: any = await userDataServiceProvider.userById(
        userDetails.id
      );

      if (userDetails.user_type !== 'AGENT') {
        const respData = {
          success: false,
          message: "Invalid user type",
        };
        return res.status(403).json(respData);
      }

      const tokenSecret = process.env.JWT_SECRET + user.password;

      try {
        // Verify JWT
        jwt.verify(accessToken, tokenSecret);

        // Add User to the Request Payload
        req.user = user;
        next();
      } catch (error) {
        let respData = {
          success: false,
          message: error.message,
          error: error,
        };
        return res.status(401).json(respData);
      }
    } catch (error) {
      let respData = {
        success: false,
        message: "Invalid Access Token",
      };
      return res.status(401).json(respData);
    }
  }
}

