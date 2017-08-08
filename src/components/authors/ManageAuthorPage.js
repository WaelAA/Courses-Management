import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import {browserHistory} from 'react-router';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state ={
      author: Object.assign({}, this.props.author),
      errors: {}
    };
    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
    this.AuthorFormIsValid = this.AuthorFormIsValid.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.author.id != nextProps.author.id) {
      // Necessary to populate form when existing author is loaded directly.
      this.setState({author: Object.assign({}, nextProps.author)});
    }
  }

  updateAuthorState(event) {
    const field = event.target.name;
    let author = Object.assign({}, this.state.author);
    author[field] = event.target.value;
    this.setState({author: author});
    this.AuthorFormIsValid(author);  
  }
  
  AuthorFormIsValid(author)
  {
    let errors={};
    let isValid = true;
    if(author.firstName.length< 3)
      {
        errors.firstName = "First name should be 3 characters or more.";
        isValid = false;
      }
    if(author.lastName.length< 3)
      {
        errors.lastName = "Last name should be 3 characters or more.";
        isValid = false;
      }
      this.setState({errors: errors});
      return isValid;
  }

  saveAuthor(event) {
    event.preventDefault();

    if (!this.AuthorFormIsValid(this.state.author)) {
      return;
    }
   
    this.setState({saving: true});

    this.props.actions.saveAuthor(this.state.author)    
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }
  redirect() {    
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/authors');
  }
  render() {
    return (<div >
        <h1>Manage Authors</h1>
        <AuthorForm author={this.state.author} onChange={this.updateAuthorState} onSave={this.saveAuthor} errors={this.state.errors} />
      </div>
      );
  }
}
ManageAuthorPage.propTypes = {
  author: PropTypes.object,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};
//Pull in the React Router context so router is available on this.context.router.
ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function getAuthorById(authors, id){
  let auth = authors.filter(a => a.id === id);
  if(auth)
    return auth[0];
  else
    return null;
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.params.id; // from the path `/author/:id`

  let auth =  {id: '', firstName: '', lastName: ''};
  if(authorId && state.authors.length > 0)
    auth =  getAuthorById(state.authors, ownProps.params.id);
  
  return {
    author: auth,
    authors: state.authors    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
