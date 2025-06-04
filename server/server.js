const express=require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
const dotenv = require('dotenv');
dotenv.config()
const userRoutes = require('./Routes/userRouter');




require('./DB/database')
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use('/api/users', userRoutes);



app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});