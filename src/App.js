import React from 'react';
import './App.css';
import {Route, Routes } from 'react-router-dom';
import Todos from './Components/Todos';
import AddTodo from './Components/AddTodo';
import EditTodo from "./Components/EditTodo";
import ViewTodo from './Components/ViewTodo';
import Test from "./Components/Test.js";
import Login from "./Components/Login.js";
import Error from "./Components/error.js";
import { isloggedin } from './services/user.js';



function App(){
  //check if the user is logged in if not redirect him to /login also prevent an endles loop with window.location.pathname != "/login"
  if(!isloggedin() && window.location.pathname != "/login"){
    window.location.href = "/login";
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/addtodo" element={<AddTodo />} />
          <Route path="/edittodo/:id/" element={<EditTodo />} />
          <Route path="/viewtodo/:id/" element={<ViewTodo />} />
          <Route path="/test" element={<Test/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/error" element={<Error/>}/>
        </Routes>
      </header>
    </div>
    
  );
}

export default App;








