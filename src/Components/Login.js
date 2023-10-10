import React from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const navigate = useNavigate();

    const client_id = "3f8bc4a0f16649c4a4dc6ab210eb1645";
    const secret_client_id = "20e7ddaabdcb4e38a5757130d69ba69b";
    const redirect_uri = "http://localhost:3000/callback";

    const handleLogin = () => {
        var params = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
                "grant_type=client_credentials&client_id=" +
                client_id +
                "&client_secret=" +
                secret_client_id,
        };
        fetch("https://accounts.spotify.com/api/token", params)
            .then((result) => result.json())
            .then((data) => props.setAccessToken(data.access_token));

        navigate("/search");
    };

    return (
        <div style={{
            position: "absolute",
            top: "10%",
            left: " 45%"
        }}>
            <h1>Spotify Login</h1>
            <button className="LoginButton" onClick={() => { handleLogin() }}>
                Login with Spotify
            </button>
        </div>
    );
};

export default Login;
