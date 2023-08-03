import {
  ILoginResponse,
  IMessageResponse,
  IUserDetails,
  IAuthUser,
  IManageAuthUser,
} from "../../Models/UserModels";
import { getConfiguredAxios } from "../AxiosConfig";

export class AccountService {
  static async authorizeUser(user: IAuthUser, authURL: string) {
    const axios = getConfiguredAxios();
    var url = "/auth/" + authURL;
    return await axios.post<ILoginResponse>(url, user);
  }

  static async loginOut() {
    const axios = getConfiguredAxios();
    var url = "/auth/logout";
    return await axios.post<IMessageResponse>(url);
  }

  static async getUser(userId: number) {
    const axios = getConfiguredAxios();
    var url = "/users/" + userId;
    return await axios.get<IUserDetails>(url);
  }

  static async getUserByUsername(username: string) {
    const axios = getConfiguredAxios();
    var url = "/users/byUsername/" + username;
    return await axios.get<IUserDetails>(url);
  }

  static async updateUser(user: IManageAuthUser) {
    const axios = getConfiguredAxios();
    var url = "/users/" + user.id;
    return await axios.put<IMessageResponse>(url, user);
  }
}
