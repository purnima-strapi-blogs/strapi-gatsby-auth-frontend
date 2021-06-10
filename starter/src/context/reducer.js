import React, { useState, useReducer } from 'react';
import { getCurrentUser, getCurrentUserToken } from '../services/auth';

const username = getCurrentUser()
const token = getCurrentUserToken()


export const initialState = {
	username: '' || username,
	token: '' || token,
	loading: false,
	errorMessage: null,

};

export const AuthReducer = (initialState, action) => {
	console.log("action ", action)
	switch (action.type) {
		case 'REQUEST_SIGNUP':
			return {
				...initialState,
				loading: true
			}
		case 'REGISTER_SUCCESS':
			return {
				...initialState,
				errorMessage: ''
			}
		case 'REGISTER_ERROR':
			return {
				...initialState,
				errorMessage: action.error
			}	
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				username: action.payload.username,
				token: action.payload.token,
				loading: false,
				errorMessage: ''
			};
		case 'LOGOUT':
			return {
				...initialState,
				username: '',
				token: '',
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
