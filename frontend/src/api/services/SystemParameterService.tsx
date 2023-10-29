import { SystemParameter } from "@/types/SystemParamModels";
import { getConfiguredAxios } from "@/api/AxiosConfig";
import { httpResponse } from "@/types/httpResponse";

export class SystemParameterService {
  static async getSystemParameters() {
    const axios = getConfiguredAxios();
    return await axios.get<httpResponse<SystemParameter[]>>("systemparameters");
  }

  static async getSystemParameter(systemParameterId: number) {
    const axios = getConfiguredAxios();
    return await axios.get<httpResponse<SystemParameter>>(
      "/systemparameters/" + systemParameterId,
    );
  }

  static async createSystemParameter(systemParameter: SystemParameter) {
    const axios = getConfiguredAxios();
    return await axios.post<httpResponse<string>>(
      "/systemparameters",
      systemParameter,
    );
  }

  static async updateSystemParameter(
    systemParameterId: number,
    systemParameter: SystemParameter,
  ) {
    const axios = getConfiguredAxios();
    return await axios.put<httpResponse<string>>(
      "/systemparameters/" + systemParameterId,
      systemParameter,
    );
  }

  static async deleteSystemParameter(systemParameterId: number) {
    const axios = getConfiguredAxios();
    return await axios.delete<httpResponse<string>>(
      "/systemparameters/" + systemParameterId,
    );
  }
}
