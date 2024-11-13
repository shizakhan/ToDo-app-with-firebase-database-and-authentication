
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
  import { getDatabase, ref, set, push, onChildAdded, update, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD-oJZ2Sfuyh3i8hCStqB0cZR0cT-WaCGw",
    authDomain: "todo-app-firebase-db-auth.firebaseapp.com",
    databaseURL: "https://todo-app-firebase-db-auth-default-rtdb.firebaseio.com/",
    projectId: "todo-app-firebase-db-auth",
    storageBucket: "todo-app-firebase-db-auth.firebasestorage.app",
    messagingSenderId: "21893305492",
    appId: "1:21893305492:web:7bd50e43b8702350f3d081"
  };

  // Initialize Firebase 
  const app = initializeApp(firebaseConfig);
  var Auth = getAuth(app);
  var DB = getDatabase(app);


var input = document.getElementById('inp'); //get input value from html   
var listItem = [];

var list = document.getElementById('List');
// function to add values in the list and in firebase database
window.getInputValue = function() {
    var itemDetail={
        notes:input.value
    };

        var referkey = ref(DB);
        var randomId = push(referkey).key
        itemDetail.id = randomId
        var referance = ref(DB,`items/${itemDetail.id}`)
        set(referance,itemDetail)
};

function getDataFromDatabase(){
    var refer = ref(DB,"items");
    onChildAdded(refer,function(data){
        render(data.val())
    })
}
    // if (input.value == " ") {
    //     alert("Input field cannot be empty")
    //     return;
    // }
    // listItem.push(input.value);
    // input.value = '';
    // render();

function render(data) {
    if(data){
        listItem.push(data);
    }
    list.innerHTML = "";
    for (var i = 0; i < listItem.length; i++) {
        list.innerHTML += `<li class="liststyle">${listItem[i].notes}
        <button onclick="editTodo(${i},'${listItem[i].id}')">Edit</button>
        <button onclick="deleteTodo(${i},'${listItem[i].id}')">Delete</button>
        </li>`
    }
}

window.editTodo=function(indexValue,id) {
    listItem[indexValue].notes = prompt("Edit your text");

    var refer = ref(DB,`items/${id}`)
    update(refer,{
        notes:listItem[indexValue].notes
    });
    render();
}

window.deleteTodo=function(indexValue,id) {
    listItem.splice(indexValue,1);
    var refer = ref(DB,`items/${id}`)
    remove(refer);
    render();
}

window.onload = getDataFromDatabase();

//function to delete everything from the list
window.deleteAll=function(){
    listItem=[]
    list.innerHTML = " ";
    var refer = ref(DB,`items/`)
    remove(refer);
}