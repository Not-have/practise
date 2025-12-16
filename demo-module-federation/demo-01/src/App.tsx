import './App.css';

import Button from 'remote/Button';

const App = () => {
  const handleClick = () => {
    console.log('主容器，远程加载MFE2的Button组件.');
  };

  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>主容器，远程加载MFE2的Button组件.</p>
      <Button onClick={handleClick}>MFE2 Button111222</Button>
    </div>
  );
};

export default App;
