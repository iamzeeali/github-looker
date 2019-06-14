import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
  // state = {
  //   text: ''
  // };

  //const [state, setstate] = useState(initialState)
  const [text, setText] = useState('');

  const onSubmitHandler = e => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please Enter Something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  // const onChangeHandler = e =>
  //   this.setState({ [e.target.name]: e.target.value });
  const onChangeHandler = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          // value={this.state.text}
          value={text}
          // onChange={this.onChangeHandler}
          onChange={onChangeHandler}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
        {showClear && (
          <button onClick={clearUsers} className="btn btn-light btn-block">
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;
