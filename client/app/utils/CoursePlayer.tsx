import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { MdPlayCircle } from 'react-icons/md';

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  // const [videoData, setVideoData] = useState({
  //   otp: '',
  //   playbackInfo: '',
  // });

  // useEffect(() => {
  //   // .post("https://GyanMarg-lms-7728bbd846c2.herokuapp.com/api/v1/getVdoCipherOTP", {
  //   axios
  //     .post('http://localhost:8000/api/v1/getVdoCipherOTP', {
  //       videoId: videoUrl,
  //     })
  //     .then((res) => {
  //       setVideoData(res.data);
  //     });
  // }, [videoUrl]);
  return (
    <div>
      {videoUrl?.includes('list') ? (
        <div className='aspect-video flex flex-col justify-center'>
          <h2 className='text-lg lg:text-3xl text-center'>
            Click below link to watch the Playlist
          </h2>
          <a href={videoUrl} target='_blank' title={videoUrl}>
            <MdPlayCircle
              size={140}
              className='cursor-pointer transition-all animate-spin hover:animate-none mx-auto mt-4 w-100'
              color='#4395c4'
            />
          </a>
        </div>
      ) : (
        <div
          style={{
            position: 'relative',
            paddingTop: '56.25%',
            overflow: 'hidden',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoUrl?.split('v=')[1]}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            allowFullScreen={true}
            allow='encrypted-media'
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
