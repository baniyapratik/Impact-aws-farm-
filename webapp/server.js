const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './.env' });

const connectToMongoDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log(`Connection to MongoDB successful`);
    }
  } catch (err) {
    console.log(`Error while connecting to MOngDB :   ${err}`);
  }
};
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

connectToMongoDb();
