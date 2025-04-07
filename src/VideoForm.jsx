import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./App.css";

const validationSchema = yup.object({
  videoUrl: yup.string().url("Enter a valid URL").required("Video URL is required"),
});

const VideoForm = ({ setVideoUrl }) => {
  const formik = useFormik({
    initialValues: { videoUrl: "" },
    validationSchema,
    onSubmit: (values) => {
      setVideoUrl(values.videoUrl);
      formik.resetForm();
    },
  });

  const handleRandomVideo = () => {
    const randomVideos = [
      "https://cdn.pixabay.com/video/2021/10/06/91069-628462649_large.mp4",
      "https://cdn.pixabay.com/video/2021/03/08/67358-521707474_large.mp4",
      "https://cdn.pixabay.com/video/2022/04/11/113631-698820445_large.mp4",
      "https://youtu.be/7ZP7TWiOrDs?si=aWoV71kDMGWscAE7",
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="video-form"
    >
      <Typography variant="h6" className="form-title">Enter Video URL</Typography>
      <TextField
        fullWidth
        label="Video URL"
        variant="outlined"
        name="videoUrl"
        value={formik.values.videoUrl}
        onChange={formik.handleChange}
        error={formik.touched.videoUrl && Boolean(formik.errors.videoUrl)}
        helperText={formik.touched.videoUrl && formik.errors.videoUrl}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={!formik.isValid || !formik.values.videoUrl}
      >
        Play Video
      </Button>
      <Typography>OR</Typography>
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={handleRandomVideo}
      >
        Play Random Video
      </Button>
    </Box>
  );
};

export default VideoForm;