import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Children.css';

export class Children extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            gifts: [],
        };
    }

    componentDidMount() {
        this.refreshFullList();
    }

    getChildren() {
        fetch("api/children/index")
            .then(response => response.json())
            .then(data => {
                this.setState({ children: data })
            });
    }

    getChildrenGifts(id) {
        this.setState({ gifts: [] })
        axios.get("api/gifts/childgift?childId=" + id)
            .then(response => response.data)
            .then(data => {
                this.setState({ gifts: data })
            });
    }

    refreshFullList() {
        let childId = 1
        this.getChildren();
        this.getChildrenGifts(childId);
    }

    deleteChild(id) {
        if (!window.confirm("Do you want to delete child with Id: " + id)) {
            return;
        }
        axios.delete("api/children/delete?id=" + id)
            .then(response => response.data)
            .then(response => {
                alert(response.message);
                this.refreshFullList();
            })
            .catch(error => {
                alert(error);
            });
    }

    deleteGift(id) {
        if (!window.confirm("Do you want to delete gift with Id: " + id)) {
            return;
        }
        axios.delete("api/gifts/delete?id=" + id)
            .then(response => response.data)
            .then(response => {
                alert(response.message);
                this.refreshFullList();
            })
            .catch(error => {
                alert(error);
                this.props.router.navigate("/children");
            });
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
                        X-mas gift for children
                    </div>
                    <div className="card-body">
                        <div className="children-list scrollable-table">
                            {children.length > 0 &&
                                (<table className="table table-responsive table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {children.map(child =>
                                            <tr key={child.id} onClick={() => this.getChildrenGifts(child.id)}>
                                                <td>{child.firstName}</td>
                                                <td>{child.lastName}</td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <Link className="btn btn-secondary btn-gap" to={{
                                                            pathname: 'edit',
                                                            search: 'id=' + child.id
                                                        }}>Edit</Link>
                                                        <button type="button" className="btn btn-danger" onClick={(id) => this.deleteChild(child.id)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>)}
                            {children.length === 0 && <h2> No records.</h2>}
                        </div>
                        <br />
                        <p>
                            <Link className="btn btn-success" to="add">Add new child</Link>
                        </p>


                        <br />
                        {!gifts && <p><em>Loading...</em></p>}
                        <div className="gift-list scrollable-table">
                            {gifts.length > 0 &&
                                (<table className="table table-responsive table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {gifts.map(gift =>
                                        <tr key={gift.id}>
                                                <td>{gift.name}</td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <Link className="btn btn-secondary btn-gap" to={{
                                                            pathname: '/gift/edit',
                                                            search:  'id=' + gift.id
                                                    }}>Edit</Link>
                                                    <button type="button" className="btn btn-danger btn-gap" onClick={() => this.deleteGift(gift.id)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>)}
                            {gifts.length === 0 && <h2> No records.</h2>}
                        </div>
                        <br />
                        <p>
                            <Link className="btn btn-success" to="/gift/add">Add child's gift</Link>
                        </p>
                    </div>
                </div>
            </>
        );

    }
}