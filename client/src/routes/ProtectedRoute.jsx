import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';


export function ProtectedRoute({ children }) {
   const { user } = useAuth();

   if(!user){
      return <Navigate to='/login' />
   }
   else{
      return children 
   }
}