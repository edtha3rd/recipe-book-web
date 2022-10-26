import axios from "axios";
import { FormEvent, useState } from "react";

type Props = {
  authType: string;
};

const UserForm = ({ authType }: Props) => {
  const [authValues, setAuthValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    setAuthValues((prevAuthValues) => ({
      ...prevAuthValues,
      [event.target.name]: event.target.value || "",
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", authValues.email);
    formData.append("password", authValues.password);
    formData.append("displayName", authValues.name);

    const response = await axios.post(
      `${process.env.REACT_APP_API_URI}/auth/local`,
      formData
    );
    console.log(response.data);
    return response.data;
  };

  return (
    <>
      <div>
        {authType === "Sign In" ? (
          <p className="text-xl font-bold">Sign In</p>
        ) : (
          <p className="text-xl font-bold">Sign Up</p>
        )}
        <form
          onSubmit={(event) => handleSubmit(event)}
          encType="multipart/form-data"
          className="flex flex-col items-center justify-center md:items-start md:p-4"
        >
          {authType === "Sign Up" ? (
            <div className="lg:flex md:items-center mb-6 w-[100%]">
              <div className="md:w-1/3">
                <label
                  htmlFor="name"
                  className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
                >
                  Display Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="text"
                  name="name"
                  placeholder="Julia Child"
                  value={authValues.name}
                  className="border-black border-2 rounded-lg ml-2 p-1"
                  onChange={(event) => handleTextInput(event)}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="lg:flex lg:items-center mb-6 w-[100%]">
            <div className="md:w-1/3">
              <label
                htmlFor="email"
                className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="text"
                name="email"
                placeholder="ed.elric@example.com"
                value={authValues.email}
                className="border-black border-2 rounded-lg ml-2 p-1"
                onChange={(event) => handleTextInput(event)}
              />
            </div>
          </div>
          <div className="lg:flex md:items-center mb-6 w-[100%]">
            <div className="md:w-1/3">
              <label
                htmlFor="password"
                className="m-2 block font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="password"
                name="password"
                placeholder="********"
                value={authValues.password}
                className="border-black border-2 rounded-lg ml-2 p-1"
                onChange={(event) => handleTextInput(event)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-[100%]">
            <button
              type="submit"
              className="p-2 border rounded-md bg-[#ff7f50] shadow-lg"
            >
              <span className="font-bold">Submit</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
