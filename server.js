const express = require('express');
const cors = require('cors'); // ✅ import cors
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const brandRoutes = require('./routes/brandRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', brandRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
