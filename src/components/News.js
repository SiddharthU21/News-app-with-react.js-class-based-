import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  static defaultProps = {
    category : 'general'
  }

  static propTypes = {
    category : PropTypes.string
  }

  constructor(){
     super();
     this.state = {
       articles : [],
       page : 1,
       loading : false,
       totalResults: 0
     }
     
  }

// Util funcn
async updateNews(pageNo){
  this.props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=b4b3e532a0464c6497562273b071dee6&page=${pageNo}&pageSize=15`;
  let data = await fetch(url);
  this.props.setProgress(50);
  let parsedData = await data.json();
  this.setState({articles : parsedData.articles, 
    totalResults: parsedData.totalResults, 
    })
  this.props.setProgress(100);
}

async componentDidMount(){
    await this.updateNews(this.state.page);
}
  
// handlePrevClick = async() =>{
//     await this.updateNews(this.state.page - 1);
//     this.setState({page : this.state.page - 1})
// }

// handleNextClick = async() =>{
//   await this.updateNews(this.state.page + 1);
//   this.setState({page : this.state.page + 1})
// }

fetchMoreData = async() => {
  this.setState({page : this.state.page + 1});
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=b4b3e532a0464c6497562273b071dee6&page=${this.state.page}&pageSize=15`;
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState(
    {articles : this.state.articles.concat(parsedData.articles), 
    totalResults: parsedData.totalResults, 
    })
 }


  render() {
    return (
        <>
        <div className='container my-3'>
          <h1 className='text-center my-3'> Patrika - Trending</h1>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          // endMessage={
          //   <p style={{ textAlign: "center" }}>
          //     <b>&larr;End&rarr;</b>
          //   </p>
          // }
          >      
              <div className='row'>
                  {this.state.articles.map((element)=>{
                      return  <div className='col-md-4' key={element.url}>
                      <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                    </div>
                  })}
              </div>
          </InfiniteScroll>   
        </div>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/15)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div> */}
        </>
    )
  }
}

export default News