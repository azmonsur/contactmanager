import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../../context";

class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 className="display-6 mb-2">
                <span className="text-danger">Contact </span>List
              </h1>
              {contacts.length > 0 ? (
                contacts.map((contact, key) => (
                  <Contact contact={contact} key={key} />
                ))
              ) : (
                <div className="card card-body">
                  <em style={{ color: "red" }}>No contact to display</em>
                </div>
              )}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
