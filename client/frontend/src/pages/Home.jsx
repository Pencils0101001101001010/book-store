 import { Link } from 'react-router-dom'
// import Dashboard from "./Dashboard"


const Home = () => {





  return (
    <div className="py-4">
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[400px] p-4 mx-auto">
        <Link to="/Dashboard"
        className="text-sky-400 hover:text-white items-center flex justify-center"
        >Dashboard</Link>
       
      </div>
    </div>
  )
}

export default Home
