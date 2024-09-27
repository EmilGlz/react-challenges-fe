import { useCookies } from 'react-cookie'
import { logoutApi } from '../apis/Authentication';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const navigate = useNavigate()
    const handleLogout = async () => {
        const [response, error] = await logoutApi(cookies.jwt);
        handleResponse([response, error])
    }

    const handleResponse = async ([response, error]) => {
        if (error) {
            removeCookie('jwt')
        }
        else {
            removeCookie('jwt')
        }
    }

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <div className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl">Code Challenges</p>
                    <div>
                        {
                            cookies.jwt ?
                                <button onClick={handleLogout} className="bg-indigo-500 rounded-md px-3 py-1.5 my-4">Log out</button>
                                :
                                <button onClick={handleLogin} className="bg-indigo-500 rounded-md px-3 py-1.5 my-4">Log in</button>
                        }
                    </div>
                </div>
            </div>
        </div>)
}

export default Navbar