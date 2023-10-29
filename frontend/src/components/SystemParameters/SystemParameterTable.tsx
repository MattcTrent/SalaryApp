import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { IoMdCreate } from "react-icons/io";
import { BiExport } from "react-icons/bi";
import { HiRefresh } from "react-icons/hi";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SystemParamModal from "./Modals/SystemParamModal";
import { SystemParameter } from "@/types/SystemParamModels";
import NumberHelper from "@/utils/NumberHelpers";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/UI/Button/Button";
import styles from "./SystemParameter.module.scss";
import { parameterActions } from "@/redux/slices/SystemParameterSlice";
import { RootState } from "@/redux/reducers/RootReducer";
import { AppDispatch } from "@/redux/store/Store";

export const SystemParameterTable = () => {
  const systemParameters = useSelector(
    (state: RootState) => state.systemParameters.SystemParameters,
  );
  const dispatch: AppDispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const fetchSystemParameter = async (
    systemParameterId: number,
    action: string,
  ) => {
    dispatch(parameterActions.setSelectedSystemParameter(systemParameterId));
    openModal(action);
  };

  const openModal = (action: string) => {
    setModalAction(action);
    setShowModal(!showModal);
  };

  const onClickOpen = (action: string, systemParamId: number | null) => {
    if (systemParamId != null) {
      fetchSystemParameter(systemParamId, action);
    } else {
      openModal(action);
    }
  };

  const onClickExport = () => {};

  const onClickClose = () => {
    dispatch(parameterActions.clearSelectedSystemParameter());
    setShowModal(!showModal);
    RefreshPage();
  };

  const RefreshPage = () => {};

  return (
    <>
      <div className={styles.tableContainer}>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <tr className={styles.bannerButtons}>
                <td>
                  <Button
                    classNameAddition={styles.bannerButton}
                    type="button"
                    onClick={onClickOpen.bind(null, "create", null)}
                  >
                    <IoMdCreate size={25} /> New
                  </Button>
                  <Button
                    classNameAddition={styles.bannerButton}
                    type="button"
                    onClick={onClickExport}
                  >
                    <BiExport size={25} /> Export
                  </Button>
                </td>
                <td className={styles.bannerDivRight}>
                  <Button
                    classNameAddition={styles.bannerButton}
                    type="button"
                    onClick={RefreshPage}
                  >
                    <HiRefresh size={25} /> Refresh
                  </Button>
                </td>
              </tr>
            </TableHead>
          </Table>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow className={styles.tableHeader}>
                <TableCell></TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Lower Threshold</TableCell>
                <TableCell>Upper Threshold</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {systemParameters.map((parameter: SystemParameter) => (
                <TableRow
                  role="SalaryTableRow"
                  className={styles.tableRow}
                  key={parameter.parameterGroup + parameter.name}
                >
                  <TableCell>
                    <Button
                      type="button"
                      onClick={onClickOpen.bind(null, "edit", parameter.id)}
                    >
                      <BiEdit size={25} />
                    </Button>
                  </TableCell>
                  <TableCell>{parameter.parameterGroup}</TableCell>
                  <TableCell>{parameter.name}</TableCell>
                  <TableCell>
                    {NumberHelper.ToPercentString(parameter.rate)}
                  </TableCell>
                  <TableCell>
                    {NumberHelper.ToCurrencyString(parameter.lowerThreshold)}
                  </TableCell>
                  <TableCell>
                    {NumberHelper.ToCurrencyString(parameter.upperThreshold)}
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      onClick={onClickOpen.bind(null, "delete", parameter.id)}
                    >
                      <MdDelete size={25} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {showModal && (
        <SystemParamModal modalAction={modalAction} onClose={onClickClose} />
      )}
    </>
  );
};
