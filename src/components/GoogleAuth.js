import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  //state initialization removed as we'll take data from Redux store.

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: "XXX",
          scope: "email",
          plugin_name: "Msg for making plugin_name work as gapi is deprecated",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance(); //windows is needed because we're importing gapi from the header tag as a script.
          //Below, instead of using setState to set the status of logged in or not, we'll use the below helper function 'onAuthChange' to check, and call the appropriate action creator.
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange); //'listen' can be seen from the console.log, it's a property inside the '__proto__'. The 'onAuthChange' function will be called each time that the user's authentication status changes.
        });
    });
  }

  //As above, the 'listen' will call this function whenever there is a change
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      //If isSignedIn === true, call the action creator
      //Below, the props.signIn() function refers to the ones in 'actions/index.js'
      this.props.signIn(this.auth.currentUser.get().getId()); //The 'currentUser.get' stuff can be fond from the console of "getAuthInstance". It gives us the user's google ID. We're passing it on to the action creator to be a 'payload' property.
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    //using 'this.props' instead of 'this.state' because now we're referencing Redux rather than states.
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }; //the 'auth' here comes from combineReducers
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
