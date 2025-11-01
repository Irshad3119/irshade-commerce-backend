// import React, { useEffect } from 'react';
// import {
//   Routes,
//   Route,
//   useLocation
// } from 'react-router-dom';

// import './css/style.css';
// import './charts/ChartjsConfig';

// // Import pages
// import Dashboard from './pages/Dashboard';

// // Grocery components
// import ItemGrocery from './components/ItemGrocery';
// import AddGrocery from './components/AddGrocery';
// import UpdateGrocery from './components/UpdateGrocery';

// //  Category components ✅

// import AddCategory from './components/AddCategory';
// import UpdateCategory from './components/UpdateCategory'; 
// import ItemCategory from './components/ItemCategory';

// function App() {

//   const location = useLocation();

//   useEffect(() => {
//     document.querySelector('html').style.scrollBehavior = 'auto';
//     window.scroll({ top: 0 });
//     document.querySelector('html').style.scrollBehavior = '';
//   }, [location.pathname]); // triggered on route change

//   return (
//     <>
//       <Routes>
//         <Route exact path="/" element={<Dashboard />}>

//           {/* Grocery Routes */}
//           <Route path="/itemgrocery" element={<ItemGrocery />} />
//           <Route path="/addgrocery" element={<AddGrocery />} />
//           <Route path="/updategrocery/:id" element={<UpdateGrocery />} /> 

//           {/* Category Routes ✅ */}
//           <Route path="/itemcategory" element={<ItemCategory />} />
//           <Route path="/addcategory" element={<AddCategory />} />
//           <Route path="/updatecategory/:id" element={<UpdateCategory />} />

//         </Route>
//       </Routes>
//     </>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';

// Grocery components
import ItemGrocery from './components/ItemGrocery';
import AddGrocery from './components/AddGrocery';
import UpdateGrocery from './components/UpdateGrocery';

// Category components
import AddCategory from './components/AddCategory';
import UpdateCategory from './components/UpdateCategory'; 
import ItemCategory from './components/ItemCategory';
import Order from './components/Order';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />}>
        {/* Grocery Routes */}
        <Route path="/itemgrocery" element={<ItemGrocery />} />
        <Route path="/addgrocery" element={<AddGrocery />} />
        <Route path="/updategrocery/:id" element={<UpdateGrocery />} /> 

        {/* Category Routes */}
        <Route path="/itemcategory" element={<ItemCategory />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/updatecategory/:id" element={<UpdateCategory />} />

        {/* Orders Route */}
        <Route path="/orders" element={<Order />} />
      </Route>
    </Routes>
  );
}

export default App;
