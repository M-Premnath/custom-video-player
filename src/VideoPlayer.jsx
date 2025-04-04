import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Box, IconButton, Slider, Stack, Typography, Skeleton } from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  FullscreenExit,
  Forward10,
  Replay10
} from '@mui/icons-material';

const VideoPlayer = ({ videoUrl }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [loading, setLoading] = useState(true); // Track video loading
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    return hh ? `${hh}:${mm.toString().padStart(2, '0')}:${ss}` : `${mm}:${ss}`;
  };

  const handlePlayPause = () => setPlaying(!playing);
  const handleMute = () => setMuted(!muted);
  const handleVolumeChange = (_, newValue) => {
    setVolume(newValue);
    setMuted(newValue === 0);
  };

  const handleSeekChange = (_, newValue) => {
    setPlayed(newValue / duration);
  };

  const handleSeekMouseDown = () => setSeeking(true);
  const handleSeekMouseUp = (_, newValue) => {
    setSeeking(false);
    playerRef.current.seekTo(newValue / duration);
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleForward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime + 10);
  };

  const handleRewind = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(Math.max(currentTime - 10, 0));
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Box
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#000',
        borderRadius: '10px',
        overflow: 'hidden'
      }}
    >
      {/* Skeleton Loader - Show before video loads */}
      {loading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ position: 'absolute', top: 0, left: 0, zIndex: 2, backgroundColor: '#222' }}
        />
      )}

      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        controls={false}
        onProgress={handleProgress}
        onDuration={setDuration}
        onReady={() => setLoading(false)} // Hide loader when video is ready
      />

      {/* Controls Box - Show only on hover */}
      <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: { xs: '10px', sm: '20px' },
        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
        transition: 'opacity 0.3s',
        opacity: showControls ? 1 : 0,
      }}
    >
      {/* Video Progress Bar */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="body2" sx={{ 
          color: 'white',
          display: { xs: 'none', sm: 'block' }
        }}>
          {formatTime(duration * played)}
        </Typography>

        <Slider
          size="small"
          value={played * duration}
          min={0}
          max={duration}
          onChange={handleSeekChange}
          onMouseDown={handleSeekMouseDown}
          onChangeCommitted={handleSeekMouseUp}
          sx={{
            color: '#ff0000',
            height: { xs: 2, sm: 4 },
            flexGrow: 1,
            '& .MuiSlider-thumb': {
              width: { xs: 8, sm: 12 },
              height: { xs: 8, sm: 12 },
              '&:hover': {
                width: { xs: 12, sm: 16 },
                height: { xs: 12, sm: 16 },
              },
            },
          }}
        />

        <Typography variant="body2" sx={{ 
          color: 'white',
          display: { xs: 'none', sm: 'block' }
        }}>
          {formatTime(duration)}
        </Typography>
      </Stack>

      {/* Control Buttons */}
      <Stack 
        direction="row" 
        spacing={{ xs: 1, sm: 2 }} 
        alignItems="center" 
        sx={{ mt: { xs: 0.5, sm: 1 } }}
      >
        <IconButton 
          onClick={handleRewind} 
          sx={{ 
            color: 'white', 
            fontSize: { xs: 20, sm: 30 },
            padding: { xs: '4px', sm: '8px' }
          }}
        >
          <Replay10 fontSize="inherit" />
        </IconButton>
        
        <IconButton 
          onClick={handlePlayPause} 
          sx={{ 
            color: 'white', 
            fontSize: { xs: 24, sm: 30 },
            padding: { xs: '4px', sm: '8px' }
          }}
        >
          {playing ? <Pause fontSize="inherit" /> : <PlayArrow fontSize="inherit" />}
        </IconButton>

        <IconButton 
          onClick={handleForward} 
          sx={{ 
            color: 'white', 
            fontSize: { xs: 20, sm: 30 },
            padding: { xs: '4px', sm: '8px' }
          }}
        >
          <Forward10 fontSize="inherit" />
        </IconButton>

        {/* Volume Controls */}
        <Stack 
          direction="row" 
          spacing={1} 
          alignItems="center"
          sx={{
            display: { xs: 'none', sm: 'flex' }
          }}
        >
          <IconButton 
            onClick={handleMute} 
            sx={{ color: 'white', fontSize: 30 }}
          >
            {muted || volume === 0 ? <VolumeOff fontSize="inherit" /> : <VolumeUp fontSize="inherit" />}
          </IconButton>

          <Slider
            size="small"
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.1}
            sx={{
              width: { xs: 60, sm: 100 },
              color: 'white',
              '& .MuiSlider-track': {
                border: 'none',
              },
            }}
          />
        </Stack>

        <Box sx={{ flexGrow: 1 }} />
        
        <IconButton 
          onClick={handleFullscreen} 
          sx={{ 
            color: 'white', 
            fontSize: { xs: 20, sm: 30 },
            padding: { xs: '4px', sm: '8px' }
          }}
        >
          {isFullscreen ? <FullscreenExit fontSize="inherit" /> : <Fullscreen fontSize="inherit" />}
        </IconButton>
      </Stack>
    </Box>
  </Box>
  );
};

export default VideoPlayer;
