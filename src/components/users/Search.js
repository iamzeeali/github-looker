import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/AlertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  const onSubmitHandler = e => {
    e.preventDefault();

    if (text === '') {
      alertContext.setAlert('Please Enter Something', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  const onChangeHandler = e => setText(e.target.value);

  const { users, clearUsers } = githubContext;

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChangeHandler}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
        {users.length > 0 && (
          <button onClick={clearUsers} className="btn btn-light btn-block">
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
