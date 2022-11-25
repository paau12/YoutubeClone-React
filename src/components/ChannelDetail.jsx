import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import {Videos, ChannelCard} from './';
import { fetchFromApi } from '../utils/fetchFromAPI';


const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([])

  console.log(channelDetail, videos);

  const {id} = useParams();

  useEffect(() => {
    fetchFromApi(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1)100%)',
          zIndex: 10,
          height: '300px'
        }}/>
          <ChannelCard channelDetail={channelDetail} marginTop= "-95px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{mr: {sm: '150px'}}}/>
          <Videos videos={videos}></Videos>
      </Box>
    </Box>
  )
}

export default ChannelDetail