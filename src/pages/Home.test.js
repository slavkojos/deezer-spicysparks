import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import App from 
export default function MockHome() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
test('renders 30 playlists', () => {
  render(<MockHome />);
  const playlistElement = screen.getById('playlists-grid');
  expect(playlistElement).toBeInTheDocument();
});
