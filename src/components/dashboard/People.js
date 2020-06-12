import React, { Component } from 'react'
import CustomLayout from '../layout/CustomLayout'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { userRoutes } from '../../helper/routes'
import { Card, Skeleton, Avatar, List, Button } from 'antd'
import { getPeople, resetGetPeople } from '../../redux/actions/getData'

const { Meta } = List;

class People extends Component {
    onLoadMore = (e) => {
        e.preventDefault();
        let { dispatch, data } = this.props;
        let link = data && data.data && data.data.next
        console.log('link => ', link);
        dispatch(getPeople({ url: link }))
        window.dispatchEvent(new Event('resize'));
    }
    render() {
        let { firebaseAuth, loading, data, list } = this.props;
        console.log('data => ', data, list);
        const loadMore =
            !loading && data && data.data && data.data.next ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button onClick={this.onLoadMore}>Load More</Button>
                </div>
            ) : null;
        // if(!authLoading && !authData.user.uid)return (<Redirect to={userRoutes.LOGIN}/>)
        return (
            <CustomLayout>
                <div className="people-list-wrap">
                    <h3 style={{ textAlign: "center", borderBottom: "1px solid #000" }}>People List</h3>
                    <div className="people-list">
                        <List
                            className="demo-loadmore-list"
                            loading={loading}
                            itemLayout="horizontal"
                            loadMore={loadMore}
                            dataSource={list}
                            renderItem={item => {
                                let tempVal = item.url.split("/")
                                return (
                                    <List.Item
                                    >
                                        <Link to={`${userRoutes.PEOPLE}/${tempVal[5]}`}>
                                            <Skeleton avatar title={false} loading={loading} active>
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                    }
                                                    title={<a href="https://ant.design">{item.name}</a>}
                                                    description={item.gender}
                                                />
                                                <div className="character">
                                                    <h5>Films</h5>
                                                    {item.films && item.films.length > 0 && item.films.map((val, i) => {
                                                        let temp = val.split("/")
                                                        return (
                                                            <Link key={i} to={`${userRoutes.FILMS}/${temp[5]}`}>
                                                                {"Film" + temp[5]}
                                                            </Link>
                                                        )
                                                    })}
                                                </div>
                                            </Skeleton>
                                        </Link>
                                    </List.Item>
                                )
                            }}
                        />

                    </div>
                </div>
            </CustomLayout>
        )
    }

    componentDidMount() {
        let { dispatch, authLoading, authData, history } = this.props;
        console.log('authData => ', authData);
        dispatch(resetGetPeople())
        dispatch(getPeople())
        // if(!authLoading && !authData && !authData.uid){
        //     history.push(userRoutes.LOGIN)
        // }
    }
    componentWillMount() {
        let { dispatch } = this.props;
        dispatch(resetGetPeople())
        // if(!authLoading && !authData && !authData.uid){
        //     history.push(userRoutes.LOGIN)
        // }
    }

}

const mapStateToProps = (state) => {
    let { loading, data, list, error } = state.people;
    return {
        firebaseAuth: state.firebaseAuth,
        loading,
        data,
        list,
        error,
        authLoading: state.login.loading,
        authData: state.login.data
    }
};

export default connect(mapStateToProps)(People)
