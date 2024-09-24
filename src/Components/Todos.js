import React, {useEffect, useState } from 'react';
import "./Todos.css";
import {Paper,Grid ,Button, Checkbox, FormControlLabel} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeletIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {deleteTodo, editTodo, getTodos} from "../services/api.js";
import { decrypt, encrypt } from '../services/security.js';
import { getcurrentuser } from '../services/user.js';


export default function Todos() {
    //Initializing needed variable
    const[Todos, setTodos] = useState([]);
    let DeleteId = 0;

    const handlepreDelete=(e,id)=>{
        //Prevents the function from triggering at the startup
        e.preventDefault()
        e.stopPropagation();

        //Prevents that the value is not set
        if (id === 0){
            console.error("Invalide ID!")
        }

        const modal = document.querySelector("#modal");
        const closeModal = document.querySelector("#closeModal");
        const cancle = document.querySelector("#cancle");
        
        if (modal) {
            modal.showModal();
            closeModal &&
            closeModal.addEventListener("click", () =>{
                console.log(DeleteId)
                deleteTodo(DeleteId).then(
                    modal.close()
                ).then(
                window.location.reload(false))
            });
            cancle &&
            cancle.addEventListener("click", () =>{ 
                modal.close();
            });
        }
        modal.showModal(); 
    }

    const handleCheck=(e,id)=>{
        //Prevents the function from triggering at the startup
        e.preventDefault();
        e.stopPropagation();
        //replacing the value of the "todo_finished" position with the oposite
        var targetindex = Todos.findIndex((item => item.id == id.toString()));
        const currentstate = Todos[targetindex]["todo_finished"];
        Todos[targetindex]["todo_title"] = encrypt(Todos[targetindex]["todo_title"]);
        Todos[targetindex]["todo_description"] = encrypt(Todos[targetindex]["todo_description"]);
        Todos[targetindex]["todo_finished"] = !currentstate;
        setTodos(Todos);

        //sending the data to the Backend
        editTodo(Todos[targetindex])
        .then(
            window.location.reload(false)
        )
    }

    const handleEdit=(e, id)=>{
        //Prevents the function from triggering at the startup
        e.preventDefault();
        e.stopPropagation();
        //Redirects the user to the corresponding page
        window.location.href = `/edittodo/${id}`;
    }

    const handleViewTodo=(e,id)=>{
        e.preventDefault();
        window.location.href = `/viewtodo/${id}`;
    }

    useEffect(()=>{
        //Requesting the Data from the Backend
        getTodos()
        .then((result)=>{
            //sorting the Result so that the lowest id is on the Top
            result.map((todo)=>{
                if(getcurrentuser() === "tester"){
                    return;
                }
                todo.todo_title = decrypt(todo.todo_title);
                todo.todo_description = decrypt(todo.todo_description);
            })
            result.sort((a, b) => a.id - b.id);
            setTodos(result);
        })
    },[])

    return(
        <Grid container id="headgrid" key={"headgrid"}>
            {Todos.map(todo=>(
                <Grid item id="maingrid" xs={12} sm={6} md={4} xl={3} lg={3} key={"Grid for " + todo.id.toString()}>
                    <Paper id="todospaper" key={"Paper for " + todo.id.toString()} onClick={(e)=>handleViewTodo(e, todo.id)} >
                        <pre id='breack'></pre>
                        <div id='todoinfodiv' class={"fade"}>
                            <span id="todotitle">{todo.todo_title}</span>
                            <br/>
                            <span id="tododescription">{todo.todo_description}</span>
                        </div>
                        <br/>

                        <Button id="edittodobutton" onClick={(e)=>handleEdit(e,todo.id)} endIcon={<EditIcon/>} > </Button>
                        <Button id="deletetodobutton" onClick={(e)=>{DeleteId = todo.id; handlepreDelete(e,todo.id); }}  startIcon={<DeletIcon/>} > </Button>
                        
                        <FormControlLabel
                            control={
                                <Checkbox  id="todocheckbox" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } } }/>
                            }
                            label="Finished"
                            onClick={(e)=>handleCheck(e,todo.id)}
                            checked={Todos[Todos.findIndex((item => item.id == todo.id))]["todo_finished"]}
                        />
                    </Paper>
                </Grid>
            ))}
            <dialog id="modal" class="dialog">
            <p>Do you want to delete this To Do?</p>
            <p>This cannot be undone!</p>
            <button id="closeModal" class="dialog-delete-btn">Delete!</button>
            <button id="cancle" class="dialog-close-btn">Cancle</button>
            </dialog>
            <div id="output"></div>
            <Button id="addtodobutton" href='addtodo'  startIcon={<AddIcon/>}>Add To Do</Button>
        </Grid>        
    );
}



