import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from '../styles/Common.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = contacts ? JSON.parse(contacts) : [];
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      this.state.contacts.find(item => {
        return item.name === contact.name;
      })
    ) {
      return alert(`${contact.name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  filterContacts = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(c => c.id !== id),
    }));
  };

  render() {
    const renderContacts = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
    return (
      <div className={css.container}>
        <ContactForm addContact={this.addContacts} />

        {this.state.contacts.length > 0 ? (
          <div>
            <ContactFilter filter={this.filterContacts} />
            <ContactList
              renderContacts={renderContacts}
              deleteContacts={this.deleteContacts}
            />
          </div>
        ) : (
          <Notification />
        )}
      </div>
    );
  }
}
