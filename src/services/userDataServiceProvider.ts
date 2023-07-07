import { UserModel } from "../model/user";
import bcrypt from "bcrypt"; 


const saltRounds=12
export class UserDataServiceProvider {

    public async saveUser(userData) {
        userData.password = await bcrypt.hash(userData.password, saltRounds);
        return await UserModel.create(userData)
    }

    async userById(userId) {
        return await  UserModel.findOne({ _id: userId })
    }

    async login(email: string, password: string) {
        let match = false;
        const userDetails = await UserModel.findOne({ email });
        if (userDetails) {
          match = await bcrypt.compare(password, userDetails.password);
        }
        return match ? userDetails : null;
      }
        
            
    
}