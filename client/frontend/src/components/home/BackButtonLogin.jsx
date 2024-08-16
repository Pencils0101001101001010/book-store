import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

 
// error button was underlined but functionality was still working 
// eslint-disable-next-line react/prop-types
const BackButtonLogin = ( {destination = '/user/login'} ) => {
  return (
    <div className='flex'>
        <Link 
        to={destination}
        className='bg-gradient-to-r from-blue-800 to-blue-300 hover:to-blue-100 text-white px-4 py-1 rounded-lg w-fit'
        >
            <BsArrowLeft />
        </Link>
    </div>
  )
}

export default BackButtonLogin