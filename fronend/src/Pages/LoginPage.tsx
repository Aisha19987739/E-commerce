import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useRef, useState } from "react";
import { BASE_URl } from "../constant/baseUrl";
import { UseAuth } from "../context/Auth/AuthContext";

const LoginPage = () => { 
    const [error,SetError]=useState("");
  
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {login}=UseAuth();
  
  
  const onSubmit = async () => {
    
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    //validate the form data
    if ( !email || !password)
        {  
            SetError('check submitted data')
            return;
        }


    
    // Make the call to API to Create the user

    console.log( email, password);
    const response = await fetch(`${BASE_URl}/user/login`, {
        method: "POST", 
      body: JSON.stringify({password,email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
    {
        SetError("Unable to login. Please check your credentials and try again.");
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
        <Typography variant="h6">Login to Your Account</Typography>
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
         
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField
            inputRef={passwordRef}
            label="Password"
            name="password"
            type="password"
          />
          <Button onClick={onSubmit} variant="contained">
            login
          </Button>
          {error && <Typography sx={{color:"red"}}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;
