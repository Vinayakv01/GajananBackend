const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
dotenv.config();

const brandRoutes = require('./routes/master/BrandRoutes');
const userRoutes = require('./routes/master/UserRoutes');
const categoryRoutes = require('./routes/master/CategoryRoutes');
const companyRoutes = require('./routes/master/CompanyRoutes');
const conceptRoutes = require('./routes/master/ConceptRoutes');
const finishtypesRoutes = require('./routes/master/FinishTypeRoutes');
const itemstatusRoutes = require('./routes/master/ItemStatusRoutes');
const manufacturerRoutes = require('./routes/master/ManufacturerRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', brandRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', companyRoutes);
app.use('/api', conceptRoutes);
app.use('/api', finishtypesRoutes);
app.use('/api', itemstatusRoutes);
app.use('/api', manufacturerRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
