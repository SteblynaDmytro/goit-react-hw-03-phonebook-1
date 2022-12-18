import React, { Component } from 'react';
import css from '../../styles/Common.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onFormInput = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.addContact(this.state);
    e.currentTarget.reset();
  };

  render() {
    return (
      <>
        <form className={css.form} onSubmit={this.onFormSubmit}>
          <h1 className={css.text}>Phonebook</h1>
          <label htmlFor="name">Name</label>
          <input
            onChange={this.onFormInput}
            className={css.input}
            placeholder="Stepan Stepanovych"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />

          <label htmlFor="number">Number</label>
          <input
            onChange={this.onFormInput}
            className={css.input}
            placeholder="096-111-11-11"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          ></input>

          <button type="submit" className={css.btn}>
            Add contact
          </button>
        </form>
      </>
    );
  }
}
