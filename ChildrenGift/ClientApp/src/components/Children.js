import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Children.css';

export class Children extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            gift: [],
        };
    }

    componentDidMount() {
        this.getChildren();
    }

    getChildren() {
        fetch("api/children/index")
            .then(response => response.json())
            .then(data => {
                this.setState({ children: data })
            });
    }

    deleteChild() {

    }

    render() {

        const {
            children,
            gifts
        } = this.state;
        return (
            <>
                {!children && <p><em>Loading...</em></p>}
                <div className="card">
                    <div className="card-header">
                        Children list
                    </div>
                    <div className="card-body scrollable-table">
                {children.length > 0 &&
                    (<table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {children.map(child =>
                                <tr key={child.id}>
                                    <td>{child.firstName}</td>
                                    <td>{child.lastName}</td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <Link className="btn btn-secondary" to={{
                                                pathname: '/edit',
                                                search: 'id?=' + child.id
                                            }} >Edit</Link>
                                            <a className="btn btn-danger" onClick={() => this.deleteChild(child.id)}>Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                            </table>)}
                        {children.length == 0 && <h2> No records.</h2>}
                    </div>
                    <div className="card-footer">
                        <p>
                            <a className="btn btn-success" href="#">Create New</a>
                        </p>
                    </div>
                </div>
                {!gifts && <p><em>Loading...</em></p>}
                <div className="card">
                    <div className="card-header">
                        Children list
                    </div>
                    <div className="card-body scrollable-table">
                        {children.length > 0 &&
                            (<table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {children.map(child =>
                                        <tr key={child.id}>
                                            <td>{child.firstName}</td>
                                            <td>{child.lastName}</td>
                                            <td>
                                                <div className="btn-group" role="group">
                                                    <Link className="btn btn-secondary" to={{
                                                        pathname: '/edit',
                                                        search: 'id?=' + child.id
                                                    }} >Edit</Link>
                                                    <a className="btn btn-danger" onClick={() => this.deleteChild(child.id)}>Delete</a>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>)}
                        {children.length == 0 && <h2> No records.</h2>}
                    </div>
                    <div className="card-footer">
                        <p>
                            <a className="btn btn-success" href="#">Create New</a>
                        </p>
                    </div>
                </div>     
            </>
        );

    }
}