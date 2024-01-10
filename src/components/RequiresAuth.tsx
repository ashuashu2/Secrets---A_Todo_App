import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type RequiresAuthProps = {
  children: ReactNode;
  login: boolean;
};

function RequiresAuth({ children, login }: RequiresAuthProps) :  JSX.Element {

  return login ?  <>{children}</> : (<Navigate to="/login" />);
}

export { RequiresAuth };
