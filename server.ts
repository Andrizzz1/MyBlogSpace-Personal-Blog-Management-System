import  express  from "express"
import type{ Request,Response } from "express"
import cors from "cors";
const app = express() 


app.use(cors()); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 3000
type Post = {
    title: string
    author: string
    tag: string
    details: string
}

let posts: Post[] = []



app.post("/posts",(req:Request,res:Response)=>{
    const newPost = req.body
    posts.push(newPost)
    res.json(newPost)
})

app.get("/posts",(req:Request,res:Response)=>{
     res.json(posts)
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
