function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
    }
    function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
         console.log(firebase_message_id);
	       console.log(message_data);
	       names = message_data['name'];
	       message = message_data['message'];
         like = message_data['like'];
         name_tag = "<h4> "+ names +"<img class='user_tick' src='tick.png'></h4>";
         message_tag = "<h4 class='message_h4'>" + message + "</h4>";
button_tag ="<button class='btn btn-success' id="+ firebase_message_id +" value=" + like + " onclick='updateLike(this.id)'>";
         span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        row = name_tag + message_tag +button_tag + span_tag;       
        document.getElementById("output").innerHTML += row; 
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
  console.log("clicked on like button - " + message_id);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(room_name).child(message_id).update({
		like : updated_likes  
	 });

}

firebaseConfig = {
  apiKey: "AIzaSyBLqXO0kj-v0Hgf77XgoGrF-KNFboy5w6g",
  authDomain: "let-s-chat-414dd.firebaseapp.com",
  databaseURL: "https://let-s-chat-414dd-default-rtdb.firebaseio.com",
  projectId: "let-s-chat-414dd",
  storageBucket: "let-s-chat-414dd.appspot.com",
  messagingSenderId: "513640196977",
  appId: "1:513640196977:web:574029c07f4d12ff8e64d0",
  measurementId: "G-YG2KL2RKDG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
