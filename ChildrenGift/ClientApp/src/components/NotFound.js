import { Component } from "react"
import { Link } from "react-router-dom";

export class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h2 className="text-center">Record not found</h2>
                <br />
                <div className="center-form">
                    <Link className="btn btn-danger" to="/children">Back to list</Link>
                </div>
            </>
        )
    }    

}