import { login, signup, fetchArticles } from '../../services/api';
import { getState } from '../context';
import { setUser, logout } from '../../services/auth';

export const useAuth = () => { 
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
		
			const data = {
				...state,
				token: response.data.jwt,
				username: response.data.user.username,
			}
	
			if (response && response.data.user) {
				dispatch({ type: 'LOGIN_SUCCESS', payload: data });
				setUser({
					token: data.token, 
					user: { 
						username: data.username, 
						email: response.data.user.email
					}
				})
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

	async function getArticlesAction() {
		
		try {
			const response = await fetchArticles();
		
			if(response && response.status === 200) {
				dispatch({type: 'FETCH_ARTICLES_SUCCESS', payload: response.data})
			}
		} catch(err) {
			console.log("error article while fetching articles", err)
		}
	}
	return { loginAction, logoutAction, signupAction, getArticlesAction}
}
