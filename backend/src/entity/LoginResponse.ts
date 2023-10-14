import { MessageResponse } from "./MessageResponse";
import { User } from "./User.class";

export type LoginResponse = {
  user: User;
  message: MessageResponse;
};
