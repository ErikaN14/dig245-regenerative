/* javascript */

// For each track there is an image URL
//Create a const variable that is equal to the image url and a function that allows to display the image

//Began adding API code

//Questions to ask:
// How to randomize tracks given on terminal (new tracks each time)?
// If track is not within decade needed, how to refresh track set given to produce a new set of tracks?

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
        "Bearer BQClrDi2qnAP2SpsMMCnlCcRwO4kbZGFHY2PvxqbL3hdGXAvR8OHvH-d0rhGzcaDNuMSruj0XPrpZBhD1MwjjD4e3K-3y8N5ZrSzQOkj05GCFzIY2x8",
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
}

//to get new random tracks each time
function getRandomSearch() {
  // A list of all characters that can be chosen.
  const characters = "abcdefghijklmnopqrstuvwxyz";

  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(
    Math.floor(Math.random() * characters.length)
  );
  let randomSearch = "";

  // Places the wildcard character at the beginning, or both beginning and end, randomly.
  switch (Math.round(Math.random())) {
    case 0:
      randomSearch = randomCharacter + "%";
      break;
    case 1:
      randomSearch = "%" + randomCharacter + "%";
      break;
  }

  return randomSearch;
}
const randomOffset = Math.floor(Math.random() * 10000);

(async function () {
  //defining range (is it needed?)
  let range = output + (output + 9); //output = decade chosen on slider (adding 9 to go from start of decade to end of decade)

  //  track
  let data = await getData(
    `https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl` //create function that randomizes the letters and numbers for end of track link
  );

  let date = data.album.release_date;

  // Trying to get just the year in which the track was released
  let trackYear = date[0];
  for (let i = 1; i <= 3; i++) {
    trackYear = trackYear + date[i];
  }
  //console.log(trackYear.slice(0, 3)); //at this point, I have the year in which the track was released
  //console.log(output.innerHTML.slice(0, 3)); //decade choasen on slider by user

  //checking to see if year track was released is within decade chosen on slider
  if (trackYear.slice(0, 3) === output.innerHTML.slice(0, 3)) {
    //add track to webpage
  } else {
    //generate a new set of tracks to look at
  }
})();
