/* javascript */

//Began adding API code


// All code is coming from W3 Schools
// Link: https://www.w3schools.com/howto/howto_js_rangeslider.asp
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  if (output.innerHTML != this.value){
    updateTrack(slider.value);
  }
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
        "Bearer BQCWs7LCT_LyiebYBYfu_wsZH7FyilorPmxx-xqyTUnqbSI2v05-ccIDB7AdAr5Ppf8KFx0aCM87Kh3B69hBuC5f0F2Z5tt6ydw-GhGsOWvD9gc92ek",
    },
  };

  // request external resource
  return (
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
        //   console.log(data); // log the object
        return data;
      })
      .catch((err) => {
        console.warn(err);
      })
  );
  // );
}

// //to get new random tracks each time
// function getRandomSearch() {
//   // A list of all characters that can be chosen.
//   const characters = "abcdefghijklmnopqrstuvwxyz";

//   // Gets a random character from the characters string.
//   const randomCharacter = characters.charAt(
//     Math.floor(Math.random() * characters.length)
//   );
//   let randomSearch = "";

//   // Places the wildcard character at the beginning, or both beginning and end, randomly.
//   switch (Math.round(Math.random())) {
//     case 0:
//       randomSearch = randomCharacter + "%";
//       break;
//     case 1:
//       randomSearch = "%" + randomCharacter + "%";
//       break;
//   }

//   return randomSearch;
// }
// const randomOffset = Math.floor(Math.random() * 10000);

async function updateTrack(year) {
  //defining range (is it needed?)
  let lastYear =  Number(year) + 9; //output = decade chosen on slider (adding 9 to go from start of decade to end of decade)

  //  track
  let data = await getData(
    //`https://api.spotify.com/v1/search/11dFghVXANMlKmJXsNCbNl` //create function that randomizes the letters and numbers for end of track link
    `https://api.spotify.com/v1/search?q=year%3A${year}-${lastYear}&type=track&market=US&offset=0`
  );

  console.log(data);
  let track = data.tracks.items[Math.floor(Math.random() * data.tracks.items.length)]; //random track value!
  
  console.log(track);
  const trackImage = track.album.images[0].url;

  document.querySelector(".song_image").innerHTML = `<img src="${trackImage}">`

return;

  // // Trying to get just the year in which the track was released
  // let trackYear = date[0];
  // for (let i = 1; i <= 3; i++) {
  //   trackYear = trackYear + date[i];
  // }
  // //console.log(trackYear.slice(0, 3)); //at this point, I have the year in which the track was released
  // //console.log(output.innerHTML.slice(0, 3)); //decade choasen on slider by user

  // //checking to see if year track was released is within decade chosen on slider
  // //console.log('123');
  // //console.log(data.album.images[0].url);
  // if (trackYear.slice(0, 3) === output.innerHTML.slice(0, 3)) {
  //   const trackImage = data.album.images[0].url; //double check syntax
  //   //would use this in HTML to link song to image
  //   console.log("Test");
  // } else {
  //   console.log(trackYear.slice(0, 3) === output.innerHTML.slice(0, 3));
  //   //generate a new set of tracks to look at (have a function for this but it is not working)
  // }
};
