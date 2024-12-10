import { SpotifyTokenResponse } from "../interfaces/SpotifyTokenResponse";

// Get Spotify Token
export async function getToken(): Promise< string | undefined> {
  const clientId = import.meta.env.VITE_CLIENT_ID as string;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET as string;

  if (!clientId || !clientSecret) {
    console.error("Client ID or Client Secret is missing.");
    return;
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.statusText}`);
    }

    const data: SpotifyTokenResponse = await response.json();
    // console.log("Access Token:", data.access_token);
    return data.access_token; // Return the token for further use
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
}
