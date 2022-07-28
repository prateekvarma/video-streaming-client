import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

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
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange); //'listen' can be seen from the console.log, it's a property inside the '__proto__'. The 'onAuthChange' function will be called each time that the user's authentication status changes.
        });
    });
  }

  onAuthChange = () => {
    //we can update the state here, since the user's auth status has changed
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
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

export default GoogleAuth;
