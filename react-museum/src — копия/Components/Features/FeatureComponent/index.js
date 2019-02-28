import React from 'react';
import './style.scss';

const FeatureComponent = (props) => {
  return (
    <div className="feature-component__wrapper">
      <div className="feature-component">
        <div className="feature-component__icon">
          <svg width="172" viewBox="0 0 172 186">
            <path className="feature-component__hexagon"
                  d="M1419.57,1583.07q-20.235-12.15-40.87-23.6t-20.24-35.04q0.42-23.6,0-47.19-0.4-23.61,20.24-35.05t40.87-23.59q20.235-12.165,40.46,0t40.87,23.59q20.64,11.445,20.24,35.05-0.42,23.6,0,47.19,0.4,23.6-20.24,35.04t-40.87,23.6Q1439.8,1595.22,1419.57,1583.07Z"
                  transform="translate(-1354 -1408)"/>
          </svg>
          <svg className="feature-component__hexagon-inner-svg" width={props.hexagonInnerWidth}
               viewBox={props.hexagonInnerViewbox}>
            <path className="feature-component__hexagon-inner" d={props.hexagonInnerPath}
                  transform={props.hexagonInnerTransform}/>
          </svg>
        </div>
        <h2 className="feature-component__headline">{props.headline}</h2>
        <p className="feature-component__paragraph">Fusce facilisis velit libero, nec
          dignissim lacus sagittis non.
          Sed nec porta ante. Pellentesque
          habitant morbi tristique senectus et.</p>
      </div>
    </div>
  );
};

export default FeatureComponent;