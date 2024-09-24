import React from "react";
import { getCookie, setCookie } from "./cookieservice";
import { decrypt, encrypt, tosha256 } from "./security";

export function getAuthorization(){
 return "Basic" + btoa(getcurrentuser() + ":" + getCookie("token"));
}



export function isloggedin(){
    let loggedin = getCookie("loggedin") === null ? false : !Boolean(getCookie("loggedin"));
    if(getCookie("token") != null && getCookie("user") != null){
        if(loggedin){
            return true;
        }else{
            setuser(true, getCookie("user"), getCookie("token"));
            return true;
        }
    }else{
        return false;
    }
}

export function setuser(loggedin, username, usertoken){
    setCookie("loggedin", loggedin);
    setCookie("user", username);
    setCookie("token", usertoken);
}

export function getcurrentuser(){
    return getCookie("user");
}

export function getPrivateToken(){
    return getCookie("privatetoken")
}

export async function setPrivateToken(username, password){
    let token = await tosha256(btoa(username + ":" + password));
    setCookie("privatetoken", String(token));
    let test = encrypt("test123");
    console.log("encrepted: " + test);
    let tset = decrypt(test);
    console.log("decrypted: " + tset);
}
