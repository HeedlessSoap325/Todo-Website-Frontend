import React, {useEffect, useState} from "react";
import "./ViewTodo.css";
import { Button} from "@mui/material"
import { useParams } from "react-router-dom";
import { getTodo } from "../services/api.js";
import ReturnIcon from "@mui/icons-material/KeyboardReturn"
import EditIcon from "@mui/icons-material/Edit"
import { decrypt } from "../services/security.js";

export default function ViewTodo(){
    const { id } = useParams();
    const[todo_title, setTitle] = useState([]);
    const[todo_description, setDescription] = useState([]);
    

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
        }).catch(error => console.error(error));
        
        setTimeout(() => {
            calcHeight();
        }, 200);

    },[])


    const calcHeight=()=>{
        const textarea = document.getElementById("tododescription");

        textarea.style.whiteSpace = "pre-wrap";
        textarea.style.height = "auto";
        let scHeight = textarea.scrollHeight;
        textarea.style.height = `${scHeight}px`;
    }

    const handleEdit=(e)=>{
        //Prevents the function from triggering at the startup
        e.preventDefault();
        //Redirects the user to the corresponding page
        window.location.href = `/edittodo/${id}`;
    }

    return(
        <div id="headdiv" class={"headdiv"}>
            <Button id="backbutton" startIcon={<ReturnIcon/>} href='/'>Return</Button>
            <div id="maindiv" class={"maindiv"} key={"div for " + id.toString()}>
                <Button id="editbutton" startIcon={<EditIcon/>} onClick={(e)=>handleEdit(e)}> </Button>
                    
                <h1 class={"todotitle"} >{todo_title}</h1> <br/>
                    
                <textarea id="tododescription" readOnly={true} class={"tododescription"} value={todo_description}/>
                    
                <br class="clear" />
            </div>
        </div>
    );
}