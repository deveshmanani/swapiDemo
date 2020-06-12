import React, { Component } from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/login';
import { userRoutes } from '../../helper/routes';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../helper/firebaseConfig'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 4,
    },
};
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loader: false,
          currentUser: null
        }
      }
    onFinish = values => {
        console.log('Success:', values);
        let { dispatch } = this.props;
        dispatch(login(values))
    };
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
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
        let { loading } = this.props;
        const { currentUser, loader } = this.state
        if(!loader && currentUser !== null) return <Redirect to={userRoutes.PEOPLE} />
        return (
            <div className="signup-wrap">
                <h2>Login</h2>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Link to={userRoutes.SIGNUP}>Donn't have an account, Register now!</Link>
                        <Button disabled={loading ? true : false} type="primary" htmlType="submit">
                            {loading ? "Loading" : "Submit"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    
    componentDidMount() {
        this.isLoginCheck()
    }
    
    componentDidUpdate(prevProps, prevState) {
        let { loading, data, error, history } = this.props;
        if (!loading && prevProps.loading !== loading) {
            if (data && prevProps.data !== data) {
                message.destroy();
                history.push(userRoutes.PEOPLE)
                message.success("Logged In Successfully")
            }
            if (error && prevProps.error !== error) {
                message.destroy();
                message.error(error.message)
            }
        }
    }
}

const mapStateToProps = (state) => {
    let { loading, data, error } = state.login
    return {
        loading,
        data,
        error,
        firebaseAuth: state.firebaseAuth
    }
};

export default connect(mapStateToProps)(Login)