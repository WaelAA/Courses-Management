import React, { PropTypes } from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({ authors, deleteAuthor }) => {
  if (authors.length > 0)
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author =>
            <AuthorListRow key={author.id} author={author} deleteAuthor={deleteAuthor} />
          )}
        </tbody>
      </table>
    );
  else
    return (
      <div>No authors found. Please add an author</div>
    );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  deleteAuthor: PropTypes.func.isRequired
};

export default AuthorList;
