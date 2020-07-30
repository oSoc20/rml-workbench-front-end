import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../config/index';

import CircularProgress from '@material-ui/core/CircularProgress';

const DownloadWithSocket = ({ id, onFinished }) => {
  const socket = io(BASE_URL);

  useEffect(() => {
    console.log('In use effect');
    // open socket with id
    socket.on('connect', () => {
      socket.emit('room', id);

      socket.on('message', (data) => {
        console.log(`Data received! : ${JSON.stringify(data)}`);
        window.open(BASE_URL + data.content, '_self');
        onFinished();
      });
    });

    return () => {
      socket.disconnect();
      // close socket
    };
  }, [id, socket, onFinished]);

  return <CircularProgress />;
};

export default DownloadWithSocket;
