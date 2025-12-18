import { BrowserRouter } from 'react-router';
import Layout from './layout';

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
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
