import { toast } from "react-toastify";
import ErrorImage from "../../assets/icons/errorIcon.svg";
import "./toast.css";

export function toastMessage(type, toastMessage, isNotification, toastDescriptio, onClick) {
  switch (type) {
    case "error":
      return toast.error(
        <div className="display-flex">
          <img style={{ marginRight: "10px" }} src={ErrorImage} alt="icon" />
          <div className="toast-error">
            <p className="error-toast-heading">Error</p>
            <p>{toastMessage}</p>
          </div>
        </div>,
        {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error",
        }
      );
    case "success":
      return toast.success(
        <div className="display-flex">
          <div className="toast-success">
            <p className="success-toast-heading">Success</p>
            <p>{toastMessage}</p>
            {isNotification && (
              <p style={{ marginTop: "4px" }}>{toastDescriptio}</p>
            )}
          </div>
        </div>,
        {
          position: isNotification
            ? toast.POSITION.TOP_RIGHT
            : toast.POSITION.TOP_CENTER,
          className: "toast-success",
          onClick,
        }
      );
    default:
      return toast.success();
  }
}
