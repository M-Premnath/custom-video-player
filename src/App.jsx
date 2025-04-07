import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoForm from "./VideoForm";
import Footer from "./Footer"; 
import {
  Box,
  Skeleton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import "./App.css";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDoc, setOpenDoc] = useState(false);

  const handleVideoSubmit = (url) => {
    setIsLoading(true);
    setVideoUrl(url);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleOpenDoc = () => setOpenDoc(true);
  const handleCloseDoc = () => setOpenDoc(false);

  return (
    <Box className="app-container">
      <Box className="left-container">
        <h2>
          React-Powered Custom Player
        </h2>
        <VideoForm setVideoUrl={handleVideoSubmit} />
        <p style={{ marginTop: "1.5rem", fontSize: "14px", color: "#666", lineHeight: "1.8" }}>

  <strong>Purpose:</strong> The goal of this project is to build a customizable and user-friendly React video player that accepts various video URLs, allowing users to quickly preview and play videos without platform-specific dependencies. It was created to meet the need for a lightweight, adaptable video interface.
</p>

      </Box>

      <Box className="right-container">
        {isLoading ? (
          <Box className="skeleton-container">
            <Skeleton
              variant="rectangular"
              width="100%"
              height={500}
              animation="wave"
              sx={{
                bgcolor: 'grey.800',
                borderRadius: '10px'
              }}
            />
          </Box>
        ) : videoUrl ? (
          <VideoPlayer videoUrl={videoUrl} setVideoUrl={setVideoUrl} />
        ) : (
          <Box className="empty-player">
            <h2>Enter a video URL to start playing</h2>
            <Typography variant="body2" className="empty-content" sx={{ mt: 1, color: "#EFEFEF" }}>
              Or click "Play Random Video" to see a sample.
            </Typography>
            <Typography className="empty-content" variant="body2" sx={{ mt: 1, color: "#EFEFEF" }}>
              Supported formats: YouTube links, MP4, MOV, AVI, WMV, FLV, MKV, WebM.
            </Typography>
            <Box sx={{ mt: 1 }}>
    <Typography
      component="span"
      variant="body2"
      sx={{ color: "#EFEFEF" }}
      className="empty-content"
    >
      Need help? {" "}
      <Typography
        component="span"
        variant="body2"
        onClick={handleOpenDoc}
        sx={{
          color: "#EFEFEF",
          textDecoration: "underline",
          cursor: "pointer",
          '&:hover': {
            color: '#B4EBE6',
            textDecoration: "underline",
            transform: "scale(1.05)",
            transition: "transform 0.3s ease",
          }
        }}
      >
        Check the documentation
      </Typography>
    </Typography>
  </Box>
          </Box>
        )}
      </Box>

      {/* Documentation Dialog */}
      <Dialog open={openDoc} onClose={handleCloseDoc} maxWidth="sm" fullWidth>
        <DialogTitle>📖 How to Use the Custom Video Player</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <ol style={{ paddingLeft: "1rem", lineHeight: "1.8" }}>
              <li>Enter a valid video URL (YouTube or direct MP4, MOV, etc.) into the input box.</li>
              <li>Click the <strong>"Play Video"</strong> button to preview your video instantly.</li>
              <li>Not sure what to play? Hit the <strong>"Play Random Video"</strong> button to try a sample.</li>
              <li>You can stop or replace the video at any time by entering a new link.</li>
              <li>Make sure the URL is publicly accessible for it to load correctly.</li>
            </ol>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDoc} variant="text" color="primary">
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
      <Box className="footer-container">
        <Footer />
      </Box>
    </Box>
  );
};

export default App;
