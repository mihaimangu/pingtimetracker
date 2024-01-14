
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';

//For env File 
dotenv.config();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {  useUnifiedTopology: true, dbName: "pingTracker" } as ConnectOptions).then(() => {
  console.log('Connected to MongoDB database');
}).catch((err) => {
  console.error('Error connecting to MongoDB database', err);
});;

const entitySchema = new mongoose.Schema({
  name: {type: String, default: ''},
  description: {type: String, default: ''},
  history: [{type: Number}]
})

const Entity = mongoose.model('Entity', entitySchema);

const app: Application = express();
const port = process.env.PORT || 8000;
 
// Middleware for parsing JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server !!');
});

function getTimestampInSeconds () {
  return Math.floor(Date.now() / 1000)
}

app.post('/object', async (req: Request, res: Response) => {
  const name = req.body?.name
  const description = req.body?.description
 
  console.log('creating entity');

  try{
    const newEntity = await Entity.create({name, description})

    res.send({
      message:"Creating object",
      name,  
      description,
      newEntity
    });

  } catch (error){

  }
 
})

app.get('/ping', async (req: Request, res: Response) => {
  const {id} = req.query;

  console.log('sending ping', id)

  try{
    
    if (!id) {
      return res.status(400).json({ error: 'Entity ID is required.' });
    }


    // update the history with the current unix timestmap
    const object = await Entity.findOneAndUpdate({
      _id: id
    }, {$push: {history: getTimestampInSeconds()}}, {new: true})

    res.send({
      message: "Ping succesful",
      id, 
      object
    })
  } catch (err){

    res.send({
      message: "Ping fail",
      id
    })
  }

})


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
