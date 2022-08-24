import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderInput(formProps) {
    //if you do a console.log(formProps) - you'll see some functions i.e onChange, value
    return (
      <div className="field">
        <label>{formProps.label}</label>
        <input {...formProps.input} />
        {/* the ""...formProps.input" essentially is a short form to do this : onChange={formProps.input.onChange} value={formProps.input.value} */}
      </div>
    );
  }

  render() {
    return (
      <form className="ui form">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        {/*The "label" prop will be passed into the "renderInput" function as a prop */}
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
      </form>
    );
  }
}

export default reduxForm({
  form: "streamCreate",
})(StreamCreate);
