import { Request, Response, NextFunction } from 'express'
import { UserDataServiceProvider } from "../services/userDataServiceProvider"
import { getUserAuthTokens } from '../helpers/authHelper'


const userDataServiceProvider = new UserDataServiceProvider()

export class UserController {

    public async signUp(req: Request, res: Response) {
        try {

            const signUpData = req.body
            const userData = await userDataServiceProvider.saveUser(signUpData)

            return res.status(200).json({
                success: true,
                message: "User Created successfully",
                data: userData,
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {

            const { email, password } = req.body

            const returnUserData: any = await userDataServiceProvider.login(email, password);
            const { token, refreshToken } = await getUserAuthTokens(returnUserData);

            const respData = {
                success: true,
                user_details: returnUserData,
                access_token: token,
                refresh_token: refreshToken,
                message: "User login success",
            };


            return res.status(200).json(respData);


        } catch (error) {

            return next(error);
        }
    }
}