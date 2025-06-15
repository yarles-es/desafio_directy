import { useCallback } from "react";

import type { ToastOptions } from "react-toastify";
import { toast } from "react-toastify";

const options: ToastOptions = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "!bg-[#24303f] !text-white !border-[#2e3a47] !shadow-default",
};

const useAlert = () => {
  const alert = useCallback(
    (message: string, status: "success" | "error" | "info" | "warning") => {
      return new Promise<void>((resolve) => {
        const toastId = status === "error" ? "unique_alert" : undefined;

        if (!toastId) {
          toast[status](message, options);
          return;
        }
        if (!toast.isActive(toastId)) {
          toast[status](message, {
            ...options,
            onClose: () => resolve(),
            toastId: toastId,
          });
          return;
        }
      });
    },
    []
  );

  return alert;
};

export default useAlert;
