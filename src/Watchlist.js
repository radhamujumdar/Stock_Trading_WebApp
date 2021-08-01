import React from 'react'
import {db, auth} from './firebase'
import firebase from 'firebase';
import Abc from './Abc';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useHistory, Link } from 'react-router-dom';
import logo from './static/logo.png';

class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            temp_arr:[]
        }    
    }
    
    componentDidMount() {
        console.log('mounted');
        db.collection('Watchlist')
        .get()
        .then(snapshot => {
            const stocks = []
            snapshot.forEach( doc => {
                const data = doc.data()
                    stocks.push(data)
            })
            this.setState({ stocks })
            console.log(snapshot);
            console.log(this.state.stocks);
        }).catch( error => console.log(error) )
    }

    render() {
      console.log("abc", this.state.stocks);
        return (
            <div className="App">
              <head>
                <link rel="stylesheet" href="Trial.css"></link>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;1,200;1,300&display=swap" rel="stylesheet" />    
              </head>
                
                <Navbar bg="dark" variant="dark">
                  <Container>
                  <Navbar.Brand href="/Trial" class="font-style1"><img src={logo} class="brand-style"/>TradeX</Navbar.Brand>
                    <Nav className="ml-auto">
                    <Nav.Link >
                      <Link class="font-style2" to="/Watchlist">Watchlist</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link class="font-style2" to="/">Logout</Link>
                    </Nav.Link>
                    </Nav>
                  </Container>
                </Navbar>
              
                <h1 style={{color:"white"}} class="align-title">Your Watchlist</h1>
                {
                  this.state.stocks.map(({symbol}, index) => (<Abc key={index} symbol={symbol}/>))
                }
            </div>
        )
    }
}

export default Watchlist
