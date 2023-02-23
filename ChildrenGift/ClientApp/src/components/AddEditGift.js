import { Component } from "react";
import { Link } from "react-router-dom";

export class AddEditGift extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            gift: {},
            giftId: 0,
            children: []
          }
    }

    componentDidMount() {
        this.getQueryString();
        let giftId = this.state.giftId;
        /*if (giftId > 0) {
            console.log('Hello');
            this.getGift(giftId);
        }*/
        this.getGift();
        this.getChildren();
    }

    getQueryString() {
        const params = new URLSearchParams(window.location.search);
        const giftId = params.get('id');
        this.setState({ giftId: giftId })
        console.log(this.state.giftId);

    }

    getChildren() {
        fetch("api/children/index")
            .then(response => response.json())
            .then(data => {
                this.setState({ children: data })
            });
    }

    saveCGift(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const headersJson = {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        };
        if (this.state.gift.id) {
            let gift = this.state.gift;
            this.updateGift(data, gift.id, headersJson);
        } else {
            this.addGift(data, headersJson);
        }
    }

    getGift() {
        const params = new URLSearchParams(window.location.search);
        let giftId = params.get('id');
        if (giftId === 0 && giftId) {
            this.setState({ title: "Create gift for child" });
        } else {
            fetch('api/gifts/read?id=' + giftId)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit gift for child", gift: data });
                });
        }
    }

    addGift(data, headers) {
        fetch('api/children/gift', {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(data)),
            headers: headers
        }).then(response => response.json())
            .then(() => {
                this.props.history.push("children");
                //this.context.router.push("children");
                //BrowserRouter.push("children");
            })
            .catch(error => {
                console.log(error);
                this.setState({ errors: error.errors });
            });
    }

    updateGift(data, giftId, headers) {
        fetch('api/children/update?id=' + giftId, {
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
            gift,
            giftId,
            children,
            errors
        } = this.state

        return (
            <>
                <h1 className="text-center">{title}</h1>
                <div className="center-form">
                    <form onSubmit={this.saveChild}>
                        <div className="form-group row">
                            {giftId && <input type="hidden" name="childId" value={giftId} />}
                        </div>
                        <div className="form-group row center-form">
                            <label className="control-label col-md-12" htmlFor="Name">Name</label>
                            <div className="col-md-6">
                                <input className="form-control" type="text" name="Name" defaultValue={gift ? gift.name : ""} required />
                                {/* <input className="form-control" type="text" name="FirstName" defaultValue="" required />*/}
                                {errors > 0 && <span className="text-danger">{errors.FirstName[0]}</span>}
                            </div>
                            <div className="form-group row">
                                <label className="control-label col-md-12" htmlFor="City">City</label>
                                <div className="col-md-4">
                                    <select className="form-control" data-val="true" name="ChildId" defaultValue={gift.childId} required>
                                        <option value="">-- Select Child --</option>
                                        {children.map(child =>
                                            <option key={child.id} defaultValue="{child.id}" selected="{child.id == gift.childId}">{child.firstName + " " + child.lastName}</option>                                     
                                        )}
                                    </select>
                                </div>
                            </div >  
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