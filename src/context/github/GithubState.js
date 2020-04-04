import React, {useReducer} from 'react';
import {githubContext} from './githubContext';
import {githubReducer} from './githubReducer';
import axios from 'axios';
import {
	CLEAR_USER,
	SET_LOADING,
	SEARCH_USERS,
	GET_USER,
	GET_REPOS,
} from '../types';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET_ID = process.env.REACT_APP_CLIENT_SECRET;

const withCreds = url => {
	return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET_ID}`;
};

export const GithubState = ({children}) => {
	const initialState = {
		user: {},
		users: [],
		loading: false,
		repos: [],
	};
	const [state, dispatch] = useReducer(githubReducer, initialState);

	const search = async value => {
		setLoading();
		const response = await axios.get(
			withCreds(`https://api.github.com/search/users?q=${value}&`)
		);

		dispatch({
			type: SEARCH_USERS,
			payload: response.data.items,
		});
	};

	const getUser = async name => {
		setLoading();

		const response = await axios.get(
			withCreds(`https://api.github.com/users/${name}?`)
		);

		dispatch({
			type: GET_USER,
			payload: response.data,
		});
	};

	const getRepos = async name => {
		setLoading();

		const response = await axios.get(
			withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`)
		);

		dispatch({
			type: GET_REPOS,
			payload: response.data,
		});
	};

	const clearUsers = () => dispatch({type: CLEAR_USER});
	const setLoading = () => dispatch({type: SET_LOADING});

	const {user, users, loading, repos} = state;

	return (
		<githubContext.Provider
			value={{
				search,
				getUser,
				getRepos,
				setLoading,
				clearUsers,
				users,
				user,
				repos,
				loading,
			}}
		>
			{children}
		</githubContext.Provider>
	);
};
