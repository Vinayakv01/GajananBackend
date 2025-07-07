const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
dotenv.config();

const brandRoutes = require('./routes/master/BrandRoutes');
const userRoutes = require('./routes/master/UserRoutes');
const createUserSchema = require('./routes/master/CategoryRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', brandRoutes);
app.use('/api', userRoutes);
app.use('/api', createUserSchema);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
