import { Request, Response, NextFunction } from 'express'
import { UserDataServiceProvider } from "../services/userDataServiceProvider"
import { getUserAuthTokens } from '../helpers/authHelper'
import paginationHelper from '../helpers/paginationHelper';
import { TicketDataServiceProvider } from '../services/ticketDataServiceProvider';
import { S3DataServiceProvider } from '../services/s3DataServiceProvider';
import { v4 as uuidv4 } from 'uuid';


const userDataServiceProvider = new UserDataServiceProvider();
const ticketDataServiceProvider = new TicketDataServiceProvider();
const s3DataServiceProvider = new S3DataServiceProvider()

export class UserController {

    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {

            const signUpData = req.body;

            const existedEmail = await userDataServiceProvider.emailExists(signUpData.email);
            if (existedEmail) {
                return res.status(422).json({
                    success: false,
                    message: "Email Alread Exists"
                });
            }

            const userData = await userDataServiceProvider.saveUser(signUpData);

            return res.status(200).json({
                success: true,
                message: "User Created successfully",
                data: userData,
            });
        }
        catch (err) {
            return next(err)
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {

            const { email, password } = req.body;

            const returnUserData: any = await userDataServiceProvider.signin(email, password);
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

    public async getProfile(req: Request, res: Response) {
        try {

            let userDetails: any = await userDataServiceProvider.userById(req.user._id);

            const profile = {
                full_name: userDetails.full_name,
                email: userDetails.email,
                phone_number: userDetails.phone_number

            };

            return res.status(200).json({
                success: true,
                message: " Profile fetched successfully",
                data: profile,
            });
        } catch (error) {
            let respData = {
                success: false,
                message: error.message,
            };

            return res.status(error.statusCode || 500).json(respData);
        }
    }

    public async updateProfile(req: Request, res: Response,) {
        try {
            let profile = req.body;

            await userDataServiceProvider.updateUserById(req.user._id, profile);

            return res.status(200).json({
                success: true,
                message: "Profile updated successfully",
            });
        } catch (error) {
            let respData = {
                success: false,
                message: error.message,
            };
            return res.status(error.statusCode || 500).json(respData);
        }
    }

    public async addAgent(req: Request, res: Response, next: NextFunction) {
        try {

            const reqData = req.body;

            const existedEmail = await userDataServiceProvider.emailExists(reqData.email);
            if (existedEmail) {
                return res.status(422).json({
                    success: false,
                    message: "Email Alread Exists"
                });
            }

            const agentData = await userDataServiceProvider.saveAgent(reqData);

            return res.status(200).json({
                success: true,
                message: "Agent added successfully",
                data: agentData,
            });

        }
        catch (err) {
            return next(err)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            await userDataServiceProvider.delete(userId);

            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
            });
        }
        catch (err) {
            return next(err);
        }
    }

    public async listUsersByUserType(req: Request, res: Response, next: NextFunction) {
        try {
            const userType = req.query.user_type
            const { skip, limit, sort } = req.params;
            const query = {
                user_type: { $eq: userType }
            };

            const [users, count] = await Promise.all([
                userDataServiceProvider.getAll({
                    query, skip, limit, sort
                }),
                userDataServiceProvider.countAll({
                    query
                })
            ])
            const response = paginationHelper.getPaginationResponse({
                page: req.query.page || 1,
                count,
                limit,
                skip,
                data: users,
                message: "Users fetched successfully",
                searchString: req.query.search_string,
            });
            return res.status(200).json(response);
        }
        catch (err) {
            return next(err)
        }
    }



    public async getSignedUrl(req: Request, res: Response, next: NextFunction) {
        try {

            const fileName = `${uuidv4()}_${req.body.file}`;
            if (!fileName) {
                return res.status(400).json({ message: "No file provided" });
            }
            const filePath = "Ticket-Proofs";
            const uploadUrl = await s3DataServiceProvider.getPreSignedUrl(fileName, 'put', filePath)



            let data = {
                "upload_url": uploadUrl,
            };
            return res.status(200).json({
                success: true,
                message: "Successfully generated pre-signed url",
                data
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}