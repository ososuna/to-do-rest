import { JwtPayload } from "jsonwebtoken";

export interface IUserPayload extends JwtPayload {
  uid? :  string,
  name?:  string
}
