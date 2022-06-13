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

room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        likes: 0
    });
    document.getElementById("msg").value = "";
}

function logout(){
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location = "index.html";
}

function getData() { 
    firebase.database().ref("/"+room_name).on('value', function(snapshot) 
    { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) 
    { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") 
    { 
    firebase_message_id = childKey; 
    message_data = childData;

    console.log(firebase_message_id);
    console.log(message_data);

    name = message_data['name'];
    message = message_data['message'];
    likes = message_data['likes'];
    
    name_with_tag = "<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"
    like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+likes+" onclick='updateLikes(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Likes: " +likes+ "</span></button><hr>";

    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;
    } }); }); }
getData();

function updateLikes(message_id){
    console.log("Clicked on like button " + message_id);
    button_id = message_id;
    like_count = document.getElementById(button_id).value;
    update_likes = Number(like_count) + 1;
    console.log(update_likes);

    firebase.database().ref(room_name).child(message_id).update({
        likes: update_likes
    });
}