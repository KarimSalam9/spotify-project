import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const ArtistSearch = (props) => {
    const [searchItem, setSearchItem] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (props.accessToken != null) {
            async function fetchArtist() {
                try {
                    const response = await fetch(
                        `https://api.spotify.com/v1/search?q=${searchItem}&type=artist`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + props.accessToken,
                            },
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        props.setSearchResults(data.artists.items);
                    } else {
                        console.error("Request failed with status:", response.status);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }

            if (searchItem) {
                fetchArtist();
            }
        }
    }, [searchItem, props.accessToken]);



    const popularityToRating = (popularity) => {
        return (popularity / 20).toFixed(1);

    };

    const onArtistClick = (id) => {
        props.setArtistID(id)
        navigate("/albums")
    }

    return (
        <div>
            <form className="search-form" onSubmit={(event) => event.preventDefault()}>
                <input
                    className="search-input"
                    type="search"
                    placeholder="Search for an artist..."
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            setSearchItem(event.target.value);
                        }
                    }}
                    onChange={(event) => setSearchItem(event.target.value)}
                />
            </form>



            <div className="artist-cards-container">
                <div className="grid-container-artists">
                    {props.searchResults.map((artist) => (
                        <div key={artist.id} className="artist-card" onClick={() => { onArtistClick(artist.id) }}>
                            {artist.images.length > 0 ? (

                                <img className="artist-img" src={artist.images[0].url} alt={artist.name} />
                            ) : (
                                <p>No image available</p>
                            )}
                            <h3 >{artist.name || "Unknown Artist"}</h3>
                            <p style={{ color: "grey" }}>Followers: {artist.followers ? artist.followers.total : 0}</p>
                            <div className="star-rating">
                                <p style={{ color: "grey" }}>Popularity: </p>
                                {popularityToRating(artist.popularity || 0)} &#9733;
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistSearch;
