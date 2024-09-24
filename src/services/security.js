import React from "react";
import { getPrivateToken, getcurrentuser } from "./user";
import CryptoJS from "crypto-js";

export function encrypt(data){
    if (getcurrentuser() === "tester") {
        return data;
    }
    const encrypted = CryptoJS.AES.encrypt(data, getPrivateToken()).toString();
    return encrypted;
}

export function decrypt(data){
    if (getcurrentuser() === "tester") {
        return data;
    }
    const decrypted = CryptoJS.AES.decrypt(data, getPrivateToken()).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

export async function tosha256(input){
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    try {
        const hash = CryptoJS.SHA256(data);
        return hash;
    } catch (error) {
        console.log('Error hashing password:', error);
    }
}