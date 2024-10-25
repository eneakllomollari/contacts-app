import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const buttonClass = "hover:text-blue-700 transition duration-200 mr-2";
const tableRowClass = "border-b hover:bg-gray-50 transition duration-300";

const ContactList = () => {
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);
  const fetchContacts = async () => {
    try {
      const client = new WebSocket(`${process.env.REACT_APP_BACKEND_WS_BASE_PATH}/contacts`);
      client.onopen = () => {
        console.log('WebSocket Client Connected');
      };
      client.onmessage = (message) => {
        const data = JSON.parse(message.data);
        console.log('WebSocket', data, typeof data)
        setContacts(data);
        setLoading(false);
      };
      client.onclose = () => {
        console.log('WebSocket Client Closed');
      };
      client.onerror = (error) => {
        console.error("Connection Error: ", error);
      };
    } catch (error) {
      console.error("Error establishing WebSocket connection: ", error);
    }

  };

  const handleEdit = (id) => {
    navigate(`/edit-contact/${id}`);
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete.id);
      setDeleteModalOpen(false);
      setContactToDelete(null);
    }
  };
  const deleteContact = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/contacts/${id}`);
      toast.success("Contact deleted successfully");
      // fetchContacts();
    } catch (error) {
      toast.error(`Error deleting contact: ${error.response?.data?.message || "Unknown"}`);
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setContactToDelete(null);
  };

  const handleAddNewContact = () => {
    navigate("/new-contact");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Contacts
      </h1>
      {contacts.length > 0 && (
        <button
          onClick={handleAddNewContact}
          className="mb-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Add New Contact
        </button>
      )}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
            {contacts.length > 0 && (
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
            )}
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className={tableRowClass}>
                  <td className="px-6 py-4 whitespace-nowrap">{`${contact.first_name} ${contact.last_name}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className={`text-blue-500 ${buttonClass}`}
                      onClick={() => handleEdit(contact.id)}
                    >
                      Edit
                    </button>
                    <button
                      className={`text-red-500 ${buttonClass}`}
                      onClick={() => handleDeleteClick(contact)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/contact-history/${contact.id}`}
                      className={`text-green-500 ${buttonClass}`}
                    >
                      History
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {contacts.length === 0 && !loading && (
        <div className="text-center text-gray-800">
          <p>No contacts yet. Please add your first contact.</p>
          <button
            onClick={handleAddNewContact}
            className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
          >
            Add New Contact
          </button>
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete the contact for{" "}
              {contactToDelete?.first_name} {contactToDelete?.last_name}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />

      {loading && (
        <div className="text-center text-gray-800 flex justify-center items-center">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              fill="currentColor"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p>Loading your contacts...</p>
        </div>
      )}
    </div>
  );
};

export default ContactList;
