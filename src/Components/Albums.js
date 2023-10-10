import React, { useState, useEffect } from "react";

const Albums = (props) => {
    const [albums, setAlbums] = useState([]);
    const fetchAlbums = async () => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/artists/${props.artistID}/albums`,
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
                console.log(data.items)
                setAlbums(data.items);
            } else {
                console.error("Request failed with status:", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    console.log(props.searchResults)
    useEffect(() => {
        if (props.searchResults.length != 0) {
            fetchAlbums();
        } else {
            setAlbums(props.searchResults);
        }
    }, [props.artistID, props.accessToken, props.searchResults]);

    return (
        <div className="albums-cards-container">
            <div className="grid-container-albums">
                {albums.map((album) => (
                    <div className="albums-card" key={album.id}>
                        {album.images.length > 0 ? (
                            <img className="albums-img" src={album.images[0].url} alt={album.name} />
                        ) : (
                            <p>No image available</p>
                        )}
                        <h3 style={{ width: "100%" }}>{album.name || "Unknown Album"}</h3>
                        <p>{album.release_date}</p>
                        <p>{album.total_tracks} tracks</p>
                        <a style={{ width: "100%" }}
                            key={album.id}
                            href={album.external_urls.spotify}
                            target="_blank"
                        >
                            <div className="preview-section" >
                                <p>Preview In Spotify</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Albums;
