//https://developer.spotify.com/documentation/general/guides/authorization-guide/
//var request = require("request");

var client_id = '4e0deb0c4e624ec3869ef1f4320d3f64'; //PUT IN A JSON
var client_secret = '8a083fe2f286447cb4bd48c72d6daae5';  //PUT IN A JSON
var redirect_uri = 'http://localhost:3000/';

var authURL = "https://accounts.spotify.com/authorize";
var tokenURL = "https://accounts.spotify.com/api/token";

localStorage.setItem("client_id", client_id);
localStorage.setItem("client_secret", client_secret);

export const getAuthorization = () => { //user authorization
    let url = authURL;
    url += "?client_id=" + client_id + "&response_type=code&redirect_uri=" + encodeURI(redirect_uri) + "&show_dialog=true"; //CHANGE BACK TO TRUE WHEN DONE
    url += "&scope=playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative"
    window.location.href = url;
}

export const onPageLoad = () => {
    if(window.location.search.length > 0){
        let code = getAuthToken();
        getAccessToken(code);
        window.history.pushState("","",redirect_uri); //just cleans up URL at top of page.
        getUserID();
        getPlaylists();
    }
}

function getAuthToken() {
    //document.getElementById("spotifyConfirm").innerHTML = "Signed in to Spotify!";
    const string = window.location.search;
    let n = string.search("code=");
    return string.substring(n+5);
}

function getAccessToken(code){
    var xhttp = new XMLHttpRequest();
    let body = "grant_type=authorization_code&code=" + code + "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id + "&client_secret" + client_secret;
    xhttp.open("POST", tokenURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    xhttp.send(body);
    xhttp.onload = () => {
        if(xhttp.status === 200){
            const data = JSON.parse(xhttp.response);
            var access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
            var refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);

        }else{ //maybe add 401 statement that refreshes accces token
            alert(xhttp.response);
        }
    };
}

function getUserID(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.spotify.com/v1/me", true);
    xhttp.setRequestHeader("Authorization" , "Bearer " + localStorage.access_token);
    xhttp.send();
    xhttp.onload = () =>{
        var user_data = JSON.parse(xhttp.response);
        var user_id = user_data.id;
        localStorage.setItem("user_id", user_id);
    }
}

function getPlaylists(){
    var xhttp = new XMLHttpRequest();
    var url = "https://api.spotify.com/v1/users/" + localStorage.user_id + "/playlists?limit=50";
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Authorization" , "Bearer " + localStorage.access_token);
    xhttp.send();
    xhttp.onload = () =>{
        var playlist_data = JSON.parse(xhttp.response);
        //var playlists;

        for(var i = 0; i < playlist_data.items.length; i++){
            console.log(playlist_data.items[i].name);
        }
        //console.log(playlist_data.items.length);
    }
}

