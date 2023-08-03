import { ISystemParameter } from "../../Models/SystemParamModels";
import { getConfiguredAxios } from "../AxiosConfig";

export class SystemParameterService {
  static async getSystemParameters() {
    const axios = getConfiguredAxios();
    return await axios.get<ISystemParameter[]>(
      process.env.REACT_APP_REST_API_URL + "/systemparameters",
    );
  }

  static async getSystemParameter(systemParameterId: number) {
    const axios = getConfiguredAxios();
    return await axios.get<ISystemParameter>(
      process.env.REACT_APP_REST_API_URL +
        "/systemparameters/" +
        systemParameterId,
    );
  }

  static async createSystemParameter(systemParameter: ISystemParameter) {
    const axios = getConfiguredAxios();
    return await axios.post(
      process.env.REACT_APP_REST_API_URL + "/systemparameters",
      systemParameter,
    );
  }

  static async updateSystemParameter(
    systemParameterId: number,
    systemParameter: ISystemParameter,
  ) {
    const axios = getConfiguredAxios();
    return await axios.put(
      process.env.REACT_APP_REST_API_URL +
        "/systemparameters/" +
        systemParameterId,
      systemParameter,
    );
  }

  static async deleteSystemParameter(systemParameterId: number) {
    const axios = getConfiguredAxios();
    return await axios.delete(
      process.env.REACT_APP_REST_API_URL +
        "/systemparameters/" +
        systemParameterId,
    );
  }
}
