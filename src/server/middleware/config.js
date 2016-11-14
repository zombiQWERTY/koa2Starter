const maxAge = '1200';

const origin = [
  'http://localhost:8080'
].join(',');

const methods = [
  'OPTIONS',
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'HEAD'
];

const headers = [
  'X-Requested-With',
  'If-Modified-Since',
  'Cache-Control',
  'DNT',
  'X-CustomHeader',
  'Keep-Alive',
  'User-Agent',
  'Content-Type',
  'Authorization',
  'Pragma'
];

const expose = [
  'Authorization'
].join(',');

export default {
  origin,
  methods,
  headers,
  expose,
  maxAge,
  credentials: true
};
