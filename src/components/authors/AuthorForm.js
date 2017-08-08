import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, onChange, onSave, errors}) => {
  return (
    <div>
        {/* <p><strong>Id: {author.id}</strong></p> */}
        <TextInput name="firstName" value={author.firstName} label="First Name" onChange={onChange} error={errors.firstName}/>
        <TextInput name="lastName" value={author.lastName}  label="Last Name" onChange={onChange} error={errors.lastName}/>
        <input type="button" value="Save" className="btn btn-primary" onClick={onSave} />
    </div>
  );
};
AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange : PropTypes.func.isRequired,
  onSave : PropTypes.func.isRequired
};

export default AuthorForm;
