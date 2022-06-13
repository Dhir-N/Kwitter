// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyAf-diNxyb4sUvhXldyJeALzApmLNW6WWQ",
      authDomain: "kwitter-28be5.firebaseapp.com",
      databaseURL: "https://kwitter-28be5-default-rtdb.firebaseio.com",
      projectId: "kwitter-28be5",
      storageBucket: "kwitter-28be5.appspot.com",
      messagingSenderId: "721693014158",
      appId: "1:721693014158:web:a04762929da4616a37b1df"
    };
    
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "Adding room name"
      });
      localStorage.setItem("room_name", room_name);
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room Name" + Room_names);

      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#" +Room_names+ "</div><hr>";
      document.getElementById("output").innerHTML += row;
      });});}
getData();

function logout(){
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}