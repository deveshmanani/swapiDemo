import React, { Component } from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd';
import { signup } from '../../redux/actions/login';
import { connect } from 'react-redux';
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
class Signup extends Component {
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
        dispatch(signup(values))
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
                    return _this.props.history.push(userRoutes.SIGNUP);
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
                <h2>SignUp</h2>
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
                        <Link to={userRoutes.LOGIN}>Already have an account, Login now!</Link>
                        <Button disabled={loading ? true : false} type="primary" htmlType="submit">
                        {loading ? "Loading..." : "Submit"}
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
        let { loading, data, error, history, firebaseAuth } = this.props;
        if (!loading && prevProps.loading !== loading) {
            console.log('firebaseAuth => ', firebaseAuth);
            if (data && prevProps.data !== data) {
                message.destroy();
                history.push(userRoutes.LOGIN)
                message.success("SignUp Successfull")
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

export default connect(mapStateToProps)(Signup)