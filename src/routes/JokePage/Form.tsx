import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import MuiGrid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { Joke } from '../../models/joke.types';

const Grid = styled(MuiGrid)`
  margin-top: 20px;
`;

const Form = ({ data }: { data: Joke }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [title, setTitle] = useState(data?.Title || '');
  const [body, setBody] = useState(data?.Body || '');
  const [author, setAuthor] = useState(data?.Author || '');
  const [createdAt, setCreatedAt] = useState(data?.CreatedAt || '');

  const handleGoBack = () => {
    router.back();
  };

  const handleClick = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post(`/api/joke`, {
        id: data.id || null,
        title,
        body,
        author,
        createdAt,
      });

      setLoading(false);
      setSuccess(true);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }, [title, body, author, createdAt, data.id]);

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
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="text"
              color="primary"
              startIcon={<ArrowBack />}
              onClick={handleGoBack}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Body"
              multiline
              value={body}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setBody(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Author"
              value={author}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAuthor(event.target.value);
              }}
            />
          </Grid>
          {data && data?.id && (
            <Grid item xs={12}>
              <TextField
                label="Created At"
                value={createdAt}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCreatedAt(event.target.value);
                }}
              />
            </Grid>
          )}
          <Grid item container xs={12}>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                onClick={handleClick}
              >
                Save
              </Button>
            </Grid>
            <Grid item>
              <div style={{ paddingLeft: '10' }}>
                {loading && 'Sending..'}
                {error && 'Ooops..'}
                {success && 'Joke submitted!'}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Form;
