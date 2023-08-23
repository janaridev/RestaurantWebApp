import { hashPassword } from "../utils/hash";
import { Auth } from "./auth.model";
import { IAuthDto } from "./dtos/createUser.dto";

export async function registerUser(input: IAuthDto) {
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

export function getParsedId(id: any): string {
  const objectIdString = id.toString(); // Convert ObjectId to a string
  const parsedId = JSON.parse(`{"id": "${objectIdString}"}`).id;
  return parsedId;
}
