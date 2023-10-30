/* javascript */

//Began adding AI code

// All code is coming from W3 Schools
// Link: https://www.w3schools.com/howto/howto_js_rangeslider.asp
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

// async version 
async function getData(url) {
	let options = {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Authorization:
				"Bearer BQAy_nqlhqv6lzcVlZ2aOrevEg736CW52p1yWZPQ6p4r2WVFJT4ArT_S8gtEzIFXGFnqswwuMzVPz5kY4Z8IGv5JJzGS-S5e2F7nJrq1tgwl_L77X9E"
		}
	};

	// request external resource
	fetch(url, options)
		// the entire response object
		.then((response) => {
			// console.log(response);
			// -> 200, "OK"
			console.log(response.status, response.statusText);
			// parse response.body (convert to JSON), pass to next
			return response.json();
		})
		.then((data) => {
			// data = the deserialized data of the external file
			console.log(data); // log the object
		});
}
// artist
// let data = getData("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb");


//work inside this function (can put all generator code in here!)
(async function () {
	// search
	let range = "1955-1960";
	let data = await getData(
		`https://api.spotify.com/v1/search?q=artist:Miles%20Davis%20year:${range}&type=album`
	);
	console.log(data);

  // Code Verifier (authorization code Step 1):
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const codeVerifier  = generateRandomString(64);

// Code Challenge (authorization code Step 2):
const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

// Code Challenge (authorization code Step 3):
const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Code Challenge (authorization code Step 4):
const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed);

//Requesting User Authorization (authorization code step 5):
const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'http://localhost:8080';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();

//Response (authorization code step 6):
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

//Request Access token (authroization code step 7):
const getToken = async code => {

  // stored in the previous step
  let codeVerifier = localStorage.getItem('code_verifier');

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload);
  const response =await body.json();

  localStorage.setItem('access_token', response.access_token);
}

//Request Authtoization (Client Credentials Flow Step 1):
var client_id = 'CLIENT_ID';
var client_secret = 'CLIENT_SECRET';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
  }
});

//Testing Access Token code from previous
async function getProfile(accessToken) {
  let accessToken = localStorage.getItem('access_token');

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
}

});

