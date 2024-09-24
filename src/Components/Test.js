import React, {useState} from "react";
import  {setCookie, getCookie} from "../services/cookieservice.js";
import { isloggedin } from "../services/user.js";

export default function Test(){
    
    const [name, setName] = useState(getCookie("name"));
    const handleChange = e => {
        setName(e.target.value);
    };
    const [logedin, setlogedin] = useState(isloggedin());

    
    const handleClick=(e)=>{
        const modal = document.querySelector("#modal");
        const openModal = document.querySelector("#openModal");
        const closeModal = document.querySelector("#closeModal");
        const cancle = document.querySelector("#cancle");
        if (modal) {
            openModal &&
            openModal.addEventListener("click", () => modal.showModal());
            closeModal &&
            closeModal.addEventListener("click", () =>{
                modal.close();
                document.getElementById("output").innerText = "deleted";
            });
            cancle &&
            cancle.addEventListener("click", () =>{ 
                modal.close();
                document.getElementById("output").innerText = "cancled";
            });
        }
        modal.showModal();
    }
    
    

    const handleSubmit = e => {
        
        setCookie("name", name, {
            secure: true,
            expires: 5
        })
        setCookie("test", "test");

        setCookie("loggedin", false,{
            secure: true
        })
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={handleChange} />
                <button type="submit">Save</button>
                <span>{name}</span>
                <span>{logedin}</span>
            </form>
            
            <button id="openModal" onClick={handleClick}>Open the modal</button>

            <dialog id="modal">
            <p>Do you want to delete this To Do?</p>
            <p>This Action can't be reversed!</p>
            <button id="closeModal">Delete!</button>
            <button id="cancle">Cancle</button>
            </dialog>
            <div id="output"></div>
      </div>
  );
}