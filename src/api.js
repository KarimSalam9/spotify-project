export async function getArtistbyName(accessToken) {
  try {
    var artist;
    await fetch("https://api.spotify.com/v1/search?q="+, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        artist = data;
        // console.log(data)
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error("Error:", error);
      });
    return artist;
  } catch (error) {
    console.error("Error calling API:", error);
  }
}
