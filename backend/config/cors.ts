module.exports = {
  origin: [process.env.PUBLIC_API_URL, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  headers: ['Content-Type', 'Authorization'],
  keepHeaderOnError: true,
};
