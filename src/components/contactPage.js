import React, {Component} from 'react';
import {FIND_BY_ID,} from "../constants/userActionTypes";
import connect from "react-redux/es/connect/connect";
import {Container, Card, Icon} from "semantic-ui-react";
import {NotificationManager} from "react-notifications";
import LoadingBar from "./loadingBar";

export class ContactPage extends Component {

    componentDidMount(): void {
        let link = window.location.href;
        let id = link[link.length - 1];
        if (!/^-?[\d.]+(?:e-?\d+)?$/.test(id)) {
            NotificationManager.error('Incorrect link');
        } else {
            this.props.findUserById(id);
        }
    }

    render() {
        return (
            <>
                <Container>
                    {
                        this.props.user ?
                            <Card>
                                <Card.Content>
                                    <Card.Header>{this.props.user.name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{this.props.user.website}</span>
                                    </Card.Meta>
                                    <Card.Description>{this.props.user.email}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='phone'/>{this.props.user.phone}
                                </Card.Content>
                            </Card> : <LoadingBar header={'One moment'} text={'Loading user'}/>
                    }
                </Container>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        findUserById: (payload) => {
            dispatch({
                type: FIND_BY_ID, payload
            })
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);