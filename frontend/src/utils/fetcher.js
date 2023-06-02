import axios from 'axios';

const fetcher = ([url, config, base]) => {
  if (!url) return;

  return axios({
    url: `${base || import.meta.env.VITE_BACKEND}${url}`,
    method: 'get',
    ...config,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then((res) => res.data);
};

export default fetcher;
