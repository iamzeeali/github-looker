import React, { useReducer } from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import GithubReducer from './githubReducer';
import * as Types from '../Types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading();
  //     const res = await axios.get(
  //       `https://api.github.com/users?client_id=${
  //         process.env.REACT_APP_GITHUB_CLIENT_ID
  //       }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     dispatch({
  //       type: Types.SEARCH_USERS,
  //       payload: res.data.items
  //     });
  //     setLoading();
  //   }
  //   fetchData();
  // }, []);

  //Search users
  const searchUsers = async text => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: Types.SEARCH_USERS,
      payload: res.data.items
    });
  };

  //Get user
  const getUser = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: Types.GET_USER,
      payload: res.data
    });
  };

  //Get repos
  const getUserRepos = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: Types.GET_REPOS,
      payload: res.data
    });
  };

  //Clear users
  const clearUsers = () => dispatch({ type: Types.CLEAR_USERS });

  //Set Loading
  const setLoading = () => dispatch({ type: Types.SET_LOADING });

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
