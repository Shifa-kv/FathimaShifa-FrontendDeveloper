import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../Store/reducer';
import Main from './Main';

const store = createStore(rootReducer);

describe('Main Component', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Main />
            </Provider>
        );
    });



    it('renders the search form', () => {
        // test assertions to check if the search form elements are present
        expect(screen.getByLabelText('Status')).toBeInTheDocument();
        expect(screen.getByLabelText('Type')).toBeInTheDocument();
        expect(screen.getByLabelText('Orginal launch year')).toBeInTheDocument();
    });


    it('displays loading indicator when loading', () => {
        // test assertions to check if the loading indicator is displayed when isLoading is true
        store.isLoading = true;
        render(
            <Provider store={store}>
                <Main />
            </Provider>
        );

        expect(screen.getAllByTestId('loading-indicator').length).toBeGreaterThan(0);
    });


});
