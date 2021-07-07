import * as Hapi from "@hapi/hapi";

export interface ICredentials extends Hapi.AuthCredentials {
  id: string;
}

export interface IRequestAuth extends Hapi.RequestAuth {
  credentials: ICredentials;
}

export interface IRequest extends Hapi.Request {
  params: any;
  query: any;
  payload: any;
  auth: IRequestAuth;
}

export interface ILoginRequest extends IRequest {
  email: string;
  name: string;
}

export interface IContext {
  isAuth: boolean;
  message: string;
  user: any;
}