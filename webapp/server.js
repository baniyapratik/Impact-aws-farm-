const mongoose = require('mongoose');
const app = require('./app');
const keys = require('./config/keys')

const connectToMongoDb = async () => {
  try {
    const connection = await mongoose.connect(keys.mongoURI, {
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
const port = process.env.PORT || 6426;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

connectToMongoDb();
