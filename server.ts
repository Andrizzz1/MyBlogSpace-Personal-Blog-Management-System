import  express  from "express"
import type{ Request,Response } from "express"
import cors from "cors";
const app = express() 


app.use(cors()); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 3000
type Post = {
    id:number
    title: string
    author: string
    tag: string
    details: string
}

let posts: Post[] = []
let id:number = 0


app.post("/posts",(req:Request,res:Response)=>{
    const newPost = {id: id++, ...req.body}
    posts.push(newPost)
    res.json(newPost) 
})

app.get("/posts",(req:Request,res:Response)=>{
     res.json(posts)
})

app.patch("/posts/:id",(req:Request,res:Response)=>{
    const userId = Number(req.params.id)
    posts = posts.map((post,i)=>
        post.id === userId?{...post,...req.body}:post)
    res.json({message: "Post Updated"})
    
})

app.delete("/posts/:id",(req:Request,res:Response)=>{
    const userId = Number(req.params.id)
    posts = posts.filter((post)=> post.id !== userId)
    res.json({message: "Post Updated"})
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
