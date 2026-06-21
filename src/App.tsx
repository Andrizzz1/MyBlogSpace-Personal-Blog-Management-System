import { useState ,useEffect} from "react"
import { SquarePen } from 'lucide-react';
import { useNavigate } from "react-router-dom";

type Post = {
    id:number
    title: string
    author: string
    tag: string
    details: string
}

function App() {
  const navigate = useNavigate()
  const [contents, setContents] = useState<Post[]>([])

  const handleGetData = async ()=>{
    const response = await fetch('http://localhost:3000/posts')
    const data = await response.json()
    if(response.ok){
      setContents(data)
    }
  }

  useEffect(()=>{
    handleGetData()
  },[])
  
  return (
    <section className="max-sm:px-1 min-h-screen " >
      <div className="flex flex-col items-center">    
        {contents.length === 0?(
          <div className="flex flex-col items-center justify-center min-h-screen  border-amber-950">
            <h1 className="text-center text-4xl font-cormorant font-bold ">No blog posts yet.</h1>
            <p className="text-gray-500 font-inter">Start by creating your first post.</p>
          </div>
        ):contents.toReversed().map((content, i)=>(
          i === 0?(
            <div key={i} className="border-b border-gray-300 w-full flex justify-center md:w-3xl lg:w-4xl p-5 mt-28 flex-col gap-2 animate-fadeIn">
              <div className="flex justify-between">
                  <p className="text-xs text-gray-500">FEATURED · {new Date().toDateString()}</p>
                  <SquarePen onClick={()=>{
                    navigate('/EditPost',{state:content})
                  }} className="cursor-pointer" size={20}/>
              </div>
              
              <h1 className="text-5xl font-cormorant font-bold text-[#9B1F1B]">{content.title}</h1>
              <p className="font-semibold">{content.author}</p>
              <p className="text-xs text-gray-500">{content.tag}</p>
              <p>{content.details}</p>
            </div>
          ):(
            <>
            {i === 1 && ( // ← only renders once, before the first "other" post            
                  <h2 className="font-cormorant text-xl font-bold mt-5  ">Recent entries</h2>     
            )}
              <div key={i} className="w-full md:w-3xl lg:w-4xl  p-5 mt-10 flex flex-col gap-2">
                <div className="flex justify-between  max-sm:flex-wrap ">
                  <div className="flex gap-10 items-center">
                    <p className="text-gray-500 text-xs">{new Date().toDateString()}</p>
                    <div className="grid gap-2 md:w-xl lg:w-2xl">
                      <p className=" text-xs text-[#9B1F1B]">{content.tag}</p>
                      <h1 className="text-4xl font-cormorant ">{content.title}</h1>
                      <p className="text-gray-500 text-xs">{content.details}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <SquarePen onClick={()=>{
                    navigate('/EditPost',{state:content})
                  }} className="cursor-pointer" size={15} />
                    <p className="text-xs text-gray-500 text-center">{content.author}</p>
                  </div>
               
                </div>
              </div>
              </>
            )))}
      </div>
    </section>
  )
}

export default App
