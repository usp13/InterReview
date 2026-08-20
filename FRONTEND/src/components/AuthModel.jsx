import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Auth from '../pages/Auth.jsx';

function AuthModel({ onClose }) {
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      onClose();
    }
  }, [userData, onClose]);

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/10 backdrop-blur-sm px-4'>
      <div className='relative w-full max-w-md'>
        <button
          onClick={onClose}
          className='absolute top-8 right-8 text-slate-400 hover:text-white transition-colors duration-200 text-xl z-50'
        >
          <FaTimes size={18} />
        </button>
        <Auth isModel={true} onClose={onClose} />
      </div>
    </div>
  );
}

export default AuthModel;