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
});