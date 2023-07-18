import { UserModel } from "../model/user";
import bcrypt from "bcrypt";


const saltRounds = 12
export class UserDataServiceProvider {

  async saveUser(userData) {
    userData.password = await bcrypt.hash(userData.password, saltRounds);
    return await UserModel.create(userData)
  }

  async userById(userId) {
    return await UserModel.findById({ _id: userId })
  }
  async userByEmail(email) {
    return await UserModel.findOne({ email })
  }
  async login(email: string, password: string) {
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

  // async phoneExists(phone) {
  //   return await UserModel.findOne({phone_number:phone})
  // }

  async updateUserById(userId, data) {
    return await UserModel.findByIdAndUpdate({ _id: userId }, { $set: data });
  }

  async getAll({ query = {}, skip = null, limit = null, sort = {}, projection = {}, lean = false }) {
    if (query && query['user_type'].$eq === undefined) {
      query = {}
    }

    if (lean) {
      return UserModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection).lean()
    }
    return UserModel.find(query).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit).select(projection)
  }

  async countAll({ query = {} }) {
    if (query && query['user_type'].$eq === undefined) {
      query = {}
    }
    return UserModel.countDocuments(query)
  }

  async delete(userId) {
    return await UserModel.deleteOne({ _id: userId })
  }

}
