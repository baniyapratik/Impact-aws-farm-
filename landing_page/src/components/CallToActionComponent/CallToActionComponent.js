import React, { Component } from 'react';
import './style.css';

export const CallToActionComponent = (props)=>{
  return <section className="cta">
    <div className="cta-content">
      <div className="container">
        <h2>Stop waiting.<br />Start testing.</h2>
        <a href="#contact" className="btn btn-outline btn-xl js-scroll-trigger">Sign Up Now!</a>
      </div>
    </div>
    <div className="overlay"></div>
  </section>
};