import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../withRouter"
import axios from "axios"

class AddEditGift extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Create gift for child",
            gift: {},
            children: [],
            errors: []
        }

        this.saveGift = this.saveGift.bind(this);
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const giftId = params.get('id');
        if (giftId > 0) {
            this.getGift(giftId);
        }
        this.getChildren();
    }

    getChildren() {
        axios.get("api/children/index")
            .then(response => response.data)
            .then(data => {
                this.setState({ children: data })
            });
    }

    saveGift(event) {
        event.preventDefault();
        let data = new FormData(event.target);
        data = JSON.stringify(Object.fromEntries(data));
        console.log(this.state.gift);
        let gift = this.state.gift;
        const headersJson = {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        };
        if (gift.id) {
            this.updateGift(data, gift.id, headersJson);
        } else {
            this.addGift(data, headersJson);
        }
    }

    getGift(giftId) {
        if (giftId === 0) {
            return;
        } else {
            axios.get('api/gifts/read?id=' + giftId)
                .then(response => response.data)
                .then(data => {
                    this.setState({ title: "Edit gift for child", gift: data });
                })
                .catch(error => {
                    let response = error.response;
                    if (response.status === 404) {
                        this.props.router.navigate("/404");
                    }
                });
        }
    }

    addGift(data, headers) {
        axios.post('api/gifts/post', data, {
            headers: headers
        }).then(response => response.data)
            .then(() => {
                this.props.router.navigate("/children");
            })
            .catch(error => {
                this.setState({ errors: error.response.data.errors });
            });
    }

    updateGift(data, giftId, headers) {
        axios.put('api/gifts/update?id=' + giftId, data, {
            headers: headers,
        }).then(response => response.data)
            .then(() => {
                this.props.router.navigate("/children");
            })
            .catch(error => {
                this.setState({ errors: error.response.data.errors });
                let response = error.response;
                if (response.status === 404) {
                    this.props.router.navigate("/404");
                }
            })
    }


    render() {
        const {
            title,
            gift,
            children,
            errors
        } = this.state


        return (
            <>
                <h1 className="text-center">{title}</h1>
                <form onSubmit={this.saveGift}>
                    {gift.id && <div className="form-group row">
                        <input type="hidden" name="giftId" value={gift.giftId} />
                    </div>}
                    <div className="form-group row">
                        <label className="form-label col-md-12" htmlFor="Name">Name</label>
                        <div className="col-md-10">
                            <input className="form-control" type="text" name="Name" defaultValue={gift ? gift.name : ''} required/>
                            {errors.Name && errors.Name.map((errorName, index) => <span key="{index}" className="text-danger">{errorName}</span>)}
                        </div>
                        <div className="form-group row">
                            <label className="form-label col-md-12" htmlFor="City">City</label>
                            <div className="col-md-10">
                                <select className="form-control" data-val="true" name="ChildId" value={gift.childId} required>
                                    <option value="0">-- Select Child --</option>
                                    {children.map(child =>
                                        <option key={child.id} value={child.id}>{child.firstName + " " + child.lastName}</option>
                                    )}
                                </select>
                                {errors.ChildId && errors.ChildId.map((errorChildId, index) => <span key="{index}" className="text-danger">{errorChildId}</span>)}
                            </div>
                        </div >
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="btn-group" role="group">
                                <button type="submit" className="btn btn-success float-start btn-gap text-center">Save</button>
                                <Link className="btn btn-danger text-center" to="/children">Back</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );

    }
}

export default withRouter(AddEditGift)