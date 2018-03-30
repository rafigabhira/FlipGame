console.log("JS Connected!");

function loadXMLDoc() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for older browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     		var user = JSON.parse(xmlhttp.responseText);
			var usern = document.getElementById("form-username").value;
			var pass = document.getElementById("form-password").value;
			
			console.log(user.users[1].username)
			console.log(user.users[1].password)
			console.log(user.users[5].username)
			console.log(user.users[5].password)


			console.log(user.users.length)

			var isIn = false;
			for(var i = 0; i < user.users.length; i++){
				if (usern == user.users[i].username && user.users[i].password == pass && isIn == false) {
					isIn = true;
					localStorage.username = usern;
				} 
			}
			console.log(isIn)
			if(isIn == true){
				
				window.open("index.html", "_self");

			} else {
				alert("Login Failed !")
			}
		}
	}
  xmlhttp.open("GET", "src/json/users.json", true);
  xmlhttp.overrideMimeType("text/plain");
  xmlhttp.send();
}


