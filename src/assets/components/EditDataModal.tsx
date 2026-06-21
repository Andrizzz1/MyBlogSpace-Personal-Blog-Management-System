import { ArrowLeft, Trash2} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function EditPlaceholder(){
    const {state} = useLocation()
    const navigate = useNavigate()

    if (!state) {
            navigate('/')
        return null  // ← never reaches useState if no state
    }
    const [formData, setFormData] = useState({
        id:state.id,
        title: state.title,
        author:state.author,
        tag:state.tag,
        details:state.details
    })

     const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const [editMode, setEditMode] = useState(false)
    const handleData = async(e: React.FormEvent, action : 'PATCH' | 'DELETE')=>{
        e.preventDefault()

            if (action === "DELETE"){
                const response = await fetch(`http://localhost:3000/posts/${state.id}`,{
                    method: "DELETE"
                })
                if(response.ok) navigate('/')
            }else{
                const response = await fetch(`http://localhost:3000/posts/${state.id}`,{
                    method: 'PATCH',
                    headers: {"Content-Type":"application/json"},
                    body : JSON.stringify(formData)         
            })
                if(response.ok){
                    setEditMode(false)
                }
            }

        }
    
    return <section className="flex justify-center mt-26">
        {!editMode?(
        <div className="w-full md:w-4xl p-5">
            <Link className="flex text-gray-500" to={'/'}>
                <ArrowLeft />
                Back to journal
            </Link>
            <p className="text-[#9B1F1B] my-3">{formData.tag}</p>
            <h1 className="font-semibold text-5xl my-3">{formData.title}</h1>
            <p className="border-y border-gray-200 my-3 py-4">{formData.author}  ·  <span className="text-gray-500">{new Date().toDateString()}</span></p>
            <p>{formData.details}</p>
            <div className="flex justify-between my-5">
                <button onClick={()=>{setEditMode(true)}} className="px-4 py-1 rounded-2xl cursor-pointer bg-[#9B1F1B] text-white">Edit Entry</button> 
                <button onClick={(e) => handleData(e, 'DELETE')} className="text-gray-600 flex items-center gap-1 hover:text-gray-800 cursor-pointer">
                    <Trash2 size={16}/>
                    Delete</button>
            </div>
        </div>
        ):(
            <form onSubmit={(e) => handleData(e, 'PATCH')} className="flex flex-col gap-2 mt-4 md:w-4xl " method="patch">
            <Link className="flex text-gray-500" to={'/'}>
                <ArrowLeft />
                Back to journal
            </Link>
                <label htmlFor="title" className="text-gray-500 px-3 text-sm">EDITING</label>
                <input value={formData.title} onChange={handleChange} id="title" className="text-4xl md:text-5xl font-cormorant p-3 outline-none border-b border-gray-300 mb-4" type="text" name="title" placeholder="A title worth reading" required/>
                <div className="grid md:grid-cols-2 gap-2">
                    <input value={formData.author} onChange={handleChange} className="bg-white p-3 rounded-xl" name="author" type="text" placeholder="author" required/>
                    <input value={formData.tag} onChange={handleChange} className="bg-white p-3 rounded-xl" name="tag" type="text" placeholder="Tag (e.g. Essay, Travel)" required/>
                </div>

                <textarea value={formData.details} onChange={handleChange}  className="resize-none min-h-96 bg-white p-3 rounded-xl" name="details" placeholder="Begin writing..."></textarea>
                <div className="flex justify-between mt-5">
                    <p className="text-xs">Saved locally to your device.</p>
                    <button type="submit" className="bg-[#9B1F1B] text-white px-5 py-2 rounded-xl">Publish</button>
                </div>
            </form>
        )}
    </section>
}