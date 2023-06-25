import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import queryString from 'query-string';

const jokeBaseUrl = 'https://retoolapi.dev/zu9TVE/jokes';

type Filters = {
  _params?: string;
  _limit?: string;
  id?: string;
};

const getJokes = (filters: Filters, id: any) => {
  const params = {
    ...filters,
  };

  const qs = queryString.stringify(params);

  const path = id ? `/${id}` : '';
  const url = `${jokeBaseUrl}${path}?${qs}`;
  console.log('url', url);
  return axios.get(url);
};

const transformItem = (item: any) => ({
  ...item,
  Title: item.Title || item.title,
  Author: item.Author || item.author,
  Views: item.Views || item.views,
  CreatedAt: item.CreatedAt || item.createdAt || item.createdat,
});

const transformData = (data: any) => {
  if (Array.isArray(data)) {
    console.log('data', data);
    return data.map((item: any) => transformItem(item));
  }
  return transformItem(data);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // return axios.delete(`${jokeBaseUrl}/1686521618148`);

  if (req.method === 'GET') {
    const params = {
      _params: req.query.page || '0',
      _limit: req.query.limit || '5',
    };

    // console.log("req.query", req.query);
    // console.log("req.params", req.params);
    // console.log("req.body", req.body);

    try {
      //@ts-ignore
      const response = await getJokes(params, req.query.id);
      console.log(response.data);
      const transformedData = transformData(response.data);
      res.status(200).json(transformedData);
    } catch (error: any) {
      console.log('error', error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      // console.log("req.query", req.query);
      // console.log("req.params", req.params);
      // console.log("req.body", req.body);

      console.log(`${jokeBaseUrl}${req.body.id ? `/${req.body.id}` : ''}`);

      const bodyForNewJoke = {
        ...req.body,
        createdAt: Date.now(),
      };

      const data = req.body.id ? req.body : bodyForNewJoke;

      console.log(data);

      await axios({
        method: req.body.id ? 'put' : 'post',
        url: `${jokeBaseUrl}${req.body.id ? `/${req.body.id}` : ''}`,
        data,
      });

      await axios.post(jokeBaseUrl, req.body);
      res.status(200).send('success');
    } catch (err: any) {
      console.log('error', err);
      return res.status(400).send({ message: err.message });
    }
  }
};

export default handler;
