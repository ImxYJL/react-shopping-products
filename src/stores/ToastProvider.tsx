import { createContext, useContext, useRef, useState } from "react";

interface ToastContextProps {
  isOpenToast: boolean;
  message: string;
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps>({
  isOpenToast: false,
  message: "",
  showToast: () => {},
});

const TOAST_DURATION = 3000;

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [isOpenToast, setIsOpenToast] = useState(false);
  const [message, setMessage] = useState("");
  const toastTimer = useRef<NodeJS.Timeout>();

  const showToast = (message: string) => {
    setMessage(message);
    setIsOpenToast(true);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    const timer = setTimeout(() => {
      setIsOpenToast(false);
      setMessage("");
    }, TOAST_DURATION);
    toastTimer.current = timer;
  };

  return (
    <ToastContext.Provider value={{ isOpenToast, message, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};
