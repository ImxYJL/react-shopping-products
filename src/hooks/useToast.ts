import { useRef, useState } from "react";

const TOAST_DURATION = 3000;

const useToast = () => {
  const [isOpenToast, setIsOpenToast] = useState(false);
  const toastTimer = useRef<NodeJS.Timeout>();

  const showToast = () => {
    setIsOpenToast(true);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    const timer = setTimeout(() => {
      setIsOpenToast(false);
    }, TOAST_DURATION);
    toastTimer.current = timer;
  };

  return { isOpenToast, showToast };
};

export default useToast;
