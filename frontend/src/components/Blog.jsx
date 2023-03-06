
import {Card,CardHeader,CardMedia,Typography, CardContent,Avatar }from '@mui/material';

function Blog({title,description,imageUrl,userName}) {

  return (
    <Card sx={{ width:'40%',margin :'auto',mt:2, padding:2,
    boxShadow:'5px 5px 10px #ccc',":hover:":{
      boxShadow:'10px 10px 20px #ccc',
    },}}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
          {userName}
        </Avatar>
      }
      title={title}
    />
    <CardMedia
      component="img"
      height="194"
      image={imageUrl}
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    
    
  </Card>
  )
}

export default Blog