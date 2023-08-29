import jwtDecode from "jwt-decode";

interface CustomJwtPayload {
  role: string;
}

export function checkRole(jwt: string): string {
  const decodedToken = jwtDecode<CustomJwtPayload>(jwt);
  const role = decodedToken.role;

  return role;
}
