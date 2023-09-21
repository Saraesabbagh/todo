const express= require("express")
const mongoose = require("mongoose");
const cors= require("cors");
const {readdirSync} = require("fs");
const dotenv = require("dotenv");
dotenv.config()


const app = express();
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r )));

//database
mongoose
.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
})
.then(() => console.log("database connected sucessfully"))
.catch((err)=> console.log('error connecting to mongodb', err));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}...`)
})

// app.listen(8000, ()=> {
//     console.log("server is listening...")
// })

// let allowed = ["http://localhost:3001"]

// function options(req, res){
//     let tmp;
//     let origin = req.header("origin");
//     if(allowed.indexOf(origin)>-1){
//         tmp={
//             origin: true,
//             optionSuccessStatus: 200, 
//         }
//     }else {
//         tmp ={
//             origin: "false",
//         }
//     }
//     res(null, tmp)
// }
// app.use(cors(options));


// app.get('/', (req, res) =>{
//     res.send("welcome from home")
// })

