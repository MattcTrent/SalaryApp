import { SystemParameter } from "@/types/SystemParamModels";
import { getConfiguredAxios } from "@/API/AxiosConfig";

export class SystemParameterService {
  static async getSystemParameters() {
    const axios = getConfiguredAxios();
    return await axios.get<SystemParameter[]>("systemparameters");
  }

  static async getSystemParameter(systemParameterId: number) {
    const axios = getConfiguredAxios();
    return await axios.get<SystemParameter>(
      "/systemparameters/" + systemParameterId,
    );
  }

  static async createSystemParameter(systemParameter: SystemParameter) {
    const axios = getConfiguredAxios();
    return await axios.post("/systemparameters", systemParameter);
  }

  static async updateSystemParameter(
    systemParameterId: number,
    systemParameter: SystemParameter,
  ) {
    const axios = getConfiguredAxios();
    return await axios.put(
      "/systemparameters/" + systemParameterId,
      systemParameter,
    );
  }

  static async deleteSystemParameter(systemParameterId: number) {
    const axios = getConfiguredAxios();
    return await axios.delete("/systemparameters/" + systemParameterId);
  }
}
