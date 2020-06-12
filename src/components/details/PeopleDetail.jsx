import React, { Component } from 'react'
import { getPeople, resetGetPeople, resetPeopleDetail, getPeopleDetail } from '../../redux/actions/getData';
import { connect } from 'react-redux';
import CustomLayout from '../layout/CustomLayout';
import { Redirect, Link } from 'react-router-dom'
import { userRoutes } from '../../helper/routes'
import { Card, Skeleton, Avatar, List, Button, Descriptions } from 'antd'

class PeopleDetail extends Component {
    render() {
        let { loading, data, error } = this.props;
        console.log('data => ', data);
        return (
            <CustomLayout>
                <div className="people-list-wrap">
                    <h3 style={{ textAlign: "center", borderBottom: "1px solid #000" }}>People Detail</h3>
                    <div className="people-list">
                        {!loading && data && data.data &&
                        <Descriptions title="People Detail">
                            <Descriptions.Item label="Name">{data.data.name}</Descriptions.Item>
                            <Descriptions.Item label="Birth Year">{data.data.birth_year}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{data.data.gender}</Descriptions.Item>
                            <Descriptions.Item label="Hair Color">{data.data.hair_color}</Descriptions.Item>
                            <Descriptions.Item label="Skin Color">{data.data.skin_color}</Descriptions.Item>
                            <Descriptions.Item label="Films">
                                {data.data.films && data.data.films.length > 0 ?
                                data.data.films.map((val,i)=>{
                                    let temp = val.split('/')
                                    return (
                                        <Link key={i} to={`${userRoutes.FILMS}/${temp[5]}`}>
                                            {"Film"+temp[5]}
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
        console.log('location => ', match);
        dispatch(getPeopleDetail({ id: match.params.id }))
    }

    componentWillMount() {
        let { dispatch } = this.props;
        dispatch(resetPeopleDetail())
        // if(!authLoading && !authData && !authData.uid){
        //     history.push(userRoutes.LOGIN)
        // }
    }

}

const mapStateToProps = (state) => {
    let { loading, data, error } = state.peopleDetail;
    return {
        firebaseAuth: state.firebaseAuth,
        loading,
        data,
        error,
        authLoading: state.login.loading,
        authData: state.login.data
    }
};

export default connect(mapStateToProps)(PeopleDetail)