import React, { MouseEventHandler } from "react";
import Modal from "../../UI/Modal/Modal";

interface SalaryBreakdownTableFilterModalProps {
  onCloseClick: MouseEventHandler;
}

const SalaryBreakdownTableFilterModal = (
  props: SalaryBreakdownTableFilterModalProps
) => {
  return <Modal onCloseClick={props.onCloseClick}></Modal>;
};

export default SalaryBreakdownTableFilterModal;
