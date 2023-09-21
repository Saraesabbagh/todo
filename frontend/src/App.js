import './App.css';

function App() {
  const get=async()=>{
    const res = await fetch('http://localhost:8000')
    console.log(res);
  }
  get();
  return (
    <div>Welcome to the frontend Todo App</div>
  );
}

export default App;
