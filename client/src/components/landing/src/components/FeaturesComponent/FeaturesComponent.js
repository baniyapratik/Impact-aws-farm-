import React, { Component } from 'react';
import './style.css';
import 'simple-line-icons/css/simple-line-icons.css';
import demoScreen1 from '../../testing_image.png';

export const FeaturesComponent = (props)=>{
  return <section className="features" id="features">
    <div className="container">
      <div className="section-heading text-center">
        <h2>Lots of Features, Lots of Fun</h2>
        <p className="text-muted">Check out what you can do with our platform!</p>
        <hr />
      </div>
      <div className="row">
        <div className="col-lg-4 my-auto">
          <div className="device-container">
            <div className="device-mockup iphone6_plus portrait black">
              <div className="device">
                <div className="screen">
                  <img src={demoScreen1} className="img-fluid" alt="" />
                </div>
                <div className="button">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 my-auto">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <div className="feature-item">
                  <i className="icon-screen-smartphone text-primary"></i>
                  <h3>Real Device Testing</h3>
                  <p className="text-muted">Ready to use devices, no waiting required!</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="feature-item">
                  <i className="icon-pencil text-primary"></i>
                  <h3>Easy to Use</h3>
                  <p className="text-muted">Easy to pick up and use with our visually elagent UI!</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="feature-item">
                  <i className="icon-present text-primary"></i>
                  <h3>Flexible Plans</h3>
                  <p className="text-muted">Choose the perfect plan for you from our different testing options!</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="feature-item">
                  <i className="icon-lock-open text-primary"></i>
                  <h3>Great Cost Analysis</h3>
                  <p className="text-muted">Know exactly how your money is being utilized and save more!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
};