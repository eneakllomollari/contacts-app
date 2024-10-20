import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import ContactHistory from "./components/ContactHistory";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route
            path="/new-contact"
            element={<ContactForm />}
          />
          <Route
            path="/edit-contact/:id"
            element={<ContactForm />}
          />
          <Route
            path="/contact-history/:id"
            element={<ContactHistory />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
