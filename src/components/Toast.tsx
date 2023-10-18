interface ToastProps {
  message: string;
  type: "info" | "success" | "warning" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  let alertClass = "";
  let emoji = "";

  switch (type) {
    case "info":
      alertClass = "alert-info";
      emoji = "ℹ️";
      break;
    case "success":
      alertClass = "alert-success";
      emoji = "👍";
      break;
    case "warning":
      alertClass = "alert-warning";
      emoji = "🚨";
      break;
    case "error":
      alertClass = "alert-error";
      emoji = "❗❗";
      break;
  }

  return (
    <div className="toast mb-2">
      <div className={`alert ${alertClass} flex items-center justify-center`}>
        <span className="text-neutral">
          {emoji} {message}
        </span>
      </div>
    </div>
  );
};

export default Toast;
