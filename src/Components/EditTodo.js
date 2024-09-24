import React, {useEffect, useState} from "react";
import "./EditTodo.css";
import { useParams } from "react-router-dom";
import {Button} from '@mui/material';
import ReturnIcon from '@mui/icons-material/KeyboardReturn';
import { editTodo, getTodo } from "../services/api";
import { getcurrentuser } from "../services/user";
import { decrypt, encrypt } from "../services/security";


export default function EditTodo(){
    //reading out the provided id in the url
    const { id } = useParams();
    //Initializing needed variables
    const[title, setTitle] = useState([])
    const[description, setDescription] = useState([])
    const[todo_finished, setFinished] = useState([])

    const showOutput=(message,color)=>{
        //showing a message in the div with the id "output"
        document.getElementById("output").style.color = color;
        document.getElementById("output").innerHTML = message;
    }

    useEffect(()=>{
        //preventing the id to be null/undefined
        if (id === "undefined"){
            window.location.href = "/";
            return;
        }


        //Requesting the informations about the specific toto from the Backend and showing it
        getTodo(id)
        .then(result => {
            setTitle(decrypt(result["todo_title"]));
            setDescription(decrypt(result["todo_description"]));
            setFinished(result["todo_finished"]);
        });

        setTimeout(() => {
            setHeight();
        }, 200);
        
        
    },[])

    const setHeight=()=>{
        const textarea = document.getElementById("descriptionarea");

        textarea.style.height = "auto";
        let scHeight = textarea.scrollHeight;
        textarea.style.height = `${scHeight}px`;

        textarea.addEventListener("keyup", e =>{
            textarea.value = e.target.value;
            textarea.style.height = "auto";
            let scHeight = e.target.scrollHeight;
            textarea.style.height = `${scHeight}px`;
        });
    }

    const handleEdit=(e)=>{
        //Prevents the function from triggering at the startup
        e.preventDefault();
        //Prevents that the values are not set
        if (title.length === 0 || description.length === 0){
            showOutput("Please enter a valide Title/Description!","#ff0000");
            return;
        }
        const owner = getcurrentuser();
        //creating a todo object
        const todo_title = encrypt(title);
        const todo_description = encrypt(description);
        const todo={id, todo_title, todo_description, todo_finished, owner}
        
        //sending the data to the Backend
        editTodo(todo)
        .then(
            window.location.reload(false)
        ).then(
            showOutput("Todo has been edited successfully", "#00cc22")
        )
    }

    return(
        <div id="headdiv" class={"headdiv"}>
            <Button id="backbutton" startIcon={<ReturnIcon/>} href='/'>Return</Button>
            <div id="maindiv" class={"maindiv"}>
                <form id='edittodoform' noValidate autoComplete="off">
                    <input type="text" id="inputtitle" class={"inputtitle"}
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    />

                    <pre id='inputspacer' ></pre>

                    <textarea id="descriptionarea" value={description} onChange={(e)=>{setDescription(e.target.value)}} class={"descriptionarea"} />

                    <Button id="savebutton" onClick={handleEdit}>Save Changes</Button>

                    <div id="output"></div>
                </form>
            </div>
        </div>
    );
}