import React from 'react';
import './playstore.css';
import moment from 'moment';

export default function PlayStore(props) {
  return (
    <div className="app">
      <h2>{ props.App }</h2>
      <div className="type"> { props.Type } price: {props.Price} </div>
      <div className="last_update">
        Last Updated {moment(props.Last_Updated).format('DD MMM YYYY')}
      </div>
      <div className="genres"> Genres: { props.Genres }</div>
      <div className="rating">Rating: { props.Rating }</div>
    </div>
  );
}