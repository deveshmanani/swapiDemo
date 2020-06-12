import React, { Component } from 'react'
import CustomLayout from '../layout/CustomLayout'
import { Card, Skeleton, Avatar, List, Button } from 'antd'
import { Redirect, Link } from 'react-router-dom'
import { userRoutes } from '../../helper/routes'
import { connect } from 'react-redux'
import { getFilm, resetGetFilm } from '../../redux/actions/getData'

class Films extends Component {
    onLoadMore = (e) => {
        e.preventDefault();
        let { dispatch, data } = this.props;
        let link = data && data.data && data.data.next
        console.log('link => ', link);
        dispatch(getFilm({ url: link }))
        window.dispatchEvent(new Event('resize'));
    }
    render() {
        let { firebaseAuth, loading, data, list } = this.props;
        console.log('list => ', list);
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
        return (
            <CustomLayout>
                <div className="people-list-wrap film-list-wrap">
                    <h3 style={{ textAlign: "center", borderBottom: "1px solid #000" }}>Film List</h3>
                    <div className="people-list">
                        <List
                            className="demo-loadmore-list"
                            loading={loading}
                            itemLayout="horizontal"
                            loadMore={loadMore}
                            dataSource={list && list}
                            renderItem={item => {
                                let tempVal = item.url.split("/")
                                return (
                                    <List.Item
                                    >
                                        <Link to={`${userRoutes.FILMS}/${tempVal[5]}`}>
                                            <Skeleton avatar title={false} loading={loading} active>
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                    }
                                                    title={<a href="https://ant.design">{item.title}</a>}
                                                    description={item.opening_crawl}
                                                />
                                                <div className="characters">
                                                    <h5>Characters</h5>
                                                    {item.characters && item.characters.length > 0 && item.characters.map((val, i) => {
                                                        let temp = val.split("/")
                                                        return (
                                                            <Link key={i} to={`${userRoutes.PEOPLE}/${temp[5]}`}>
                                                                {"People" + temp[5]}
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
        dispatch(resetGetFilm())
        dispatch(getFilm())
        // if(!authLoading && !authData && !authData.uid){
        //     history.push(userRoutes.LOGIN)
        // }
    }
    componentWillMount() {
        let { dispatch } = this.props;
        dispatch(resetGetFilm())
    }
}

const mapStateToProps = (state) => {
    let { loading, data, list, error } = state.film;
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

export default connect(mapStateToProps)(Films)
