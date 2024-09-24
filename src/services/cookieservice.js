import React from "react";
import Cookies from "js-cookie";

export function setCookie(identifier, value, options){
    Cookies.set(identifier,value,options);
    return true;
}

export function getCookie(identifier){
    return Cookies.get(identifier) || null;
}

export function deleteCookie(identifier){
    Cookies.remove(identifier);
    return true;
}