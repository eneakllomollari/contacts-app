import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const ContactHistory = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [contactHistory, setContactHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/contacts/${id}`);
        setContact(response.data);
      } catch (error) {
        setError("Error fetching contact: " + error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/history`, {params: {'contact_id': id}});
        setContactHistory(response.data);
      } catch (error) {
        setError("Error fetching contact history: " + error.message || "Unknown error");
      }
    };
    if (contact) {
      fetchHistory();
    }
  }, [id, contact]);

  if (loading) {
    return (
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
        <p>Loading contact history...</p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact History</h1>
      <Link
        to="/"
        className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Back to Contacts
      </Link>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{`${contact.first_name} ${contact.last_name}`}</h2>
          <p className="text-gray-600 mb-2">Current Email: {contact.email}</p>
          <p className="text-gray-600 mb-4">Current Phone: {contact.phone}</p>
        </div>
        <div className="border-t border-gray-200">
          <h3 className="text-xl font-semibold p-6">History</h3>
          {contactHistory.length === 0 ? (
            <p className="p-6 text-gray-500">No history available.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {contactHistory.map((edit, index) => (
                <motion.li
                  key={index}
                  className="p-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(edit.created_at).toLocaleString(undefined, { timeZone: 'America/New_York' })}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Name:</span> {edit.first_name || '--'} {edit.last_name || '--'}
                  </p>
                  {edit.email && <p className="mb-1">
                    <span className="font-semibold">Email:</span> {edit.email}
                  </p>}
                  {edit.phone && <p>
                    <span className="font-semibold">Phone:</span> {edit.phone}
                  </p>}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactHistory;