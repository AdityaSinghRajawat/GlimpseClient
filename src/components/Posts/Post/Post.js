import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';
import useStyles from './style';

export default function Post({ post, setCurrentId }) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [likes, setLikes] = useState(post?.likes);

  // console.log(user?.result);
  // console.log(post);
  // console.log(post?.creator);

  const userId = (user?.result?.googleId || user?.result?._id);
  const hasLikedPost = likes.find((like) => like === (user?.result?.googleId || user?.result?._id));


  const handleLike = () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }

  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize='small' />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlinedIcon fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        )
    }
    return <><ThumbUpAltOutlinedIcon fontSize='small' />&nbsp;Like</>;
  }

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  }

  return (
    <Card className={classes.card} raised elevation={6}>

      <div className={classes.cardAction} onClick={openPost}>


        <CardMedia
          className={classes.media}
          image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>

        {user ? (user?.result?.name === post?.name || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        ) : ''}

        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>

        <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' gutterBottom>{post.message}</Typography>
        </CardContent>

      </div>

      <CardActions className={classes.cardActions}>
        {user ? <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button> : ''}
        {user ? (user?.result?.name === post?.name || user?.result?._id === post?.creator) && (
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        ) : ''}
      </CardActions>

    </Card>
  )
}
