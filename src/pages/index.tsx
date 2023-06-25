import React, { useState, useEffect, useCallback } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import Link from 'next/link';
import styled from '@emotion/styled';
import DataTable from '../components/DataTable';
import { useUIContext } from '../contexts/UIContext';
import { Column } from '../models/joke.types';
import ViewCell from '../components/Cells/ViewCell';
import AuthorCell from '../components/Cells/AuthorCell';
import TitleCell from '../components/Cells/TitleCell';
import DateCell from '../components/Cells/DateCell';
import LoginModal from '../components/LoginModal';
import { generateToken, logout } from '../helpers/login.helpers';

const AddJokeLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [jokes, setJokes] = useState([]);
  const { isDark, toggleDark } = useUIContext();
  const [open, setOpen] = useState(isLoggedIn);

  useEffect(() => {
    const getIsLoggedIn = async () => {
      try {
        const tokenResponse = await axios.post(`/api/verify`);
        const isLogged = tokenResponse.data.decoded ? true : false;
        setOpen(!isLogged);
        setIsLoggedIn(isLogged);
      } catch (error) {
        console.log(error);
      }
    };

    getIsLoggedIn();
  }, []);

  useEffect(() => {
    const getJokes = async () => {
      console.log('getJokes')
      try {
        setLoading(true);
        const jokesResp = await axios.get(
          `/api/joke?page=${currentPage}&limit=${rowsPerPage}`
        );
        // console.log(JSON.stringify(jokesResp.data))
        setJokes(jokesResp.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getJokes();
  }, [currentPage, rowsPerPage]);

  const onChange = useCallback((newPage: number, newRowsPerPage: number) => {
    // TODO do the request
    console.log('newPage', newPage);
    console.log('newRowsPerPage', newRowsPerPage);
    setCurrentPage(newPage);
    setRowsPerPage(newRowsPerPage);
  }, []);

  console.log('currentPage', currentPage);
    console.log('rowsPerPage', rowsPerPage);

  const handleLogin = useCallback(async () => {
    try {
      const tokenResponse = await axios.post(`/api/login`, {
        user: {
          id: '123',
          username: 'john.doe',
        },
      });
      const token = tokenResponse.data.token;
      generateToken(token);
      setOpen(false);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('error');
    }
  }, []);

  const handleLogout = useCallback(() => {
    try {
      logout();
      setIsLoggedIn(false);
      setOpen(true);
    } catch (error) {
      console.log('Logout error', error);
    }
  }, []);

  const columns: Column[] = [
    {
      id: 'Title',
      label: 'Title',
      cellFormatter: TitleCell,
    },
    {
      id: 'Author',
      label: 'Author',
      cellFormatter: AuthorCell,
    },
    {
      id: 'CreatedAt',
      label: 'Created Date',
      cellFormatter: DateCell,
    },
    {
      id: 'Views',
      label: 'Views',
      cellFormatter: ViewCell,
    },
  ];

  return (
    <Container
      maxWidth="lg"
      css={{
        background: isDark ? '#000' : '#fff',
        color: isDark ? '#fff' : '#4d4d4d',
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
        {isLoggedIn && (
          <Grid container justifyContent="flex-end" padding={1}>
            <Grid item>
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        )}

        <Typography variant="h4" component="h1" gutterBottom>
          The bartender says, “Success, but you’re not ready!”
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          So a JavaScript function walks into a bar.
        </Typography>
        {isLoggedIn && (
          <>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              padding={2}
            >
              <Grid item>
                <Typography variant="h6" component="h6" gutterBottom>
                  <AddJokeLink href={`/joke/add`}>Add new joke</AddJokeLink>
                </Typography>
              </Grid>
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={isDark} onChange={toggleDark} />
                    }
                    label="Dark"
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <DataTable
              rows={jokes}
              loading={loading}
              columns={columns}
              onChange={onChange}
              cpage={currentPage}
              cRowsPerPage={rowsPerPage}
            />
          </>
        )}
        <LoginModal open={open} onButtonClick={handleLogin} />
      </Box>
    </Container>
  );
}
