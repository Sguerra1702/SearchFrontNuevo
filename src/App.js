import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSearch from './components/MainSearch';
import SearchResults from './components/SearchResults';
import NoResultsPopup from './components/NoResultsPopup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSearch />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/no-results" element={<NoResultsPopup />} />
      </Routes>
    </Router>
  );
}

export default App;
