import { ISystemParameter } from "../../Models/SystemParamModels";
import { getConfiguredAxios } from "../AxiosConfig";

export class SystemParameterService {
  static async getSystemParameters() {
    const axios = getConfiguredAxios();
    return await axios.get<ISystemParameter[]>("systemparameters");
  }

  static async getSystemParameter(systemParameterId: number) {
    const axios = getConfiguredAxios();
    return await axios.get<ISystemParameter>(
      "/systemparameters/" + systemParameterId
    );
  }

  static async createSystemParameter(systemParameter: ISystemParameter) {
    const axios = getConfiguredAxios();
    return await axios.post("/systemparameters", systemParameter);
  }

  static async updateSystemParameter(
    systemParameterId: number,
    systemParameter: ISystemParameter
  ) {
    const axios = getConfiguredAxios();
    return await axios.put(
      "/systemparameters/" + systemParameterId,
      systemParameter
    );
  }

  static async deleteSystemParameter(systemParameterId: number) {
    const axios = getConfiguredAxios();
    return await axios.delete("/systemparameters/" + systemParameterId);
  }
}
