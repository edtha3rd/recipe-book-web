import axios, { AxiosResponse } from "axios";
import { User } from "../components/UserContext";

type Props = {};

type GetLoginResponse = {
  data: User[];
};

export async function checkUser() {
  let userObj = await axios
    .get<GetLoginResponse>(
      `${process.env.REACT_APP_API_URI}/auth/login/success`,
      {
        withCredentials: true,
      }
    )
    //check response object
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        return response.data.user;
      }
      throw new Error("authentication failed");
    })
    //add user state
    .then((resObject: User) => {
      // setUser(resObject);
      return resObject;
    })
    .catch((error) => {
      console.log(error.message);
    });
  return userObj;
}
