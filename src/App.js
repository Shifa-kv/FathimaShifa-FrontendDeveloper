import { useEffect } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Main from './components/Main';
import { useDispatch } from 'react-redux';
import { addCapsules, setLoading } from './Store/action';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCapsulesData = async () => {
      try {
        const response = await fetch('http://localhost/bsf/frontend/api/capsules.php');
        if (!response.ok) {
          throw new Error('Network error occured');
        }
        const data = await response.json();
        // Store data in Redux store
        dispatch(addCapsules(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally{
        dispatch(setLoading(false))
      }
    };
    fetchCapsulesData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Banner />
      <Main />
    </div>
  );
}

export default App;
