import { Outlet, useParams } from "react-router-dom";
import './LayoutSite.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "./Footer";
import Header from "./Header";
import Home from "../../pages/frontend/Home";
import '../../font/font.css';
import ConfigService from "../../service/ConfigService";

const LayoutSite = () => {
  const [config, setConfig] = useState({});
  const [load, setLoad] = useState(Date.now());

  useEffect(() => {
    (async () => {
      const result = await ConfigService.getList();
      setConfig(result.data.config);
      console.log(result.data.config);
      
    })();
  }, [load]);
  
  return (
    <>
      <div className="mainBody-theme-container mainBody-modalshow">
        <Header config={config} />
       
       <Outlet />

      <Footer config={config} />

      </div>


      
    </>
  )
};

export default LayoutSite;