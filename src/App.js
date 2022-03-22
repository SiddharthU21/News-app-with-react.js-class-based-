
import './App.css';
import Nav from './components/Nav';
import React, { Component } from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  
  apiKey = process.env.NEWS_API_KEY
  
  state = {
    progress : 0,
 }

  setProgress = (progress) =>{
     this.setState({progress : progress})
 }
  
  render() {
      
    return (
      <>
      <Router>
        <Nav/>
          <LoadingBar
          color='#20c997'
          progress={this.state.progress}
          height={3}
          containerStyle={{top : '56px'}}
          shadow ={false}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="general" category="general"/>}></Route>
          <Route exact path="/business" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="business" category="business"/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress ={this.setProgress}kapiKey={this.apiKey} ey="entertainment" category="entertainment"/>}></Route>
          {/* <Route exact path="/general" element={<News setProgress ={this.setProgress}kapiKey={this.apiKey} ey="general" category="general"/>}></Route> */}
          <Route exact path="/health" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="health" category="health"/>}></Route>
          <Route exact path="/science" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="science" category="science"/>}></Route>
          <Route exact path="/sports" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="sports" category="sports"/>}></Route>
          <Route exact path="/technology" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="technology" category="technology"/>}></Route>
        </Routes>
      </Router>
      </>
    )
  }
}

