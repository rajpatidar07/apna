import React from "react";
import AdminLayout from "./components/admin/layout";
import ReactDOM from "react-dom";
import Error from "./components/admin/error_404/error";

const Portal = () => {
  const modalRoot = document.getElementById('error');

  return ReactDOM.createPortal(<Error/>, modalRoot,);
}

function App() {
  return (
    <div>
      {" "}
      <AdminLayout />
      <Portal />
   
    </div>
  );
}

export default App;
