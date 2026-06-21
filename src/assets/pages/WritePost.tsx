import { ArrowLeft} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const WritePost =()=>{
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        author:"",
        tag:"",
        details:""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    async function HandleSubmit(e: React.FormEvent){
        e.preventDefault();

        const response = await fetch('http://localhost:3000/posts',{
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body : JSON.stringify(formData)
        });
        
        if (response.ok){
            navigate('/')
        }

    }
  return (
    <div  className="mt-28 w-full flex justify-center font-inter">
        <div className="w-full md:w-4xl p-5">      
            <Link className="flex text-gray-500" to={'/'}>
                <ArrowLeft />
                Back to journal
            </Link>
            <form onSubmit={HandleSubmit} className="flex flex-col gap-2 mt-4 " method="post">
                <label htmlFor="title" className="text-gray-500 px-3">New entry</label>
                <input onChange={handleChange} id="title" className="text-4xl md:text-5xl font-cormorant p-3 outline-none border-b border-gray-300 mb-4" type="text" name="title" placeholder="A title worth reading" required/>
                <div className="grid md:grid-cols-2 gap-2">
                    <input onChange={handleChange} className="bg-white p-3 rounded-xl" name="author" type="text" placeholder="author" required/>
                    <input onChange={handleChange} className="bg-white p-3 rounded-xl" name="tag" type="text" placeholder="Tag (e.g. Essay, Travel)" required/>
                </div>

                <textarea onChange={handleChange}  className="resize-none min-h-96 bg-white p-3 rounded-xl" name="details" placeholder="Begin writing..."></textarea>
                <div className="flex justify-between mt-5">
                    <p className="text-xs">Saved locally to your device.</p>
                    <button type="submit" className="bg-[#9B1F1B] text-white px-5 py-2 rounded-xl">Publish</button>
                </div>
            </form>
        </div>
    </div>
  );
}