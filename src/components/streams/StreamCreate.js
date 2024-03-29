import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if(touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = (formProps) => {
    //if you do a console.log(formProps) - you'll see some functions i.e onChange, value
    const className = `field ${formProps.meta && formProps.meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input {...formProps.input} />
        {/* the ""...formProps.input" essentially is a short form to do this : onChange={formProps.input.onChange} value={formProps.input.value} */}
        <div>{this.renderError(formProps.meta)}</div>
      </div>
    );
  }

  //Below, the formValues props will have values from the <Field /> below as a part of Redux forms
  onSubmit(formValues) {
    console.log("Form field values: ", formValues);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        {/*The "label" prop will be passed into the "renderInput" function as a prop */}
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if(!formValues.title) {
    errors.title = "You must enter a title";
  }

  if(!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamCreate",
  validate: validate
})(StreamCreate);
