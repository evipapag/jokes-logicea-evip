import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useRouter } from 'next/router';
import Form from './Form';

export default function JokePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jokeData, setJokeData] = useState({});

  useEffect(() => {
    const getJokeInfo = async () => {
      try {
        const id = router.query.id;
        setLoading(true);
        const jokesResp = await axios.get(`/api/joke?id=${id}`);
        console.log(JSON.stringify(jokesResp.data));
        setJokeData(jokesResp.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (router.query.id && router.query.id !== 'add') {
      getJokeInfo();
    }
  }, [router.query.id]);

  return (
    <Container
      maxWidth="lg"
      css={{
        paddingTop: '20px',
        paddingBottom: '20px',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading && <div>Loading...</div>}
        {!loading && <Form data={jokeData} />}
      </Box>
    </Container>
  );
}
