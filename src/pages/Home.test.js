import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { store } from '../core/store/store';
import Home from './Home';

const renderComponent = component =>
  render(
    <Provider store={store}>
      <BrowserRouter history={'/'}>{component}</BrowserRouter>
    </Provider>
  );
describe('Home', () => {
  it('renders heading', async () => {
    renderComponent(<Home />);
    expect(screen.getByText('Featured playlists >')).toBeInTheDocument();
  });
  it('renders 30 playlists', async () => {
    renderComponent(<Home />);
    expect(
      await screen.findAllByTestId('playlist-item', { timeout: 3000 })
    ).toHaveLength(30);
  });
});
