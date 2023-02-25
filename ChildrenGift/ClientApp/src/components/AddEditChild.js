import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../withRouter";
import axios from 'axios';
import './Children.css';

class AddEditChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Create child",
            child: {},
            errors: {}
        }

        this.saveChild = this.saveChild.bind(this);
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        let childId = params.get('id');
        if (childId && childId > 0) {
            this.getChild();
        }
    }

    saveChild(event) {
        event.preventDefault();
        let data = new FormData(event.target);
        data = JSON.stringify(Object.fromEntries(data));
        const headersJson = {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        };
        if (this.state.child.id) { 
            let child = this.state.child;
            this.updateChild(data, child.id, headersJson);
        } else {
            this.addChild(data, headersJson);
        }
    }

    getChild() {
        const params = new URLSearchParams(window.location.search);
        let childId = params.get('id');
        if (childId === 0 && childId) {
            return;
        } else {
            axios.get('api/children/read?id=' + childId)
                .then(response => response.data)
                .then(data => {
                    this.setState({ title: "Edit child", child: data });
                })
                .catch(error => {
                    let response = error.response
                    if (response.status === 404) {
                        this.props.router.navigate("/404");
                    }
                });
        }
    }

    addChild(data, headers) {
        axios.post('api/children/post', data, {
            headers: headers
        }).then(response => response.data)
                .then(() => {
                    this.props.router.navigate("/children");                    
                })
            .catch((error) => {
                this.setState({ errors: error.response.data.errors });
                });
     }
    
    updateChild(data, childId, headers) {
        axios.put('api/children/update?id=' + childId, data, {
                headers: headers,
            }).then(response => response.data)
            .then(() => {
                this.props.router.navigate("/children");
                })
                .catch((error) => {
                    this.setState({ errors: error.response.data.errors });
                    let response = error.response
                    if (response.status === 404) {
                        this.props.router.navigate("/404");
                    }
                })
        }


    render() {
        const {
            title,
            child,
            childId,
            errors
        } = this.state

        return (
            <>
                <h1 className="text-center">{title}</h1>
                <div className="center-form">
                <form onSubmit={this.saveChild}>
                        <div className="form-group row">
                            {childId && <input type="hidden" name="childId" value={childId} />}
                    </div>
                    <div className="form-group row center-form">
                        <label className="control-label col-md-12 center-form" htmlFor="FirstName">First Name</label>
                        <div className="col-md-6">
                                <input className="form-control" type="text" name="firstName" defaultValue={child ? child.firstName : ""} required />
                                {errors.FirstName && errors.FirstName.map(errorFirstName => <span key="{index}" className="text-danger">{errorFirstName}</span>)}
                        </div>
                        <label className="control-label col-md-12 center-form" htmlFor="LastName">Last Name</label>
                            <div className="col-md-6">
                                <input className="form-control" type="text" name="lastName" defaultValue={child ? child.lastName : ""} required />
                                {errors.LastName && errors.LastName.map(errorLastName  => <span key="{index}" className="text-danger">{errorLastName}</span>)}
                        </div>
                    </div>
                    <br />
                        <div className="btn-group center-form" role="group">
                        <button type="submit" className="btn btn-success btn-gap">Save</button>
                        <Link className="btn btn-danger" to="/children">Back</Link>
                    </div>
                    </form>
                </div>
            </>
         ); 
        
    }
}

export default withRouter(AddEditChild);