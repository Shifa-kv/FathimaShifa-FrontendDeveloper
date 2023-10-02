import { render, screen, waitFor } from '@testing-library/react';
import { createStore } from 'redux';
import rootReducer from './Store/reducer'; 
import { Provider } from 'react-redux';
import App from './App';

const store = createStore(rootReducer);
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        // Sample capsule data
        { capsule_serial: 'C101', status: 'retired' },
        { capsule_serial: 'C102', status: 'retired' },
        { capsule_serial: 'C103', status: 'active' },
      ]),
  })
);

describe('App Component', () => {
  it('fetches and displays capsules', async () => {
    // Render the App component with the Redux store
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Wait for the fetch request and data to be loaded
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost/bsf/frontend/api/capsules.php');
    });
  });

});