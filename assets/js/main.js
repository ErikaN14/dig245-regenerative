/* javascript */

// For each track there is an image URL
//Create a const variable that is equal to the image url and a function that allows to display the image

//Began adding API code

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
        "Bearer BQBieBUduPmMBn4STIICRK0AlGQj1g3GkPjOudAS92jqYFsEo3fvAE2IfR40_wLGRQ0hxmeshU3za9mssRTt6HzH_plL1o7_OSN4ub67dG3G-cMEiD4",
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

  //defining range
  let range = output + (output+9); //output = decade chosen on slider (adding 9 to go from start of decade to end of decade)

//  track
  let data = await getData(
    `https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl`
  );

	let date = data.album.release_date;

	// Trying to get just the year in which the track was released
	let year = date[0];
	for (let i = 1; i <= 3; i++){
		year = year + date[i];
	}

	//  console.log(year);
	//  console.log("test");
	//  console.log(output == year);
	 for(let i = output; i <= 9; i++){
		console.log(i);
		console.log("test");
		if(year === output){
			console.log(year === output);
		 }
		//  else{
		// 	console.log("This is false!")
		//  }
	 }



  
  


//   console.log(data);
  //console.log(data);
  //console.log(data.album.release_date);
  //console.log(date[0]);
})();
