import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderInput(formProps) {
    //if you do a console.log(formProps) - you'll see some functions i.e onChange, value
    return <input {...formProps.input} />; //the essentially is a short form to do this : onChange={formProps.input.onChange} value={formProps.input.value}
  }

  render() {
    return (
      <form>
        <Field name="title" component={this.renderInput} />
        <Field name="description" component={this.renderInput} />
      </form>
    );
  }
}

export default reduxForm({
  form: "streamCreate",
})(StreamCreate);
