import React, {useState, useEffect} from "react";
import "./Login.css";
import {Button} from "@mui/material"
import { setPrivateToken, setuser } from "../services/user";
import { createuser, login } from "../services/api";

export default function Login(){
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const showOutput=(message,color)=>{
        //showing a message in the div with the id "output"
        document.getElementById("output").style.color = color;
        document.getElementById("output").innerHTML = message;
    }

    const handleLogin=(e)=>{
        showOutput("", "white");
        if (password === "" || username === "") {
            showOutput("Please input valide credentials","red");
            return;
        }
        login(username, password).then(res =>{
            if (res.startsWith("token: ")) {
                setuser(true, username, res.replace("token: ", ""));
                setPrivateToken(username, password);
                window.location.href = "/";
            }else{
                showOutput(res,"red");
            }
        });
        
    }

    const handleSignUp=(e)=>{
        if (password === "" || username === "") {
            showOutput("Please input valide credentials","red");
            return;
        }
        const user = {username, password};
        createuser(user).then(res =>{
            if (res.startsWith("token: ")) {
                setuser(true, username, res.replace("token: ", ""));
                window.location.href = "/";
            }else{
                showOutput(res,"red");
            }
        })
    }

    return(
        <div id="headdiv" class={"headdiv"}>
            <form id="loginform" class={"loginform"}>
                <h1 id="title" class={"title"} >Please Log in!</h1>
                <br/>
                
                <span id="usernamelable" class={"lable"}>username: </span> 
                <input type="text" class={"input"} onChange={(e)=>{setusername(e.target.value)}}></input>

                <br/>

                <span id="passwordlable" class={"lable"}>password: </span>
                <input type="password" class={"input"} onChange={(e)=>{setpassword(e.target.value)}}></input>

                <br/>

                <Button id="button" type="submit" onSubmit={handleLogin} onClick={handleLogin}>Login</Button>
                
                <br/>
                <div id="choiselable">---or---</div><br/>
                
                <Button id="button"  onClick={handleSignUp}>Sign up!</Button>

                <div id="output"></div>
            </form>
        </div>
    );
}