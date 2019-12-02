import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from './../lib';
import CatFront from './cat_front.jpg'
import CatBack from './cat_back_1.jpg'
import './App.css';

const images = []

for(let i=1;i<=9;i++){
    if(i==8)
    {
        images.push(' ')
    }
    else
    {
        images.push('./cat_back_'+String(i)+'.jpg')

    }
}


const FlippyStyle = {
  width: '200px',
  height: '200px',
  textAlign: 'center',
  color: '#FFF',
  fontFamily: 'sans-serif',
  fontSize: '30px',
  justifyContent: 'center'
}

const DefaultCardContents = ({ children }, {image}) => (
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
        src={CatFront}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
      <span 
        style={{
          fontSize:'12px',
          position: 'absolute',
          bottom: '10px',
          width: '100%'
        }}>
        {children}<br />
        (FRONT SIDE)
      </span>
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
        src={image}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
      <span 
        style={{
          fontSize:'12px',
          position: 'absolute',
          bottom: '10px',
          width: '100%'
        }}>
        {children}<br />
        (BACK SIDE)
      </span>
    </BackSide>
  </React.Fragment>);

const FlippyOnClick = ({ flipDirection = 'vertical' }, {image}) => (
  <Flippy
    flipOnClick={true}
    flipDirection={flipDirection}
    style={FlippyStyle}
  >
    <DefaultCardContents image={image} />
  </Flippy>
);
    


const createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 3; j++) {
        children.push(<td>{<FlippyOnClick flipDirection="horizontal" image={images[i]} />}</td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };

    setInterval(() => {
      this.setState({
        isFlipped: !this.state.isFlipped
      });
    }, 3000);
  }
                       
  render() {

    return (
      
      <div className="App">
        <div style={{ display: 'flex', flex: '1 0 200px', justifyContent: 'space-around', 'flex-wrap': 'wrap' }}>
            
         {images[7]}
          <tbody>
            {createTable()}
          </tbody>
          

          <FlippyOnClick flipDirection="horizontal"/>
          <FlippyOnClick flipDirection="horizontal"/>
          <FlippyOnClick flipDirection="horizontal"/>
          <FlippyOnClick flipDirection="horizontal"/>
          <FlippyOnClick flipDirection="horizontal"/>
          <FlippyOnClick flipDirection="horizontal"/>
          <FlippyOnClick flipDirection="horizontal"/>
          <FlippyOnClick flipDirection="horizontal"/>
          <FlippyOnClick />

        </div>
      </div>
    );
  }
}

export default App;
