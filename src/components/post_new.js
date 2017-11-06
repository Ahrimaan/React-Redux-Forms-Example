import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component {

    renderInputField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`
        return (
            <div className={className} >
                <label>{field.label} </label>
                <input
                    type="text"
                    className="form-control"
                    { ...field.input } />
                <div className="text-help" > {touched ? error : ''}</div>
            </div>
        );
    }

    formSubmit(values) {
        this.props.createPost(values,()=> {
            this.props.history.push('/');
        } );
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
                <Field name="title" component={this.renderInputField} label="Title" />
                <Field name="categories" component={this.renderInputField} label="Categories" />
                <Field name="content" component={this.renderInputField} label="Post Content" />
                <button className="btn btn-primary" type="submit">Save</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    if (!values.title || values.title.length < 3) {
        errors.title = 'Enter a title wich is longer then 3 Chars!';
    }
    if (!values.categories) {
        errors.categories = 'Enter a category !';
    }
    if (!values.content) {
        errors.content = 'Enter some Content!';
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostNewForm'
})(
    connect(null, { createPost })(PostNew)
    );