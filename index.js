const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5001;

const client = new MongoClient(
  process.env.AUTH_DB_URL,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);
async function startServer() {
  try {
    await client.connect();
    const db = client.db('fashion_db')
    const productCollection = db.collection('dress')
    const shoesCollection =db.collection('shoes')
    const makupCollection=db.collection('makup')

// dress Collection

    app.get('/dress', async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.get('/dress/:id',async(req,res)=>{
      const id =req.params.id;
      const result=await productCollection.findOne({_id : new ObjectId(id)})
      res.send(result)
    })
    app.post('/dress',async(req,res)=>{
      const data=req.body;
      const result=await productCollection.insertOne(data)
      res.send(result)
    })

    // Shoose Collection

    app.get('/shoes',async(req,res)=>{
      const cursor=shoesCollection.find()
      const result=await cursor.toArray()
      res.send(result);
    })

    app.get('/shoes/:id',async(req,res)=>{
      const id=req.params.id;
      const result=await shoesCollection.findOne({_id: new ObjectId(id)})
      res.send(result)
    })
    
    app.post('/shoes',async(req,res)=>{
      const data=req.body;
      const result=await shoesCollection.insertOne(data)
      res.send(result)
    })

    // Makeup collection
    app.get('/makup',async(req,res)=>{
      const cursor= makupCollection.find()
      const result=await cursor.toArray()
      res.send(result);
    })

    app.get('/makup/:id',async(req,res)=>{
      const id=req.params.id;
      const result=await makupCollection.findOne({_id:new ObjectId(id)})
      res.send(result)
    })
    
    app.post('/makup',async(req,res)=>{
      const data=req.body;
      const result=await makupCollection.insertOne(data)
      res.send(result)
    })

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

    await client.db('admin').command({ping:1});
    console.log("MongoDB Atlas connected successfully!");
  }finally{

  }
  
}
startServer();

