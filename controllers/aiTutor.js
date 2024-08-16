import { GoogleGenerativeAI } from "@google/generative-ai";
// import

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});



async function run() {
    const prompt = "Write a story about an AI and magic"
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
  run();




//   import io from 'socket.io';

// const socketServer = (server) => {
//   const ioInstance = io(server);

//   ioInstance.on('connection', (socket) => {
//     console.log('New user connected');

//     socket.on('chat message', (msg) => {
//       ioInstance.emit('chat message', msg);
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });

//   return ioInstance;
// };

// export default socketServer;
