import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useRef, useState } from "react";
import { BASE_URl } from "../constant/baseUrl";
import { UseAuth } from "../context/Auth/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => { 
    const [error,SetError]=useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {login}=UseAuth();
  const navigate=useNavigate();
  
  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    //validate the form data
    if (!firstName || !lastName ||!email || !password)
        {  
            SetError('check submitted data')
            return;
        }


    
    // Make the call to API to Create the user

    console.log(firstName, lastName, email, password);
    const response = await fetch(`${BASE_URl}/user/register`, {
        method: "POST", 
      body: JSON.stringify({ firstName, lastName, password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
    {
        SetError("Unable to register user,please try diffrenet creditionals!")
        return;
    }
    
    const token = await response.text();  // 👈 

    // after post(give us token) 
    if (!token)
    {
        SetError("Incorrect token");
        return;
    }
   
   login(email,token);
   navigate("/");

  
    
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6">Creat New Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 1,
            borderColor: "#f5f5f5",
            p: 2,
          }}
        >
          <TextField
            inputRef={firstNameRef}
            label="first Name"
            name="firstName"
          />
          <TextField inputRef={lastNameRef} label="last Name" name="lastName" />
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField
            inputRef={passwordRef}
            label="Password"
            name="password"
            type="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Register
          </Button>
          {error && <Typography sx={{color:"red"}}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
