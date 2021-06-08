import React, { createContext, useContext, useReducer } from 'react';
import { initialState, AuthReducer } from './reducer';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
	return (
		<AuthContext.Provider value={useReducer(AuthReducer, initialState)}>
			{children}
		</AuthContext.Provider>
	);
};

export const wrapRootElement = ({ element }) => {
	return (
		<AuthProvider>
			{ element }
		</AuthProvider>
	)
}

export function getCurrentState() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}

	return context;
}