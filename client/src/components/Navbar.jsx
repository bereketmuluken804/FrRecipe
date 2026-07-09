import { Link, NavLink} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
   const {user, logout} = useAuth();
   const navigate = useNavigate();

   const handleLogout = (e) => {
      logout();
      navigate("/");
   }

   if(user){
      return (
      <nav>
         <ul>
            <li>
               <Link to='/'>Public Recipes</Link>
            </li>
            <li>
               <Link to='/my-kitchen'>My Kitchen</Link>
            </li>
            <li>
               <NavLink to='/recipes/123'>Recipe Details</NavLink>
            </li>
            <button onClick={handleLogout}>Logout</button>
         </ul>
         </nav>
      );
   }
   return (
      <nav>
         <ul>
            <li>
               <Link to='/'>Public Recipes</Link>
            </li>
            <li>
               <Link to='/register'>Register</Link>
            </li>
            <li>
               <Link to='/login'>Login</Link>
            </li>
         </ul>
         </nav>
   )
}

export default Navbar;