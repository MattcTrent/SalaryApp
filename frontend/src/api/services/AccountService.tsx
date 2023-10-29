import { AuthUser, ManageAuthUser, User } from "@/types/UserModels";
import { getConfiguredAxios } from "@/api/AxiosConfig";
import { httpResponse } from "@/types/httpResponse";

export class AccountService {
  static async authorizeUser(user: AuthUser, authURL: string) {
    const axios = getConfiguredAxios();
    const url = "/auth/" + authURL;
    return await axios.post<httpResponse<User>>(url, user);
  }

  static async loginOut() {
    const axios = getConfiguredAxios();
    const url = "/auth/logout";
    return await axios.post<httpResponse<string>>(url);
  }

  static async getUser(userId: number) {
    const axios = getConfiguredAxios();
    const url = "/users/" + userId;
    return await axios.get<httpResponse<User>>(url);
  }

  static async getUserByUsername(username: string) {
    const axios = getConfiguredAxios();
    const url = "/users/byUsername/" + username;
    return await axios.get<httpResponse<User>>(url);
  }

  static async updateUser(user: ManageAuthUser) {
    const axios = getConfiguredAxios();
    const url = "/users/" + user.id;
    return await axios.put<httpResponse<string>>(url, user);
  }
}
