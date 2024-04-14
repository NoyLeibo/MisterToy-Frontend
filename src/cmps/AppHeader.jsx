import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../services/user.service';
import { logout } from '../store/actions/user.actions';

export function AppHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    const handleLogout = () => {
        logout()
        // dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    return (
        <header className="app-header main-layout">
            <section className="header-container">
                <h2>DisneyMovie</h2>
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    {loggedInUser ?
                        <button className="logoutbtn" onClick={handleLogout}>Logout</button> :
                        <NavLink to="/login">Login</NavLink>}
                    <NavLink to="/about">About</NavLink>
                </nav>
            </section>
        </header>
    );
}
