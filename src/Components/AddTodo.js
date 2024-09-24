import React, {useState, useEffect } from 'react';
import "./AddTodo.css";
import TextField from '@mui/material/TextField/TextField';
import {Button} from '@mui/material';
import ReturnIcon from '@mui/icons-material/KeyboardReturn';
import { addTodo } from '../services/api';
import { getcurrentuser } from '../services/user';
import { encrypt } from '../services/security';

export default function AddTodo() {
    //Initializing needed variables
    const[title, setTitle] = useState([]);
    const[description, setDescription] = useState([]);

    const showOutput=(message,color)=>{
        //showing a message in the div with the id "output"
        document.getElementById("output").style.color = color;
        document.getElementById("output").innerHTML = message;
    }

    useEffect(()=>{
        const textarea = document.getElementById("descriptionarea");

        textarea.addEventListener("keyup", e =>{
            textarea.value = e.target.value;
            textarea.style.height = "auto";
            let scHeight = e.target.scrollHeight;
            textarea.style.height = `${scHeight}px`;
        });
    },[])


    const handleAddTodo=(e)=>{
        //Prevents the function from triggering at the startup
        e.preventDefault()
        //Prevents that the values are not set
        if (title.length === 0 || description.length === 0){
            showOutput("Please enter a valide Title/Description!", "#ff0000");
            return;
        }

        //creating Variables to create a todo object
        const id = 0
        const todo_finished = false
        const owner = getcurrentuser();
        let todo_title = "";
        let todo_description = "";

        //encrypt the data
        if(owner === "tester"){
           todo_title = title;
           todo_description = description;
        }else{
            todo_title = encrypt(title);
            todo_description = encrypt(description);
        }
        

        //building a todo object in json format
        const todo={id, todo_title, todo_description, todo_finished, owner}

        //sending the data to the Backend and clearing the input
        addTodo(todo)
        .then(
            setTitle("")
        ).then(
            setDescription("")
        ).then(
            showOutput("Todo has been added successfully!","#00cc22")
        ).catch((error) =>{console.log(error);})
    }
    
    return(
        <div id="headdiv" class={"headdiv"}>
            <Button id="backbutton" startIcon={<ReturnIcon/>} href='/'>Return</Button>
            <div id="maindiv" class={"maindiv"}>
                <form id='addtodoform' noValidate autoComplete="off">
                    <TextField required id="inputtitle" label="Title" variant="outlined"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    />

                    <pre id='inputspacer'></pre>

                    <textarea id="descriptionarea" class={"descriptionarea"} value={description} onChange={(e)=>setDescription(e.target.value)}/> <br/>
                    
                    <Button id="addbutton" onClick={handleAddTodo}>Add To Do!</Button>
                    
                    <div id="output"></div>
                </form>
            </div>
        </div>
    );  

    /*
    <TextField required id="inputdescription" label="Description"  style={{backgroundColor: "#5f636d"}}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />
    */
}