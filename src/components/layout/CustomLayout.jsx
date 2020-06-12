import React, { Component } from 'react'
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import { userRoutes } from '../../helper/routes';
import { logout, autoLogin } from '../../redux/actions/login';
import { connect } from 'react-redux';
import { resetFilmDetail, resetGetFilm, resetGetPeople, resetPeopleDetail } from '../../redux/actions/getData';

const { Header, Content, Footer, Sider } = Layout;

class CustomLayout extends Component {
    handleLogout = (e) => {
        e.preventDefault();
        let {dispatch, history} = this.props;
        dispatch(logout())
        dispatch(resetPeopleDetail())
        dispatch(resetFilmDetail())
        dispatch(resetGetFilm())
        dispatch(resetGetPeople())
        history.push(userRoutes.LOGIN)
    }
    handleLogo=(e)=>{
        e.preventDefault()
        let {history} = this.props;
        history.push(userRoutes.PEOPLE)
    }
    render() {
        let { children, location, match } = this.props;
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div onClick={this.handleLogo} className="logo">SWAPI</div>
                    <Menu theme="dark" mode="inline" selectedKeys={match.path === "/films" || match.path === "/films/" || match.path === "/films/:id" ? ['2'] : ['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to={userRoutes.PEOPLE} >People</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to={userRoutes.FILMS} >Films</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0, textAlign: "right" }} >
                        <div className="header-avator">
                            <Button onClick={this.handleLogout} type="primary">LogOut</Button>
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>SWAPI ©2020 Created by DM</Footer>
                </Layout>
            </Layout>
        )
    }

    
    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(autoLogin())
    }
    
}
export default withRouter(connect()(CustomLayout));