import { config } from "dotenv";
config();

import { Auth } from "../auth/auth.model";
import { connectToMongoDB } from "./dbConnection";
import { hashPassword } from "./hash";

async function createAdmin() {
  try {
    await connectToMongoDB();

    const email = "admin@gmail.com";
    const { hash, salt } = hashPassword("admin");

    const existingAdmin = await Auth.findOne({ email: email });
    if (existingAdmin) {
      return "Admin already exists";
    }

    const admin = await Auth.create({
      email: email,
      password: hash,
      salt,
      role: "Admin",
    });

    return "Admin created successfully";
  } catch (error) {
    console.error("Error creating admin:", error);
    return "Error creating admin";
  }
}

async function main() {
  const result = await createAdmin();
  console.log(result);
}

main();
