import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  deleteAuthor(authorId) {
    event.preventDefault();
    let hasExistingCourses = this.props.courses.filter(x => x.authorId == authorId).length > 0;
    if (hasExistingCourses)
      toastr.error("Author can not be deleted because he has an associated course.");
    else
      this.props.actions.deleteAuthor(authorId).then(() => {
        toastr.success('Author Deleted');
      });
  }

  render() {
    const { authors } = this.props;

    return (
      <div>
        <h1>Authors</h1>
        <input type="submit"
          value="Add Author"
          className="btn btn-primary"
          onClick={this.redirectToAddAuthorPage} />
        <AuthorList authors={authors} deleteAuthor={this.deleteAuthor} />
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors,
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
