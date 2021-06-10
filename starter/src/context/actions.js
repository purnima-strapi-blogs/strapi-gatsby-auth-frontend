import { login, signup } from '../services/api';
import { getState } from './context';
import { setUser, logout } from '../services/auth';

const useAuth = () => { 
	const [state, dispatch] = getState();
	async function signupAction(username, email, password) {
		try {
			dispatch({ type: 'REQUEST_SIGNUP' })
			let response = await signup(username, email, password)

			if(response && response.status) {
				if(response.status === 200) {
					dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
					return response
				}
			}
		} catch(error) {
			dispatch({ type: 'REGISTER_ERROR', error: error.message });
			console.log("REGISTER_ERROR oauth.signup", error.message)
			return error
		}

	}
	async function loginAction(email, password) {
		try {
			dispatch({ type: 'REQUEST_LOGIN' });
			let response = await login(email, password);
			console.log("response loginAction", response)
			const data = {
				...state,
				token: response.data.jwt,
				username: response.data.user.username,
			}
	
			if (response && response.data.user) {
				dispatch({ type: 'LOGIN_SUCCESS', payload: data });
				setUser({token: data.token, username: data.username})
				return data;
			}

		} catch (error) {
			dispatch({ type: 'LOGIN_ERROR', error: error });
			console.log(error);
			throw error;
		}
	}
	function logoutAction(callback) {
		dispatch({ type: 'LOGOUT' });
		logout(callback)
	}

	return { loginAction, logoutAction, signupAction }
}

export default useAuth;
