import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { useEffect } from 'react';

import css from '../styles/Common.module.css';

import ContactForm from './ContactForm/ContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';
import { fetchContacts } from 'services/api';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <ContactForm />
      {contacts.length > 0 ? (
        <div>
          <ContactFilter />
          <ContactList />
        </div>
      ) : (
        <Notification />
      )}
    </div>
  );
};
