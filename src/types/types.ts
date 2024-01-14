import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type LoginFormType = {
  email: string;
  password: string;
};

export type SignupFormType = LoginFormType & {
  firstName: string;
  lastName: string;
};

export type ChangeHandlerType<T> = {
  (
    e: ChangeEvent<HTMLInputElement>,
    setState: Dispatch<SetStateAction<T>>
  ): void;
};

export type AuthType = true | false ;

export type AuthContextType = {
  isLoggedIn: AuthType;
  setIsLoggedIn: Dispatch<React.SetStateAction<AuthType>>;
};


