import { SystemParameterTable } from "@/components/SystemParameters/SystemParameterTable";
import styles from "./SystemParameters.module.scss";
import { Await, json, useLoaderData } from "react-router-dom";
import { SystemParameterService } from "@/api/services/SystemParameterService";
import { Suspense } from "react";
import { parameterActions } from "@/redux/slices/SystemParameterSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/Store";
import { SystemParameter } from "@/types/SystemParamModels";

export function SystemParametersPage() {
  const data: SystemParameter[] = useLoaderData() as SystemParameter[];
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Suspense fallback={<p>Loading Deductions...</p>}>
        <Await resolve={data}>
          {(data) => {
            dispatch(parameterActions.setSystemParameters(data));
            return <SystemParameterTable />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
export async function loader() {
  try {
    const response = await SystemParameterService.getSystemParameters();
    if (response.data) {
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw json({ message: error.message }, { status: 404 });
    }
  }
}
