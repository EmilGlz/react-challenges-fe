import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { validateEmail, validatePassword } from '../utilities/Validations'
import { Link } from 'react-router-dom'
import { registerApi, loginApi } from '../apis/Authentication'
import { useCookies } from 'react-cookie'
const initialErrorsState = {
    email: '',
    password: '',
    api: ''
}

export const PageType = Object.freeze({
    LOGIN: 0,
    REGISTER: 1
})

const Authentication = ({ pageType }) => {
    const [cookies, setCookie] = useCookies(['jwt']);
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(initialErrorsState)

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()  // Prevent form submission from refreshing the page
        let newErrors = {}
        if (!validateEmail(email)) {
            newErrors = { ...newErrors, email: "Invalid Email" }
        }
        if (!validatePassword(password)) {
            newErrors = { ...newErrors, password: "Invalid Password" }
        }
        setErrors(newErrors)
        const hasErrors = Object.values(newErrors).some(error => error != '')
        if (hasErrors)
            return
        if (pageType == PageType.LOGIN) {
            const [response, error] = await loginApi({
                user: {
                    email: email,
                    password: password
                }
            });
            handleResponse([response, error])
        }
        else {
            const [response, error] = await registerApi({
                user: {
                    email: email,
                    password: password
                }
            });
            handleResponse([response, error])
        }
    }

    const handleResponse = async ([response, error]) => {
        if (error) {
            setErrors({
                ...errors,
                api: error
            })
        }
        else {
            const jwt = response.headers.get('Authorization')
            const result = await response.json();
            setCookie("jwt", jwt)
            console.log("Saved cookie: ", cookies.jwt);
            navigate('/')
        }
    }

    useEffect(() => {
        if (cookies.jwt) {
            navigate('/')
        }
    }, []);

    return <div className='mt-24'>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <h1 className='font-bold text-2xl mb-5'>
                {(pageType === PageType.LOGIN) ? "Login" : "Register"}
            </h1>
            {
                (pageType == PageType.LOGIN) ? (
                    <p>Not a user?
                        <Link to='/register' className='underline text-blue-700'>Register</Link>
                    </p>
                )
                    : (
                        <p>Already a user?
                            <Link to='/login' className='underline text-blue-700'>Login</Link>
                        </p>
                    )
            }
            <div className="mb-5 mt-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input onChange={handleEmailChange} value={email} x id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                {errors.email && <p className='text-sm text-medium text-red-500 mt-1'>{errors.email}</p>}
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                <input onChange={handlePasswordChange} value={password} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                {errors.password && <p className='text-sm text-medium text-red-500 mt-1'>{errors.password}</p>}
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {(pageType === PageType.LOGIN) ? "Login" : "Register"}
            </button>
            {errors.api && <p className='text-sm text-medium text-red-500 mt-1'>{errors.api}</p>}
        </form>
    </div>

}

Authentication.propTypes = {
    pageType: PropTypes.number.isRequired
}

export default Authentication