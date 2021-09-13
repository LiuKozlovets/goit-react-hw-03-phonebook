import React from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import s from "./App.module.css";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: "",
      name: "",
      number: "",
    };
    this.addContact = this.addContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      contacts: JSON.parse(localStorage.getItem("contacts")) || initialContacts,
    });
  }

  handleFilterChange(event) {
    this.setState({ ...this.state, filter: event.target.value });
  }

  addContact({ name, number }) {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      this.state.contacts.find(
        (c) => c.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
      return
    }

    this.setContacts(this.state.contacts.concat(newContact));
  }

  deleteContact(id) {
    this.setContacts(this.state.contacts.filter((c) => c.id !== id));
  }

  setContacts(contacts) {
    this.setState({ ...this.state, contacts });
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  filteredContacts() {
    if (this.state.filter.length === 0) return this.state.contacts;

    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
  }

  render() {
    return (
      <div className={s.main}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleFilterChange} />
        <ContactList
          records={this.filteredContacts()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
