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
import styles from "./DeductionForm.module.scss";
import SelectInput from "../../UI/Input/SelectInput/SelectInput";
import StringInput from "../../UI/Input/StringInput/StringInput";
import CurrencyInput from "../../UI/Input/CurrencyInput/CurrencyInput";
import Button from "../../UI/Button/Button";
import Navigation from "../../UI/NavigationLinks/Navigation";
import { Deduction } from "../../../Models/SalaryModels";
import { getAuthUserId } from "../../../Utils/AuthUtils";
import { toast } from "react-toastify";
import { SalaryService } from "../../../API/Services/SalaryService";
import { MessageResponse } from "../../../Models/UserModels";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { DeductionType, DeductionTypes } from "../../../Enums/DeductionType";
import { BillTypes } from "../../../Enums/BillType";
import { SavingTypes } from "../../../Enums/SavingsType";

interface DeductionFormProps {
  loadedDeduction: Deduction | null;
  method: any;
}

export default function DeductionForm(props: DeductionFormProps) {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const billType = searchParams.get("billType");
  const savingType = searchParams.get("savingType");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const submitData: any = useActionData();
  const submit = useSubmit();
  const [deductionType, setDeductionType] = useState<string>(
    props.loadedDeduction?.type || type || ""
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

export const action: ActionFunction = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "";
  let userId = getAuthUserId();

  if (!userId) {
    throw json({ message: "Could not retrieve username" }, { status: 500 });
  }

  if (mode !== "create" && mode !== "edit") {
    throw json({ message: "unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();

  let id = data.get("id");
  let cost = data.get("cost");

  let deduction: Deduction;
  deduction = {
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
    let response: any = null;
    if (mode === "create") {
      response = await SalaryService.createDeduction(deduction);
    } else {
      response = await SalaryService.updateDeduction(deduction);
    }

    if (response.status !== 200 && response.status !== 201) {
      throw json(
        { message: `could not ${mode} deduction` },
        { status: response.status }
      );
    }

    return redirect("/SalaryBreakdown");
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      toast.error(
        "Network Error: There has been an error communicating with the server."
      );
      return null;
    }
    if (error.response?.status === 400) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.response.data.message);
      }
    } else {
      throw json(
        { message: "could not submit deduction" },
        { status: error.response.status }
      );
    }
    return null;
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
  let validation: ValidationErrors = {
    type: null,
    billType: null,
    savingType: null,
    name: null,
    cost: null,
  };
  let validated: boolean = true;

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

export const deleteAction: ActionFunction = async ({ request, params }) => {
  const deductionId = params.deductionId;
  if (!deductionId || +deductionId <= 0) {
    throw json({ message: "No Id" }, { status: 500 });
  }

  try {
    const response: AxiosResponse<MessageResponse, any> =
      await SalaryService.deleteDeduction(+deductionId);

    if (response.status !== 200 && response.status !== 201) {
      throw json(
        { message: `could not delete deduction` },
        { status: response.status }
      );
    }

    return redirect("/SalaryBreakdown");
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      toast.error(
        "Network Error: There has been an error communicating with the server."
      );
      return null;
    }
    if (error.response?.status === 400) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.response.data.message);
      }
    } else {
      throw json(
        { message: "could not delete deduction" },
        { status: error.response.status }
      );
    }
    return null;
  }
};
