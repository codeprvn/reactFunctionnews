import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from 'prop-types'

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResult, setTotalResult] = useState(0)

  const capitalize = (s) =>
  {
      return s && s[0].toUpperCase() + s.slice(1);
  }


   const updateNews = async()=>{
    props.setprogress(0)
    const url =
      `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=8365456d6d0f4432817a1da3b8132a43&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
      let data = await fetch(url);
      props.setprogress(30);
      
    let parsedData = await data.json();
    props.setprogress(70);
  setArticles( parsedData.articles);
  setTotalResult(parsedData.totalResults);
  setLoading(false);
  props.setprogress(100);
  }

  useEffect(() => {
    document.title = `${capitalize(props.category)} - NewsMonkey`;
    updateNews(); 
    // eslint-disable-next-line
}, [])
 
const fetchMoreData = async () => {
  

  const url =
      `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=8365456d6d0f4432817a1da3b8132a43&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page +1);
      setLoading(true);
     
      let data = await fetch(url);
    let parsedData = await data.json();
    setLoading(true);
    setArticles(articles.concat(parsedData.articles))
    setTotalResult(parsedData.totalResults)
    setLoading(false);

};

  
    return (
      <>
     
        <h1 className="text-center" style={{marginTop: "75px"}}>NewsMonkey - Top {capitalize(props.category)} Headlines</h1>
        {loading &&<Spiner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResult}
          loader={<Spiner/>}
        >
            <div className="container">
        <div className="row">
          {articles.map((element, index) => {
            return (
              <div className="col-md-3" key={index}>
                <NewsItem
                  title={element.title?element.title.slice(0, 45):""}
                  descripition={element.description?element.description.slice(0, 80):""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author?element.author:"Unknown"}
                  date={element.publishedAt}
                  source = {element.source.name}
                  />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    );
  }


 News.defaultProps = {
  pageSize: 20,
  category: "general"
}

News.propTypes = {
  pageSize: PropTypes.number
}


export default News;
