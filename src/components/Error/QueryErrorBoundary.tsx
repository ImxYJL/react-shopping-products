import React from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";

interface Props {
  children: React.ReactNode;
}

const QueryErrorBoundary = ({ children }: Props) => {
  const { reset } = useQueryErrorResetBoundary();

  return <ErrorBoundary onReset={reset}>{children}</ErrorBoundary>;
};

export default QueryErrorBoundary;
