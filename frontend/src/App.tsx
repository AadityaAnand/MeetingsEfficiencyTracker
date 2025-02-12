import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Meetings from './pages/Meetings';
import AddMeeting from './pages/AddMeeting';
import MeetingDetails from './pages/MeetingDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/add-meeting" element={<AddMeeting />} />
          <Route path="/meetings/:id" element={<MeetingDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;