/* javascript */

// For each track there is an image URL
//Create a const variable that is equal to the image url and a function that allows to display the image

//Began adding AI code

// All code is coming from W3 Schools
// Link: https://www.w3schools.com/howto/howto_js_rangeslider.asp
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
};

// async version
async function getData(url) {
  let options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization:
        //Update token after every hour!
        "Bearer BQDh2tvlA-uyd_cSHP9p8MwBgQgRkUV79Jt5JrSNJ6Y5kWLYg4g7SIELhH39UGzc1IT7jq6Fxggz-sent3m4credstdA3AG5OVdIHbVEjk_cjcMk3m4",
    },
  };

  // request external resource
  return fetch(url, options)
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
    //   console.log(data); // log the object
	return data;
    })
	.catch((err) =>{
console.warn(err)
	});
}
// artist
// let data = getData("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb");

(async function () {
  //console.log(123);
  // search
  let range = "1955-1960";
  
// range 
// let data = await getData(
// 	`https://api.spotify.com/v1/search?q=artist:Miles%20Davis%20year:${range}&type=album`
// );


//  track
  let data = await getData(
    `https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl`
  );


//   console.log(data);
  console.log(data.track_number);
})();
