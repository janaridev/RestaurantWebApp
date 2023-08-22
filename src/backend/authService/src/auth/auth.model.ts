import { model } from "mongoose";
import { AuthSchema } from "./auth.schemas";

export interface IAuth {
  email: string;
  password: string;
  salt: string;
}

export const Auth = model<IAuth>("Auth", AuthSchema);
