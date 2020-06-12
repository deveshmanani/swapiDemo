import React from "react";
import { Route, withRouter } from "react-router-dom";
import firebase from './firebaseConfig'
import { userRoutes } from "./routes";
class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      currentUser: null
    }
  }

  isLoginCheck() {
    let _this = this;
    this.setState({ loader: true }, () => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user && user !== null) {
          _this.setState({ currentUser: user, loader: false })
        } else {
          _this.setState({ currentUser: null, loader: false }, () => {
            firebase.auth().signOut()
              .then(resp => {
                  console.log('__this.props => ',_this.props);
                return _this.props.history.push(userRoutes.LOGIN);
              })
          })
        }
      });
    })

  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { currentUser, loader } = this.state

    return (
      <>
        {!loader ?
          <Route {...rest} render={(props) => (
            currentUser !== null
              ? <Component {...rest}{...props} />
              : null
          )} />
          : null
        }
      </>
    );
  }
  componentDidMount() {
    this.isLoginCheck()
  }
}
export default withRouter(PrivateRoute)