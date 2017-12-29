import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token: ''
    };
  }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    if (token) {
      response.json().then( user => {
        this.setState({
          isAuthenticated: true,
          user,
          token
        });
      });
    }
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({
      isAuthenticated: false,
      user: null,
      token: ''
    });
  };

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button onClick={this.logout} className="button" >
              Log out
            </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin
          loginUrl="http://localhost:8080/api/v1/auth/twitter"
          onFailure={this.onFailed}
          onSuccess={this.onSuccess}
          requestTokenUrl="http://localhost:8080/api/v1/auth/twitter/reverse"
        />
      );

    return (
      <div className="App">
        {content}
      </div>
    );
  }

}

export default Login;