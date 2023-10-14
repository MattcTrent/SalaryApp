import {
  LoginResponse,
  MessageResponse,
  UserDetails,
  AuthUser,
  ManageAuthUser,
} from "@/types/UserModels";
import { getConfiguredAxios } from "@/api/AxiosConfig";

export class AccountService {
  static async authorizeUser(user: AuthUser, authURL: string) {
    const axios = getConfiguredAxios();
    const url = "/auth/" + authURL;
    return await axios.post<LoginResponse>(url, user);
  }

  static async loginOut() {
    const axios = getConfiguredAxios();
    const url = "/auth/logout";
    return await axios.post<MessageResponse>(url);
  }

  static async getUser(userId: number) {
    const axios = getConfiguredAxios();
    const url = "/users/" + userId;
    return await axios.get<UserDetails>(url);
  }

  static async getUserByUsername(username: string) {
    const axios = getConfiguredAxios();
    const url = "/users/byUsername/" + username;
    return await axios.get<UserDetails>(url);
  }

  static async updateUser(user: ManageAuthUser) {
    const axios = getConfiguredAxios();
    const url = "/users/" + user.id;
    return await axios.put<MessageResponse>(url, user);
  }
}
