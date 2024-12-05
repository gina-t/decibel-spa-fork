var client_id = "623b4e8b76484b0dae395ea8b8b69011";
var client_secret = "f26634c6d5a9417487ef81d5c34d5df1";

async function getToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  });

  return await response.json();
}

// EXAMPLE: function to retrieve track info from Spotify API
async function getTrackInfo(access_token) {
  const response = await fetch(
    "https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT",
    {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    }
  );

  return await response.json();
}

async function searchForItem(access_token, songName) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=track:${songName}&type=track&limit=10`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    }
  );

  let data = await response.json();
  //   console.log(`searchForItem: ${data}`);
  console.log(data.tracks.items);
  return data.tracks.items;
}

async function searchForArtist(access_token, artistName) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=artist:${artistName}&type=artist
`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    }
  );

  const data = await response.json();
}

// EXAMPLE OF USAGE
// getToken().then((response) => {
//   // Add function to retrieve data
//   getTrackInfo(response.access_token).then((profile) => {
//     console.log(profile);
//   });
// });

let searchResults = await getToken().then((response) => {
  // Add function to retrieve data
  searchForItem(response.access_token, "Fix You").then((profile) => {
    // console.log(profile);
  });
});

// console.log(searchResults);
