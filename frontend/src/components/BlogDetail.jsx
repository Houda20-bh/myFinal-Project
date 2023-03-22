import React, {useState } from "react";
import { updateBlog } from '../Redux/blogSlice';
import {useDispatch} from 'react-redux';
import {EditBlog} from '../Redux/blogSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {  Box,Button, InputLabel, TextField, Typography } from "@mui/material";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

function BlogDetail({title,description,id}) {
  const [updatedBlog, setUpdatedBlog] = useState({});
  const dispatch=useDispatch();
  const navigate = useNavigate()
  const handleChange = (e) => {
    setUpdatedBlog(({...updatedBlog,
      [e.target.name]: e.target.value,
    }));
  };
  const updateHandler =(e)=>{
    e.preventDefault();
    dispatch(updateBlog({id,updatedBlog,navigate,toast}))
  };
  const cancelHandler =(e)=>{
    e.preventDefault();
    dispatch(EditBlog(id));
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
            {id? "update your blog":"you can not update"}
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              margin="auto"
              variant="outlined"
              defaultValue={title}
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              margin="auto"
              variant="outlined"
              defaultValue={description}
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
    );
};

export default BlogDetail
