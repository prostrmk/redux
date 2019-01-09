import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {LOAD_USERS, SORT_ASC, SORT_DESC} from "../constants/userActionTypes";
import {Icon, Label, Menu, Table} from 'semantic-ui-react'


export class IndexPage extends Component {

    state = {
        users: [],
        page: 1
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.users !== this.props.users
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.users !== this.props.users) {
            this.setState({
                users: nextProps.users
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setState({
            users: this.props.users
        });
    }

    componentDidMount() {
        this.props.loadUsers();
        this.setState({
            users: this.props.users
        });
    }

    nextPage() {
        this.setState({
            page: this.state.page + 1
        });

    };

    prevPage = () => {
        this.setState({
            page: this.state.page - 1
        });
    };

    render() {

        return (
            <>
                {
                    this.state.users.length > 0 ?
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Id
                                        <Icon name='sort alphabet down' onClick={this.props.sortAsc.bind(this, 'id')}/>
                                        <Icon name='sort alphabet up' onClick={this.props.sortDesc.bind(this, 'id')}/>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Name
                                        <Icon name='sort alphabet down'
                                              onClick={this.props.sortAsc.bind(this, 'name')}/>
                                        <Icon name='sort alphabet up'
                                              onClick={this.props.sortDesc.bind(this, 'name')}/>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Username
                                        <Icon name='sort alphabet down'
                                              onClick={this.props.sortAsc.bind(this, 'username')}/>
                                        <Icon name='sort alphabet up'
                                              onClick={this.props.sortDesc.bind(this, 'username')}/>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Email
                                        <Icon name='sort alphabet down'
                                              onClick={this.props.sortAsc.bind(this, 'username')}/>
                                        <Icon name='sort alphabet up'
                                              onClick={this.props.sortDesc.bind(this, 'username')}/>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    this.state.users.map((user, index) => {
                                        return <Table.Row key={index}>
                                            <Table.Cell>{user.id}</Table.Cell>
                                            <Table.Cell>{user.name}</Table.Cell>
                                            <Table.Cell>{user.username}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                        </Table.Row>
                                    })
                                }
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='4'>
                                        <Menu floated='right' pagination>

                                            <Menu.Item as='a' icon>
                                                <Icon name='chevron left' onClick={this.prevPage}/>
                                            </Menu.Item>
                                            <Menu.Item as='a'>1</Menu.Item>
                                            <Menu.Item as='a'>2</Menu.Item>
                                            <Menu.Item as='a'>3</Menu.Item>
                                            <Menu.Item as='a'>4</Menu.Item>
                                            <Menu.Item as='a' icon>
                                                <div onClick={this.nextPage.bind(this)}>
                                                    <Icon name='chevron right'/>
                                                </div>
                                            </Menu.Item>
                                        </Menu>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table> : <div/>
                }

            </>
        );
    }

}


const mapStateToProps = state => {
    return {
        users: state.userReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        sortDesc: (payload) => {
            dispatch({
                type: SORT_DESC, payload
            })
        },
        sortAsc: (payload) => {
            dispatch({
                type: SORT_ASC, payload
            })
        },
        loadUsers: () => {
            dispatch({
                type: LOAD_USERS
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);