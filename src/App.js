import React, { useState, useEffect, useRef } from "react";
import boxImage from "./assets/box.png"; // Import box image
import audioFile from "./assets/audio.mp3"; // Import your recorded audio

const App = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!isOpened) return; // Start timer only after the box is opened

    const startDate = new Date("2024-07-06T00:00:00"); // Start date

    const updateTimer = () => {
      const now = new Date();
      const difference = now - startDate; // Time difference in milliseconds

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    const timer = setInterval(updateTimer, 1000); // Update every second
    updateTimer(); // Run once immediately

    return () => clearInterval(timer); // Cleanup on unmount
  }, [isOpened]);

  const toggleAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="container">
      {!isOpened ? (
        <div className="box-container" onClick={() => setIsOpened(true)}>
          <img src={boxImage} alt="Closed Box" className="box-image" />
          <p className="hover-text">Click Here</p>
        </div>
      ) : (
        <div className="gif-container">
          <h1 className="valentine-text">💖 Happy Valentine's Day! 💖</h1>
          <iframe
            src="https://giphy.com/embed/6Uqa3vLCikV1yNRmdU"
            width="480"
            height="480"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          {/* Time Together Section */}
          <div className="time-container">
            <h2 className="time-title">HAPPY VALENTINES DAY BABYYY</h2>

            <p className="time-text">
              <span>{timeTogether.days}</span> Days |
              <span>{timeTogether.hours}</span> Hours |
              <span>{timeTogether.minutes}</span> Minutes |
              <span>{timeTogether.seconds}</span> Seconds
            </p>

            {/* Custom Play Button for Audio */}
            <button
              className={`custom-play-button ${isPlaying ? "playing" : ""}`}
              onClick={toggleAudio}
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
            <audio ref={audioRef} src={audioFile} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
