import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectIsLoading,
} from 'redux/selectors';
import css from '../../styles/Common.module.css';

const ContactList = () => {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const renderContacts = contacts.filter(contact =>
    contact.name ? contact.name.toLowerCase().includes(filter) : contacts
  );

  return (
    <>
      {isLoading && <p>Loading...</p>}{' '}
      {error && <p>Something went wrong. Please try again later.</p>}
      <ul className={css.list}>
        {renderContacts.map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            {name}: {number}
            <button
              className={css.btnDelete}
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      ;
    </>
  );
};

export default ContactList;
