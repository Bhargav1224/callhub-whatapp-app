const express=require('express');
const mongoose=require('mongoose');
const Messages=require('./models/whatsapp.model.js');
const Pusher=require('pusher');
const cors=require('cors');

// app config
const app = express();
const port =8000;

//  appId: "1190098",
//     key: "17e7a26828f544413d68",
//     secret: "88ecc096b52feb5e1aac",
//     cluster: "ap2",

const pusher = new Pusher({ 
    appid : "1267797",
    key : "1cce8781a854a5f7c39e",
    secret : "8fc34391055807fd97fb",
    cluster : "ap2",
    useTLS: true
  }); 

// middleware
app.use(express.json())
app.use(cors())

// DB config
const connection_url = 'mongodb+srv://bhargav:bhagi1224@cluster0.dagbu.mongodb.net/whatsapp?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection

db.once('open', () => {
    console.log("DB Connected");

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);
   
        if (change.operationType == 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received,
                });
        } else {
            console.log('Error triggering Pusher')
        }
    })
});


// api routes
app.get("/", (req,res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })

});
// listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
