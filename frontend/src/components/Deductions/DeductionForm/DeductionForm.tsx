import {
  ActionFunction,
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import SelectInput from "@/components/UI/Input/SelectInput/SelectInput";
import StringInput from "@/components/UI/Input/StringInput/StringInput";
import CurrencyInput from "@/components/UI/Input/CurrencyInput/CurrencyInput";
import Button from "@/components/UI/Button/Button";
import Navigation from "@/components/UI/NavigationLinks/Navigation";
import { Deduction } from "@/types/SalaryModels";
import { getAuthUserId } from "@/utils/AuthUtils";
import { toast } from "react-toastify";
import { SalaryService } from "@/api/services/SalaryService";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { DeductionType, DeductionTypes } from "@/enums/DeductionType";
import { BillTypes } from "@/enums/BillType";
import { SavingTypes } from "@/enums/SavingsType";

import styles from "./DeductionForm.module.scss";
import { httpResponse } from "@/types/httpResponse";

interface DeductionFormProps {
  loadedDeduction: Deduction | null;
  method: "post" | "put";
}

export default function DeductionForm(props: DeductionFormProps) {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const billType = searchParams.get("billType");
  const savingType = searchParams.get("savingType");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitData: any = useActionData();
  const submit = useSubmit();
  const [deductionType, setDeductionType] = useState<string>(
    props.loadedDeduction?.type || type || "",
  );

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, {
        action: `/SalaryBreakdown/DeleteDeduction/${props.loadedDeduction?.id}`,
        method: "delete",
      });
    }
  }

  function typeChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    setDeductionType(event.target.value);
  }

  return (
    <Form className={styles.form} method={props.method}>
      <h1 className={styles.formTitle}>
        {props.loadedDeduction
          ? `Edit ${props.loadedDeduction.name}`
          : "Create New"}{" "}
        Salary Deduction
      </h1>
      <div className={styles.inputForm}>
        {props.loadedDeduction && (
          <div className={styles.hidden}>
            <StringInput
              id="inpId"
              name="id"
              type="text"
              readOnly={isSubmitting}
              defaultValue={props.loadedDeduction.id.toString()}
            >
              ID
            </StringInput>
          </div>
        )}
        <SelectInput
          id="inptype"
          name="type"
          values={DeductionTypes}
          readOnly={isSubmitting}
          validationMessage={submitData?.type ?? undefined}
          required={true}
          onChange={typeChangeHandler}
          defaultValue={props.loadedDeduction?.type || type || ""}
        >
          Type
        </SelectInput>
        {deductionType === DeductionType.BILL && (
          <SelectInput
            id="inpbillType"
            name="billType"
            values={BillTypes}
            readOnly={isSubmitting}
            validationMessage={submitData?.billType ?? undefined}
            required={true}
            defaultValue={props.loadedDeduction?.billType || billType || ""}
          >
            Bill Type
          </SelectInput>
        )}
        {deductionType === DeductionType.SAVING_AND_INVESTMENT && (
          <SelectInput
            id="inpSavingType"
            name="savingType"
            values={SavingTypes}
            readOnly={isSubmitting}
            validationMessage={submitData?.savingType ?? undefined}
            required={true}
            defaultValue={props.loadedDeduction?.savingType || savingType || ""}
          >
            Saving Type
          </SelectInput>
        )}
        <StringInput
          id="inpname"
          name="name"
          type="text"
          readOnly={isSubmitting}
          validationMessage={submitData?.name ?? undefined}
          required={true}
          defaultValue={props.loadedDeduction?.name}
        >
          Name
        </StringInput>
        <CurrencyInput
          id="inpCost"
          name="cost"
          type="number"
          readOnly={isSubmitting}
          validationMessage={submitData?.cost ?? undefined}
          required={true}
          defaultValue={props.loadedDeduction?.cost}
        >
          Cost
        </CurrencyInput>
      </div>
      <div className={styles.actionBar}>
        <Navigation
          classNameAddition={styles.navButton}
          isButton={true}
          path="/SalaryBreakdown"
        >
          Cancel
        </Navigation>
        <Button colourStyle="positive" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        {props.loadedDeduction && (
          <Button
            colourStyle="negative"
            type="button"
            disabled={isSubmitting}
            onClick={startDeleteHandler}
          >
            Delete
          </Button>
        )}
      </div>
    </Form>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "";
  const userId = getAuthUserId();

  if (!userId) {
    throw json({ message: "Could not retrieve username" }, { status: 500 });
  }

  if (mode !== "create" && mode !== "edit") {
    throw json({ message: "unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();

  const id = data.get("id");
  const cost = data.get("cost");

  const deduction: Deduction = {
    id: id ? +id : 0,
    user: null,
    createdById: userId,
    type: data.get("type")?.toString() ?? "",
    billType: data.get("billType")?.toString() ?? null,
    savingType: data.get("savingType")?.toString() ?? null,
    name: data.get("name")?.toString() ?? "",
    cost: cost ? +cost : 0,
  };

  const { validated, validation } = validateDeduction(deduction);
  if (!validated) {
    return validation;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let response: AxiosResponse<httpResponse<string>, any>;
    if (mode === "create") {
      response = await SalaryService.createDeduction(deduction);
    } else {
      response = await SalaryService.updateDeduction(deduction);
    }

    if (response.status !== 200 && response.status !== 201) {
      throw json(
        { message: `could not ${mode} deduction` },
        { status: response.status },
      );
    }

    return redirect("/SalaryBreakdown");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
};

interface ValidationErrors {
  type: string | null;
  billType: string | null;
  savingType: string | null;
  name: string | null;
  cost: string | null;
}

function validateDeduction(deduction: Deduction): {
  validated: boolean;
  validation: ValidationErrors;
} {
  const validation: ValidationErrors = {
    type: null,
    billType: null,
    savingType: null,
    name: null,
    cost: null,
  };
  const validated: boolean = true;

  if (deduction.type === "") {
    validation.type = "A type is required";
  }

  if (deduction.type === DeductionType.BILL && deduction.billType === "") {
    validation.billType = "A bill type is required";
  }

  if (
    deduction.type === DeductionType.SAVING_AND_INVESTMENT &&
    deduction.savingType === ""
  ) {
    validation.savingType = "A saving type is required";
  }

  if (deduction.type === "") {
    validation.type = "A name is required";
  }

  if (deduction.cost === 0) {
    validation.cost = "A cost is required";
  }

  return {
    validated,
    validation,
  };
}

export const deleteAction: ActionFunction = async ({ params }) => {
  const deductionId = params.deductionId;
  if (!deductionId || +deductionId <= 0) {
    throw json({ message: "No Id" }, { status: 500 });
  }

  try {
    const response = await SalaryService.deleteDeduction(+deductionId);

    if (response.status !== 200 && response.status !== 201) {
      throw json(
        { message: `could not delete deduction` },
        { status: response.status },
      );
    }

    return redirect("/SalaryBreakdown");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
};
