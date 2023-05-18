import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Info } from "../Model/Info";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

interface Props {
  info: Info;
  open: boolean;
  setInfo: React.Dispatch<React.SetStateAction<Info>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputField = ({ info, setInfo, setOpen, open }: Props) => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [mail, setMail] = useState<string>("");

  const handleSubmit = () => {
    if (!name || !phone || !mail) {
      setOpen(true);
    } else {
      const updatedInfo: Info = { name, phone, email: mail };
      setInfo(updatedInfo);
      console.log(updatedInfo);
    }
  };

  useEffect(() => {
    if (info.name && info.phone && info.email) {
      localStorage.setItem("userInfo", JSON.stringify(info));
      navigate("/show");
    }
  }, [info, navigate]);

  return (
    <div className="w-full mt-6 h-full flex flex-col justify-center items-center">
      <Stack
        spacing={4}
        direction={"column"}
        className="w-2/3 md:w-1/2 flex flex-col justify-center items-center h-1/2 gap-5 border-2 border-blue-600 p-6"
      >
        <p className="text-2xl md:text-4xl font-bold">User Information</p>
        <form
          className="text-xl flex flex-col w-full gap-5 mt-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Enter name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-black pl-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="number">Enter phone number: </label>
            <input
              type="tel"
              name="number"
              id="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-2 border-black pl-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Enter email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="border-2 border-black pl-2"
            />
          </div>
          <div>
            <Button
              variant="contained"
              className="bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            {open && <ErrorMessage open={open} setOpen={setOpen} />}
          </div>
        </form>
      </Stack>
    </div>
  );
};

export default InputField;
