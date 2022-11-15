import User from "../database/models/User.mode";

export default class UserService {
  async getUserByUsername(username: string) {
    const user = await User.findOne({ where: { username }})
    return user
  }
}
