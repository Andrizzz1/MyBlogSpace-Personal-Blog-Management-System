import { PencilLine } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Header(){
    return  <header className="border-b border-gray-300 w-full  flex md:justify-center py-5 fixed top-0 bg-white/30 backdrop-blur-sm">     
          <div className='flex justify-between max-sm:px-4 md:w-3xl lg:w-6xl'>
            <div className="flex items-center gap-1">
                <div className="bg-[#9B1F1B] py-3 px-5 rounded-full">
                  <p className="font-bold text-white font-cormorant">B</p>
                </div>
                <div>
                  <h2 className="font-bold text-xl font-cormorant">MyBlogSpace</h2>
                  <p className="text-gray-500 text-sm  font-inter">A Personal Blog Management System</p>
                </div>            
            </div>
            <Link to={'/Writepost'}>
            <button  className="font-cormorant max-sm:hidden flex items-center gap-1 bg-[#9B1F1B] px-2  md:py-2 lg:px-5 rounded-4xl text-white font-semibold cursor-pointer">
                <PencilLine size={20}/>
                <span >Write a Post</span>
              </button>
            </Link>
          </div>   
        </header>
}