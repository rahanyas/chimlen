import mongoose from "mongoose";

const connect_db = async () => {
      try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb conneted')
      } catch (err) {
        console.error('connection failed', err);
        process.exit(1)
      }
};

export default connect_db