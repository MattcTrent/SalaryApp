import { Deduction, SalaryBreakdown } from "@/types/SalaryModels";
import { getConfiguredAxios } from "@/api/AxiosConfig";
import { httpResponse } from "@/types/httpResponse";

export class SalaryService {
  static async getSalaryBreakdown(userName: string) {
    const axios = getConfiguredAxios();
    const url = "/salarybreakdowns/" + userName;
    return await axios.get<httpResponse<SalaryBreakdown>>(url);
  }

  static async getDeduction(deductionId: number) {
    const axios = getConfiguredAxios();
    const url = "/deductions/" + deductionId;
    return await axios.get<httpResponse<Deduction>>(url);
  }

  static async getDeductions(userId: number) {
    const axios = getConfiguredAxios();
    const url = "/deductions/byUser/" + userId;
    return await axios.get<httpResponse<Deduction[]>>(url);
  }

  static async createDeduction(deduction: Deduction) {
    const axios = getConfiguredAxios();
    const url = "/deductions";
    return await axios.post<httpResponse<string>>(url, deduction);
  }

  static async updateDeduction(deduction: Deduction) {
    const axios = getConfiguredAxios();
    const url = "/deductions/" + deduction.id;
    return await axios.put<httpResponse<string>>(url, deduction);
  }

  static async deleteDeduction(deductionId: number) {
    const axios = getConfiguredAxios();
    const url = "/deductions/" + deductionId;
    return await axios.delete<httpResponse<string>>(url);
  }
}
