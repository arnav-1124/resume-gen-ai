const app = require('./src/app');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
dotenv.config();
const { invokeGeminiAI } = require('./src/services/ai.service');


connectDB();
invokeGeminiAI();

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});