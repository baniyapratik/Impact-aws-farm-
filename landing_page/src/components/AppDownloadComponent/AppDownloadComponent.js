import React, { Component } from 'react';
import './style.css';
import arch_diag from './img/arch_diag.jpg';
import appStoreBadge from './img/app-store-badge.svg';

 export const AppDownloadComponent = (props)=>{
  return <section className="download bg-primary text-center" id="download">
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2 className="section-heading">Use our mTaaS Platform to get your application ready for the market!</h2>
          <div className="badges">
            <a className="badge-link" href="#"><img src={arch_diag} alt="" /></a>
          </div>
        </div>
      </div>
    </div>
  </section>
};