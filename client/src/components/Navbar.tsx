import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const { isAuth } = useSelector((state: any) => state.auth)
    return (
        <nav className='navbar brand-light bg-light'>
            <div className='container'>
                <div>
                    <NavLink to='/'>
                        <span className='navbar-brand mb-0 h1'>Home</span>
                    </NavLink> 
                </div>
            {isAuth ? (
                <div>
                    <NavLink to='/dashboard'>
                        <span className='navbar-brand mb-0 h1'>Dashboard</span>
                    </NavLink>
                </div>
            ) : (
                <div>
                    <NavLink to='/login' className='mx-3'>
                        <span>Login</span>
                    </NavLink>
                    <NavLink to='/register' className='mx-3'>
                        <span>Register</span>
                    </NavLink>
                </div>
            )}
            </div>
        </nav>
    )
}
export default Navbar;