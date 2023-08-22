import { hashPassword } from "../utils/hash";
import { Auth } from "./auth.model";
import { ICreateUserDto } from "./dtos/createUser.dto";

export async function registerUser(input: ICreateUserDto) {
  const { email, password } = input;

  const { hash, salt } = hashPassword(password);

  await Auth.create({
    email,
    password: hash,
    salt,
  });
}

export async function findUserByEmail(email: string) {
  return await Auth.findOne({ email: email });
}
