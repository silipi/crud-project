import axios from 'axios';

const App: React.FC = () => {
  const handleRequest = () => {
    axios.get('http://localhost:3000/hello-world').then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <button onClick={handleRequest}>Get hello-world</button>
    </div>
  );
};

export default App;
