import { UserModel } from "../model/user";
import bcrypt from "bcrypt";


const saltRounds = 12
export class UserDataServiceProvider {

  async saveUser(userData) {
    userData.password = await bcrypt.hash(userData.password, saltRounds);
    return await UserModel.create(userData)
  }

  async userById(userId) {
    return await UserModel.findOne({ _id: userId })
  }

  async signin(email: string, password: string) {
    let match = false;
    const userDetails = await UserModel.findOne({ email });
    if (userDetails) {
      match = await bcrypt.compare(password, userDetails.password);
    }
    return match ? userDetails : null;
  }

  async saveAgent(agentData) {
    agentData.password = await bcrypt.hash(agentData.password, saltRounds);
    return await UserModel.create(agentData)
  }

  async emailExists(email) {  
    return await UserModel.findOne({ email: email })
  }

  async updateUserById(userId, data) {
    return UserModel.updateOne({ _id: userId }, { $set: data });
  }

  async getAll({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false }) {
    if (lean) {
      return UserModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection).lean()
    }
    return UserModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection)
  }

  async countAll({ query = {} }) {
    return UserModel.countDocuments(query)
  }

  async delete(userId) {
    return UserModel.deleteOne({ _id: userId })
  }
  
}
