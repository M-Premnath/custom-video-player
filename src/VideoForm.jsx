import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./App.css";

const VIDEO_FORMATS = [
  "youtube.com",
  "youtu.be",
  ".mp4",
  ".mov",
  ".avi",
  ".wmv",
  ".flv",
  ".mkv",
  ".webm",
];

const validationSchema = yup.object({
  videoUrl: yup
    .string()
    .required("Video URL is required")
    .test(
      "is-video",
      "Invalid video format. Please use YouTube URL or MP4, MOV, AVI, WMV, FLV, MKV, WebM formats",
      (value) => {
        if (!value) return false;
        if (value.includes("youtube.com/watch?v=") || value.includes("youtu.be/")) {
          return true;
        }
        return VIDEO_FORMATS.some((format) =>
          value.toLowerCase().endsWith(format.toLowerCase())
        );
      }
    ),
});

const VideoForm = ({ setVideoUrl }) => {
  const formik = useFormik({
    initialValues: { videoUrl: "" },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values) => {
      setVideoUrl(values.videoUrl);
      formik.resetForm();
    },
  });


  const handleRandomVideo = () => {
    const randomVideos = [
      "https://cdn.pixabay.com/video/2021/10/06/91069-628462649_large.mp4",
      "https://cdn.pixabay.com/video/2022/04/11/113631-698820445_large.mp4",
      "https://cdn.pixabay.com/video/2020/05/05/38126-417752207_large.mp4",
      "https://cdn.pixabay.com/video/2022/11/22/140111-774507949_large.mp4",
      "https://youtu.be/7ZP7TWiOrDs?t=10&si=8SAXOrjQhUad8m-e",
    ];
    const randomUrl = randomVideos[Math.floor(Math.random() * randomVideos.length)];
    setVideoUrl(randomUrl);
    formik.resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="video-form">
      <Typography variant="h6" className="form-title">
        Enter Video URL
      </Typography>

      <TextField
        fullWidth
        label="Video URL"
        variant="outlined"
        name="videoUrl"
        value={formik.values.videoUrl}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.videoUrl)}
        helperText={formik.errors.videoUrl}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!formik.isValid || !formik.values.videoUrl}
      >
        Play Video
      </Button>

      <Typography align="center" >
        OR
      </Typography>

      <Button variant="outlined" color="secondary" onClick={handleRandomVideo}>
        Play Random Video
      </Button>
    </Box>
  );
};

export default VideoForm;
