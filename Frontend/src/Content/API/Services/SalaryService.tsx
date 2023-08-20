import { Deduction, SalaryBreakdown } from "../../Models/SalaryModels";
import { IMessageResponse } from "../../Models/UserModels";
import { getConfiguredAxios } from "../AxiosConfig";

export class SalaryService {
  static async getSalaryBreakdown(userName: string) {
    const axios = getConfiguredAxios();
    var url = "/salarybreakdowns/" + userName;
    return await axios.get<SalaryBreakdown>(url);
  }

  static async getDeduction(deductionId: number) {
    const axios = getConfiguredAxios();
    var url = "/deductions/" + deductionId;
    return await axios.get<Deduction>(url);
  }

  static async getDeductions(userId: number) {
    const axios = getConfiguredAxios();
    var url = "/deductions/byUser/" + userId;
    return await axios.get<Deduction[]>(url);
  }

  static async createDeduction(deduction: Deduction) {
    const axios = getConfiguredAxios();
    var url = "/deductions";
    return await axios.post<Deduction>(url, deduction);
  }

  static async updateDeduction(deduction: Deduction) {
    const axios = getConfiguredAxios();
    var url = "/deductions/" + deduction.id;
    return await axios.put<IMessageResponse>(url, deduction);
  }

  static async deleteDeduction(deductionId: number) {
    const axios = getConfiguredAxios();
    var url = "/deductions/" + deductionId;
    return await axios.delete<IMessageResponse>(url);
  }
}
