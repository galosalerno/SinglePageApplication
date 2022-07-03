export async function createUser(){
    const response = await fetch('https://api-3sxs63jhua-uc.a.run.app/v1/userId');
    const id = await response.text();
    return id;
}

export async function getTodosForUser(userId){
    const data = await fetch(`https://api-3sxs63jhua-uc.a.run.app/v1/todo/${userId}`);
    return data.json();
}

export async function createTodo(userId,message){
    const options = {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "message": message,
          "title": message
        })
    }
    const data = await fetch(`https://api-3sxs63jhua-uc.a.run.app/v1/todo/${userId}`,options);
    return data.json();
}

export async function editTodo(userId,taskId, taskStatus){
    const options = {
        'method': 'PUT',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "completed": taskStatus,
          "todoId": taskId
        })
    }
    const data = await fetch(`https://api-3sxs63jhua-uc.a.run.app/v1/todo/${userId}`,options);
    return data;
}

export async function deleteTodo(userId,todoId){
    const options = {
        'method': 'DELETE',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "todoId": todoId
        })
    }
    const data = await fetch(`https://api-3sxs63jhua-uc.a.run.app/v1/todo/${userId}`,options);
    return data;
}

export async function resetTodoList(userId){
    const options = {
        'method': 'DELETE',
        'headers': {
          'Content-Type': 'application/json'
        }
    }
    const data = await fetch(`https://api-3sxs63jhua-uc.a.run.app/v1/todo/${userId}/reset`,options);
    return data;
}
