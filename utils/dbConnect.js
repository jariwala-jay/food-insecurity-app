// utils/dbConnect.js
import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect('mongodb+srv://jayjariwala017:AGKqDTKKAIsPjKJH@precisionfoodrx.xays3.mongodb.net/?retryWrites=true&w=majority&appName=PrecisionFoodRx', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default dbConnect;
