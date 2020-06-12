import React, { Component } from 'react'
import { getFilm, resetGetFilm, getFilmDetail, resetFilmDetail } from '../../redux/actions/getData';
import { connect } from 'react-redux';
import CustomLayout from '../layout/CustomLayout';
import { Redirect, Link } from 'react-router-dom'
import { userRoutes } from '../../helper/routes'
import { Card, Skeleton, Avatar, List, Button, Descriptions } from 'antd'

class FilmDetail extends Component {
    render() {
        let { loading, data, error } = this.props;
        console.log('data => ', data);
        return (
            <CustomLayout>
                <div className="people-list-wrap">
                    <h3 style={{ textAlign: "center", borderBottom: "1px solid #000" }}>Film Detail</h3>
                    <div className="people-list">
                        {!loading && data && data.data &&
                        <Descriptions title={data.data.title}>
                            <Descriptions.Item label="Title">{data.data.title}</Descriptions.Item>
                            <Descriptions.Item label="Director">{data.data.director}</Descriptions.Item>
                            <Descriptions.Item label="Producer">{data.data.producer}</Descriptions.Item>
                            <Descriptions.Item label="Release Date">{data.data.release_date}</Descriptions.Item>
                            <Descriptions.Item label="Created">{data.data.created}</Descriptions.Item>
                            <Descriptions.Item label="Description">{data.data.opening_crawl}</Descriptions.Item>
                            <Descriptions.Item label="Characters">
                                {data.data.characters && data.data.characters.length > 0 ?
                                data.data.characters.map((val,i)=>{
                                    let temp = val.split('/')
                                    return (
                                        <Link key={i} to={`${userRoutes.PEOPLE}/${temp[5]}`}>
                                            {"People"+temp[5]}
                                        </Link>
                                    )
                                })
                                :
                                <h5>No Film</h5>
                            }
                            </Descriptions.Item>
                        </Descriptions>}
                    </div>
                </div>
            </CustomLayout>

        )
    }

    componentDidMount() {
        let { match, dispatch } = this.props;
        console.log('location match => ', match);
        dispatch(getFilmDetail({ id: match.params.id }))
    }

    componentWillMount() {
        let { dispatch } = this.props;
        dispatch(resetFilmDetail())
        // if(!authLoading && !authData && !authData.uid){
        //     history.push(userRoutes.LOGIN)
        // }
    }

}

const mapStateToProps = (state) => {
    let { loading, data, error } = state.filmDetail;
    return {
        firebaseAuth: state.firebaseAuth,
        loading,
        data,
        error,
        authLoading: state.login.loading,
        authData: state.login.data
    }
};

export default connect(mapStateToProps)(FilmDetail)