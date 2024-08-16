// import packages
import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import { dbConnection } from "./config/dbConfig.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import expressOasGenerator from '@mickeymond/express-oas-generator';
import userRoutes from './routes/userRoutes.js';
import instructorRouter from "./routes/instructorRoutes.js";
import studentRoter from "./routes/studentRoutes.js"


// import adaptiveLearningRoutes from './routes/adaptiveLearningRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import chatRoutes from './routes/chatRoutes.js';
// import gamificationRoutes from './routes/gamificationRoutes.js';
// import oerRoutes from './routes/oerRoutes.js';
// import recommendationRoutes from './routes/recommendationRoutes.js';
// import videoRoutes from './routes/videoRoutes.js';
// import socketServer from './controllers/chatController.js';




// create express app
const app = express();


// Dbconnection
dbConnection();



expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ["user", "outage", "neighbourhood"],
    mongooseModels: mongoose.modelNames()
})


// Middleware

app.use(cors({ credentials:true, origin:" * " }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure:false },

    store:MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}));



// Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', instructorRouter);
app.use('/api/v1', studentRoter);

// app.use('/api/adaptive-learning', adaptiveLearningRoutes);
// app.use('/api/chat', chatRoutes);
// app.use('/api/gamification', gamificationRoutes);
// app.use('/api/oer', oerRoutes);
// app.use('/api/recommendations', recommendationRoutes);
// app.use('/api/video', videoRoutes);

// OpenAPI generator requests handling
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));



// port 
const port = process.env.PORT || 2323;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});