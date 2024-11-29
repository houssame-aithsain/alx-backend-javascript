import express from 'express';
import mapRoutes from './routes';

const app = express();
const PORT = 1245;

// Map routes
mapRoutes(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
