import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
const useStyles = require('./style');

export default function Posts({ setCurrentId }) {

    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    if (!posts.length && !isLoading) return 'No posts';

    return (
        isLoading ? <div elevation={6} className={classes.loadingPaper}><CircularProgress size='7em' /></div> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {posts?.map((post) => {
                    return <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                })}
            </Grid>
        )
    )
}
