import axios from "axios";
import { models } from "@models";
import { instance } from "../interceptors";

export namespace api {
  export namespace auth {
    export function Login(email: string, password: string) {
      // return axios.post<models.BaseModel<string>>(
      //   `${process.env.ADMIN_BASE_API_URL}/auth/login`,
      //   JSON.stringify({
      //     identity: email,
      //     password: password,
      //   }),
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      return instance.post<models.BaseModel<string>>(
        `/auth/login`,
        JSON.stringify({ identity: email, password: password })
      );
    }
  }
  export namespace user {
    export function GetUser(userId: string) {
      return axios.get<models.BaseModel<models.User>>(
        `${process.env.ADMIN_BASE_API_URL}/user/${userId}`
      );
    }
  }
}
