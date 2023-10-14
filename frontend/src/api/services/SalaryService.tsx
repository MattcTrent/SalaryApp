import { Deduction, SalaryBreakdown } from "@/types/SalaryModels";
import { MessageResponse } from "@/types/UserModels";
import { getConfiguredAxios } from "@/api/AxiosConfig";

export class SalaryService {
  static async getSalaryBreakdown(userName: string) {
    const axios = getConfiguredAxios();
    const url = "/salarybreakdowns/" + userName;
    return await axios.get<SalaryBreakdown>(url);
  }

  static async getDeduction(deductionId: number) {
    const axios = getConfiguredAxios();
    const url = "/deductions/" + deductionId;
    return await axios.get<Deduction>(url);
  }

  static async getDeductions(userId: number) {
    const axios = getConfiguredAxios();
    const url = "/deductions/byUser/" + userId;
    return await axios.get<Deduction[]>(url);
  }

  static async createDeduction(deduction: Deduction) {
    const axios = getConfiguredAxios();
    const url = "/deductions";
    return await axios.post<Deduction>(url, deduction);
  }

  static async updateDeduction(deduction: Deduction) {
    const axios = getConfiguredAxios();
    const url = "/deductions/" + deduction.id;
    return await axios.put<MessageResponse>(url, deduction);
  }

  static async deleteDeduction(deductionId: number) {
    const axios = getConfiguredAxios();
    const url = "/deductions/" + deductionId;
    return await axios.delete<MessageResponse>(url);
  }
}
