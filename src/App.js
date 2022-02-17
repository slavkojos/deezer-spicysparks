import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import PlaylistDetail from '../src/pages/PlaylistDetail';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist/:id" element={<PlaylistDetail />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
