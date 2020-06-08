/* eslint-disable */
import React, { Component, Fragment, useState } from 'react';
import Flippy, { FrontSide, BackSide } from './../lib';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Cat from './cat.jpg';
import CatFront from './imgs/cat_front.jpg';
import CatBack from './images';
import Front from './images2';
import Back from './images3';
import './App.css';
    
const FlippyStyle = {
  width: '200px',
  height: '200px',
  textAlign: 'center',
  color: '#FFF',
  fontFamily: 'sans-serif',
  fontSize: '10px',
  justifyContent: 'center'
}

const DefaultCardContents = ({children, imgFront, imgBack}) => {
  return (
  <React.Fragment>
    <FrontSide
      style={{
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <img
        class="shadowfilter"
        src={imgFront}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </FrontSide>
    <BackSide
      style={{
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>

      <img
        class="shadowfilter"
        src={imgBack}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </BackSide>
  </React.Fragment>);
};

const FlippyOnClick = ({ flipDirection = 'vertical', imgFront, imgBack, n, ...restProps}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <div class="card">
        <Flippy
          flipOnClick={true}
          flipDirection={flipDirection}
          style={FlippyStyle}
          {...restProps}
          onClick={() => {
            setIsFlipped(!isFlipped);
          }}
        >
          <DefaultCardContents imgFront={imgFront} imgBack={imgBack} />
        </Flippy>
        <div class="btn">
          {isFlipped &&<ZoomBtn onClick={() => openPopupbox(n)} />}
        </div>
      </div>
    );
};

const ZoomBtn = ({ onClick }) => {
  return (
    <Fragment>
       <Fab size="small" aria-label="zoomIn" onClick={onClick}>
         <ZoomInIcon />
       </Fab>
    </Fragment>
  );
};

const openPopupbox = ( n ) => {
  const content = <img src={Back[n]} />
  PopupboxManager.open({
    content,
    config: {
      titleBar: {
        enable: false,
        text: 'Meow!'
      },
      fadeIn: true,
      fadeInSpeed: 500
    }
  })
};
    
const createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 1; j < 4; j++) {
          //children.push(<td>{<FlippyOnClick flipDirection="horizontal" imgFront={Front[j+i*3]} imgBack={Back[j+i*3]}/>}</td>)
          if (j+i*3!=5){ 
            children.push((
              <td>
                {
                  <FlippyOnClick flipDirection="horizontal" imgFront={Front[j+i*3]} imgBack={Back[j+i*3]} n={j+i*3} />
                }
              </td>
            ))
          }
          else{
            children.push((
              <td>
              </td>
            ))
          }

      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
};

                        
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
        
        
const App = () => {           
    return (
      <div className="App">
        <div style={{ display: 'flex', flex: '1 0 200px', justifyContent: 'center', 'flex-wrap': 'wrap' }}>
          <tbody>
            {createTable()}
            <PopupboxContainer />
          </tbody>
        </div>
      </div>
    );
};

export default App;
