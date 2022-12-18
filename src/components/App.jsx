import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from '../styles/Common.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactList from './ContactList/ContactList';

export default class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
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
        <ContactFilter filter={this.filterContacts} />
        <ContactList
          renderContacts={renderContacts}
          deleteContacts={this.deleteContacts}
        />
      </div>
    );
  }
}
