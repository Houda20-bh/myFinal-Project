
import React, {useState } from "react";
import { updateBlog } from '../Redux/blogSlice';
import {useDispatch} from 'react-redux';
import {EditBlog} from '../Redux/blogSlice';
import {  Box,Button, InputLabel, TextField, Typography } from "@mui/material";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
function BlogDetail({blog}) {
  const dispatch=useDispatch();
const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
   setInputs(({...inputs,
      [e.target.name]: e.target.value,
    }));
  };
  const updateHandler =(e)=>{
    e.preventDefault();
    dispatch(updateBlog({id:blog._id,title:inputs.title,description:inputs.description}))
  };
  const cancelHandler =(e)=>{
    e.preventDefault();
    dispatch(EditBlog (blog._id));
  }
    return (
         <div>
        <form>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
             You can Edit your post
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              margin="auto"
              variant="outlined"
            />

            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
             onClick={updateHandler}
            >
             update
            </Button>
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              onClick={cancelHandler}
            >
             Cancel
            </Button>
          </Box>
        </form>

    </div>
    )
}

export default BlogDetail
