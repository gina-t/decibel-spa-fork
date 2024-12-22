import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Callback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = new URLSearchParams(location.hash.replace("#", "?"));
    const accessToken = hash.get("access_token");
    const expiresIn = hash.get("expires_in");

    if (accessToken && expiresIn) {
      // Store the access token and expiration time
      localStorage.setItem("spotify_access_token", accessToken);
      localStorage.setItem("spotify_token_expiration", (Date.now() + parseInt(expiresIn) * 1000).toString());

      // Redirect to the main page
      navigate("/");
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
}