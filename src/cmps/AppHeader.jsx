import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../services/user.service';
import { logout } from '../store/actions/user.actions';
import { useEffect } from 'react';

export function AppHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const currPath = window.location.pathname

    const handleLogout = () => {
        logout()
        // dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };
    useEffect(() => {

        console.log(currPath);
    }, [currPath])

    return (
        <header className="app-header main-layout">
            <section className="header-container">
                <h2>DisneyMovie</h2>
                <nav className="app-nav">
                    <NavLink className={currPath === "/" ? "activecolor" : ""} to="/">Home</NavLink>
                    <NavLink className={currPath === "/toy" ? "activecolor" : ""} to="/toy">Toys</NavLink>
                    {loggedInUser ?
                        <button className="logoutbtn" onClick={handleLogout}>Logout</button> :
                        <NavLink className={currPath === "/login" ? "activecolor" : ""} to="/login">Login</NavLink>}
                    <NavLink className={currPath === "/about" ? "activecolor" : ""} to="/about">About</NavLink>
                </nav>
            </section>
        </header>
    );
}
