import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Api is working')
})


app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})

// app.use((err, req, res, next)=>{
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal server error';
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   })
// })

export default app;