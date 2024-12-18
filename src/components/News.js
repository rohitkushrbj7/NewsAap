import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { key } from "../apikey";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Corrected the spelling from 'articals' to 'articles'
      totalResults: 0,
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    const apiUrl = `https://api.mediastack.com/v1/news?access_key=${key.apikey}&countries=${this.props.country}&keywords=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    try {
      let response = await fetch(apiUrl);
      let data = await response.json();
      this.setState({
        articles: data.data || [], // Fallback to an empty array if `data` is undefined
        totalResults: data.pagination?.total || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });    
    }
  }

  handleNextClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.updateNews
    );
  };

  handlePrevClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.updateNews
    );
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "35px 0" }}>
          News - Top Headlines
        </h2>
        {this.state.loading && <p>Loading...</p>}
        <div className="row">
          {this.state.articles.length > 0 ? (
            this.state.articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <NewsItem
                  title={article.title || "No Title Available"}   
                  description={
                    article.description || "No Description Available"
                  }
                  imageUrl={
                    article.image ||
                    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704931200&semt=sph"
                  }
                  // update http to https request 
                  newsUrl={article.url}
                  author={article.author || "Unknown"}
                  date={article.published_at}
                  source={article.source || "Unknown Source"}
                />
              </div>
            ))
          ) : (
            <p>No articles available.</p>
          )}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
