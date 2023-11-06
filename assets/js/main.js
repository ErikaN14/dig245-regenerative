/* javascript */

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
        "Bearer BQAvog9uHyoEgMF-XAoNLWKQjPGfAE3Fx1TW9TIhkuklATC-4gBJniIC3LFS2r7R-OeJ8b0a9TFz7ckqQlB8zKdFckjZoI37uj7yIpos0w43fk-MHlY",
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

async function updateTrack(year) {
  let lastYear =  Number(year) + 9; 

  //  track
  let data = await getData(
    `https://api.spotify.com/v1/search?q=year%3A${year}-${lastYear}&type=track&market=US&offset=0`
  );

  console.log(data);
  let track = data.tracks.items[Math.floor(Math.random() * data.tracks.items.length)]; //random track value
  //to have link to song, go to data.album.externalurls?
  
  //console.log(data.tracks.items.external_urls.spotify);
  console.log(track);
  const trackImage = track.album.images[0].url;

  document.querySelector(".song_image").innerHTML = `<img src="${trackImage}">`

return;

};
