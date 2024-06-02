import ReactDom from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

const ToastPortal = ({ children }: PortalProps) => {
  const element = document.getElementById("toast") as HTMLElement;
  return ReactDom.createPortal(children, element);
};

export default ToastPortal;
