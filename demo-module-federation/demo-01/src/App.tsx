import { Remote1App } from './remotes/Remote1App';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './layout';

const App = () => {
  return (
    <Layout />
    // <div className="">
    //   <BrowserRouter>
    //     <Routes>
    //       {/*  */}
    //       <Route
    //         path="/remote1/*"
    //         // 使用 Remote1App 组件, 将会被懒加载
    //         Component={() => (
    //           <Remote1App />
    //         )}
    //       />
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  );
};

export default App;
