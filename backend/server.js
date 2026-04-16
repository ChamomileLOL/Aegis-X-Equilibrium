const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Load the environment (The laws of physics)
dotenv.config();

// 2. Initialize the Application (The creation of the Universe)
const app = express();

// 3. Import the Policy Routes (The specific decrees)
const policyRoutes = require('./routes/policy');

// 4. Global Middleware (Preparing the citizens)
app.use(cors());
app.use(express.json());

// 5. Connect the Routes to the App (Enforcing the decrees)
// This MUST happen after 'app' is initialized above
app.use('/api/policy', policyRoutes);

// 6. Database Connection (Linking to the infinite)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("The Universe is Balanced... Connected to Atlas."))
    .catch((err) => console.log("Connection Failed. Reality is Disappointing.", err));

// 7. Base Route
app.get('/', (req, res) => {
    res.send("Aegis-X Equilibrium System is Online. Monitoring Conduct...");
});

// 8. Start the Pulse
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on the narrow path: ${PORT}`));