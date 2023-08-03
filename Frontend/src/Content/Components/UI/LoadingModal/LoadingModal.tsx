import Card from "../Card/Card";
import styles from "./LoadingModal.module.css";
import ReactDOM from "react-dom";
import Spinner from "./Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Reducers/RootReducer";
import { MouseEventHandler } from "react";

interface IBackdropProps {
  onBackdropClick?: MouseEventHandler;
}

export function Backdrop(props: IBackdropProps) {
  return <div className={styles.backdrop} onClick={props.onBackdropClick} />;
}

interface IOverlayModalProps {}

export function OverlayModal(props: IOverlayModalProps) {
  const loadingText = useSelector(
    (state: RootState) => state.loading.loadingText,
  );
  return (
    <Card className={styles.modal}>
      <div className={styles.loadingPrompt}>
        <h3>{loadingText}</h3>
        <Spinner />
      </div>
    </Card>
  );
}

type LoadingButtonProps = {
  withBackdrop?: boolean;
  onBackdropClick?: MouseEventHandler;
};

const portalElement: Element = document.getElementById("overlay") as Element;

function LoadingModal(props: LoadingButtonProps) {
  return (
    <>
      {props.withBackdrop && ReactDOM.createPortal(
        <Backdrop onBackdropClick={props.onBackdropClick} />,
        portalElement,
      )}
      {ReactDOM.createPortal(<OverlayModal />, portalElement)}
    </>
  );
}

export default LoadingModal;
