import { getAuthorization} from "./user";

const API_Todos_URL = "http://192.168.1.244:8080/apis/Todos";
const API_Users_URL = "http://192.168.1.244:8080/apis/Users";


export async function getTodos(){
    const response = await fetch(API_Todos_URL + "/getTodos", {
        headers: {"Authorization" : getAuthorization()}
    });
    return await response.json();
}

export async function editTodo(todo){
    const response = await fetch(API_Todos_URL + "/editTodo", {
        method:"POST",
        headers:{"Authorization": getAuthorization(), "Content-Type":"application/json"},
        body: JSON.stringify(todo)
    });
    if (!response.ok){
        window.location.href = "/error";
    }
}

export async function deleteTodo(id){
    const response = await fetch(API_Todos_URL + "/deleteTodo?id=" + id,{
        method:"POST",
        headers:{"Authorization": getAuthorization()}
    });
    if (!response.ok){
        window.location.href = "/error";
    }
}

export async function getTodo(id){
    const response = await fetch(API_Todos_URL + "/getTodo", {
        method: "GET",
        headers: {"Authorization": getAuthorization(), "id": id}
    });
    return response.json();
}

export async function addTodo(todo){
    const response = await fetch(API_Todos_URL + "/addTodo", {
        method:"POST",
        headers:{"Authorization": getAuthorization(), "Content-Type":"application/json"},
        body: JSON.stringify(todo)
    });
    if (!response.ok){
        window.location.href = "/error";
    }
}

export async function login(username, password){
    const encodedCredentials = btoa(`${username}:${password}`);

    const response = await fetch(API_Users_URL + "/login", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`,
      },
    });

    if (response.ok) {
        return response.text();
    }
}

export async function createuser(user){
    const response = await fetch(API_Users_URL + "/adduser",{
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })

    if (response.ok) {
        return response.text();
    }
}
