import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import { db } from './Firebase/config';

const useStyles = makeStyles({
  root: {
    maxWidth:' 345px',
    minWidth:' 300px',
    maxHeight: '263px'
  },
  media: {
    height: 160,
  },
});

export default function PostStrip( { post}) {

const classes = useStyles();
 const history = useHistory()


 
  return (
    <Card className={classes.root} onClick={()=>{history.push(`/postDetails/${post.id}`)}}>
      <CardActionArea>
        <CardMedia
         component="img"
         height="140"
          className={classes.media}
          title={post.caption}
          image={post.ImageDownloadUrl}
        
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{overflow:'hidden'}}>
                    {post.caption}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
                    {post.post}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}