import React from "react";
import { SystemParameterService } from "../../../API/Services/SystemParameterService";
import { toast } from "react-toastify";
import Button from "../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { parameterActions } from "../../../../Redux/Slices/SystemParameterSlice";
import styles from "./SystemParamModal.module.css";
import StringInput from "../../UI/Input/StringInput/StringInput";
import CurrencyInput from "../../UI/Input/CurrencyInput/CurrencyInput";
import PercentageInput from "../../UI/Input/PercentageInput/PercentageInput";
import SelectInput from "../../UI/Input/SelectInput/SelectInput";
import { RootState } from "../../../../Redux/Reducers/RootReducer";
import { SystemParameterGroups } from "../../../Enums/SystemParameterGroup";

interface confirmModalProps {
  modalAction: string;
  onClose: () => void;
}

export default function SystemParamModal(props: confirmModalProps) {
  const systemParamState = useSelector(
    (state: RootState) => state.systemParameters.SelectedSystemParameter
  );
  const dispatch: any = useDispatch();

  const onClick = (action: string, systemParamId: number | null) => {
    if (action === "cancel") {
      props.onClose();
    } else if (!PassValidation()) {
      if (action === "delete" && systemParamId != null) {
        SystemParameterService.deleteSystemParameter(systemParamId).then(
          (response) => {
            if (response.data.success) {
              toast.success(response.data.message);
            }
          }
        );
      } else if (action === "edit" && systemParamId != null) {
        SystemParameterService.updateSystemParameter(
          systemParamId,
          systemParamState
        ).then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
          }
        });
      } else if (action === "create") {
        SystemParameterService.createSystemParameter(systemParamState).then(
          (response) => {
            if (response.data.id > 0) {
              toast.success("System parameter created.");
            }
          }
        );
      }

      props.onClose();
    }
  };

  const PassValidation = () => {
    let error = false;
    let message = "";
    if (
      systemParamState.parameterGroup == null ||
      systemParamState.parameterGroup === ""
    ) {
      error = true;
      message += "Group, ";
    }
    if (systemParamState.name == null || systemParamState.name === "") {
      error = true;
      message += "Name, ";
    }

    if (
      systemParamState.rate == null &&
      systemParamState.lowerThreshold == null &&
      systemParamState.upperThreshold == null
    ) {
      error = true;
      message += "At least one Rate or Threshold is required. ";
    }

    if (message !== "") {
      toast.error("Require Properies: \n" + message);
    }
    return error;
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    switch (event.target.name) {
      case "group":
        dispatch(parameterActions.setGroup(event.target.value));
        break;
      case "name":
        dispatch(parameterActions.setName(event.target.value));
        break;
      case "rate":
        dispatch(parameterActions.setRate(+event.target.value));
        break;
      case "lowerThreshold":
        dispatch(parameterActions.setLowerThreshold(+event.target.value));
        break;
      case "upperThreshold":
        dispatch(parameterActions.setUpperThreshold(+event.target.value));
        break;
      default:
    }
  };

  return (
    <div className={styles.modalContainer}>
      {props.modalAction === "delete" ? (
        <div className={styles.deleteContainer}>
          <h2 id="modal-title">
            Delete System Parameter "{systemParamState.name},{" "}
            {systemParamState.parameterGroup} "
          </h2>
          <p>Are you sure you want to delete this parameter?</p>
          <div className={styles.horiDiv}>
            <Button
              type="button"
              onClick={onClick.bind(null, "delete", systemParamState.id)}
            >
              Delete
            </Button>
            <Button type="button" onClick={onClick.bind(null, "cancel", null)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.formInputContainer}>
          <h2>
            {props.modalAction.charAt(0).toUpperCase() +
              props.modalAction.slice(1).toLowerCase() ?? null}{" "}
            System Parameter
            {props.modalAction === "edit" &&
              ' "' +
                systemParamState.name +
                ", " +
                systemParamState.parameterGroup +
                '"'}
          </h2>
          <SelectInput
            id="inpGroup"
            name="group"
            onChange={handleChange}
            value={systemParamState.parameterGroup}
            values={SystemParameterGroups}
            //readOnly={props.isSubmitting}
          >
            Group
          </SelectInput>
          <StringInput
            id="inpName"
            name="name"
            type="text"
            onChange={handleChange}
            value={systemParamState.name}
            //readOnly={(props.user === null ? false : true) || props.isSubmitting}
          >
            Name
          </StringInput>
          <PercentageInput
            id="inpRate"
            name="rate"
            type="number"
            onChange={handleChange}
            value={systemParamState.rate}
            //readOnly={props.isSubmitting}
            //validationMessage={data?.pensionpercent ?? undefined}
          >
            Rate
          </PercentageInput>
          <CurrencyInput
            id="inpLowerThreshold"
            name="lowerThreshold"
            type="number"
            onChange={handleChange}
            value={systemParamState.lowerThreshold}
            //readOnly={props.isSubmitting}
            //validationMessage={data?.salary ?? undefined}
          >
            Lower Threshold
          </CurrencyInput>
          <CurrencyInput
            id="inpUpperThreshold"
            name="upperThreshold"
            type="number"
            onChange={handleChange}
            value={systemParamState.upperThreshold}
            //readOnly={props.isSubmitting}
            //validationMessage={data?.salary ?? undefined}
          >
            Upper Threshold
          </CurrencyInput>

          <div className={styles.horiDiv}>
            <Button
              type="button"
              onClick={onClick.bind(
                null,
                props.modalAction,
                systemParamState.id
              )}
            >
              Save
            </Button>
            <Button type="button" onClick={onClick.bind(null, "cancel", null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
