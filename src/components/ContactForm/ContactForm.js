import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

import css from '../../styles/Common.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const addNewContact = ({ name, number }) => {
    const contact = {
      name,
      number,
    };

    if (
      contacts.find(item => {
        return item.name === contact.name;
      })
    ) {
      return alert(`${contact.name} is already in contacts`);
    }
    dispatch(addContact(contact));
  };

  const onFormInput = e => {
    if (e.currentTarget.name === 'name') {
      setName(e.currentTarget.value);
    }
    if (e.currentTarget.name === 'number') {
      setNumber(e.currentTarget.value);
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    addNewContact({ name, number });
    e.currentTarget.reset();
  };

  return (
    <>
      <form className={css.form} onSubmit={onFormSubmit}>
        <h1 className={css.text}>Phonebook</h1>
        <label htmlFor="name">Name</label>
        <input
          onChange={onFormInput}
          className={css.input}
          placeholder="Type your name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <label htmlFor="number">Number</label>
        <input
          onChange={onFormInput}
          className={css.input}
          placeholder="099-99-99-99"
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
};

export default ContactForm;
