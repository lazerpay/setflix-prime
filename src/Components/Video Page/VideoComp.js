import React from 'react';
import ReactPlayer from 'react-player';
import "../../Styles/Video Page/videocomp.css";
import axios from 'axios';
import apiObj from '../../api.config';
import { useParams } from 'react-router-dom';
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";


export default function VideoComp() {
    //VARAIBLE ASSIGNMENTS
    //grab the movie id from the url
    const { movieID } = useParams();
    //the variable which will hold the poster path or the thumbnail of the video
    const [posterSrc, setPosterSrc] = React.useState("");
    //the variable which will hold the source of the trailer video
    const [videoSrc, setVideoSrc] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [loaderColor, setLoaderColor] = React.useState("#ff0066");
    //the overriding css for the clip loader
    const override = css`
        display: block;
        margin: 0 auto;
    `;

    React.useEffect(() => {
        fetchPoster();
        fetchVideo();
    }, [movieID]);


    //function to fetch the poster/ thumbnail
    function fetchPoster() {
        setLoading(true);
        axios.get(`${apiObj.baseURL}/movie/${movieID}?api_key=${apiObj.key}`)
            .then(res => {
                setLoading(false);
                let imageURL = `${apiObj.imgURL}/w500/${res.data.poster_path}`;
                setPosterSrc(imageURL);
            })
    }

    //function to fetch the trailer video
    function fetchVideo() {
        try {
            axios.get(`${apiObj.baseURL}/movie/${movieID}/videos?api_key=${apiObj.key}&language=en-US`)
                .then(res => {
                    //array containing all the teasers and trailers of the movie
                    let movieArray = res.data.results;
                    //the second element of the array contains the trailer video
                    let videoURL = `${apiObj.youtubeURL}?v=${movieArray[0].key}`;
                    setVideoSrc(videoURL);
                })
        } catch {
            setError("Failed to load video");
        }
    }

    return (
        <div className="video-wrapper">
            {loading &&
                <div className="loader-container">
                    <ScaleLoader
                        color={loaderColor}
                        loading={loading}
                        css={override}
                        height={60}
                        width={10}
                        radius={3}
                    ></ScaleLoader>
                </div>}
            {!loading &&
                <ReactPlayer
                    className="react-player"
                    url={videoSrc}
                    width="100%"
                    height="100%"
                    controls={true}
                    light={posterSrc}
                />
            }
        </div>
    )
}