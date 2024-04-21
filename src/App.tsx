import Header from './components/Header';
import FlavonoidTable from './containers/FlavonoidTable';
import GammaTable from './containers/GammaTable';

/**
 * @description App component
 */
const App = () => {
  return (
    <div className='container'>
      <Header />
      <FlavonoidTable />
      <GammaTable />
    </div>
  );
};

export default App;
