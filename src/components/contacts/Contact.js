import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { Consumer } from "../../context";

class Contact extends Component {
  state = {
    showInfo: false,
  };

  deletePerson = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (error) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showInfo } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name + " "}
                <i
                  onClick={() =>
                    this.setState({ showInfo: !this.state.showInfo })
                  }
                  style={{ cursor: "pointer" }}
                  className="fas fa-sort-down"
                ></i>

                <i
                  onClick={this.deletePerson.bind(this, id, dispatch)}
                  style={{ float: "right", cursor: "pointer", color: "red" }}
                  className="fas fa-times"
                ></i>

                <Link to={`/contact/edit/${id}`}>
                  <i
                    style={{
                      float: "right",
                      cursor: "pointer",
                      color: "black",
                      marginRight: "1em",
                    }}
                    className="fas fa-pencil"
                  ></i>
                </Link>
              </h4>
              {showInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="text-danger">Email:</span> {email}
                  </li>
                  <li className="list-group-item">
                    <span className="text-danger">Phone:</span> {phone}
                  </li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Contact;
