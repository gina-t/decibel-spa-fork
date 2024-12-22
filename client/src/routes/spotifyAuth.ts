// Get Spotify Token
export async function getToken() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Client ID or Client Secret is missing.");
    return;
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)
      },
      body: new URLSearchParams({
        grant_type: "client_credentials"
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Failed to get token: ${response.statusText} - ${errorResponse.error_description}`);
    }

    const data = await response.json();
    console.log("Spotify token retrieved successfully.");
    return data;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
}

// Generate Spotify Authorization URL
export function getAuthorizationUrl() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = "http://localhost:5173/callback";
  const scopes = "user-read-private user-read-email";

  return `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
}
