import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../withRouter";
import './Children.css';

class AddEditChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            //childId: 0,
            child: {},
            errors: {}
        }

        this.saveChild = this.saveChild.bind(this);
    }

    componentDidMount() {
        //this.getQueryString();
        setTimeout(1000);
        let childId = this.state.childId;
        console.log(this.state);
        //if (childId && childId > 0) {
        this.getChild();
        //}
    }

   /* getQueryString() {
 
        this.setState({ childId: childIdParam })
    }*/

    saveChild(event) {
        event.preventDefault();
        const data = new FormData(event.target);
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
            this.setState({ title: "Create child" });
        } else {
            fetch('api/children/read?id=' + childId)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit child", child: data });
                });
        }
    }

    addChild(data, headers) {
            fetch('api/children/post', {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(data)),
                headers: headers               
            }).then(response => response.json())
                .then(() => {
                    this.props.history.push("children");
                    //this.context.router.push("children");
                    //BrowserRouter.push("children");
                    //redirect("/children");
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ errors: error.errors });
                });
     }
    
    updateChild(data, childId, headers) {
            fetch('api/children/update?id=' + childId, {
                method: "PUT",
                headers: headers,
                body: data
            }).then(response => response.json())
                .then(() => {
                    this.props.history.push("children");
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({ errors: error.errors });
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
                        <label className="control-label col-md-12" htmlFor="FirstName">First Name</label>
                        <div className="col-md-6">
                                <input className="form-control" type="text" name="firstName" defaultValue={child ? child.firstName : ""} required />
                                {/* <input className="form-control" type="text" name="FirstName" defaultValue="" required />*/}
                                {errors > 0 && <span className="text-danger">{errors.FirstName[0]}</span>}
                        </div>
                        <label className="control-label col-md-12 center-form" htmlFor="LastName">Last Name</label>
                            <div className="col-md-6">
                               <input className="form-control" type="text" name="lastName" defaultValue={child ? child.lastName : ""} required />
                                {/*<input className="form-control" type="text" name="LastName" defaultValue="" required />*/}
                                {errors  > 0 && <span className="text-danger">{errors.LastName[0]}</span>}
                        </div>
                    </div>
                    <br />
                    <div className="btn-group center-form" role="group">
                        <button type="submit" className="btn btn-success float-start btn-gap text-center">Save</button>
                        <Link className="btn btn-danger text-center" to="/children">Back</Link>
                    </div>
                    </form>
                </div>
            </>
         ); 
        
    }
}

export default withRouter(AddEditChild);