import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';


class StreamForm extends Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className='header'>{error}</div>

                </div>
            )
        }
    }

    renderField({ input, label, meta }) {
        const className = `field ${(meta.error && meta.touched) ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                <div>{this.renderError(meta)}</div>
            </div>
        )
    }

    onSubmit(formValues) {
        this.props.onSubmit(formValues);
    }

    render() {

        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className='ui form error'>
                <Field name='title' component={this.renderField.bind(this)} label='Enter title' />

                <Field name='description' component={this.renderField.bind(this)} label='Enter description' />
                <button className='ui button primary'>Submit</button>
            </form>
        )
    }

}
const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'Pls enter a title'
    } else if (!formValues.description) {
        errors.description = 'Pls enter a description'
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'streamForm'
})(StreamForm);
