import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propsType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize=(s)=>
  {
    return s[0].toUpperCase() + s.slice(1);
  }

  constructor(props) {
    super(props);
    //console.log("I'm news component constructor");
    this.state = {
      articals: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsDevPristh`;
  }

  async updateNews() {
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9b07d2dd07b741c7b9a3b5d802289c0f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(apiUrl);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articals: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    // console.log("cmd");
    // let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9b07d2dd07b741c7b9a3b5d802289c0f&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(apiUrl);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({
    //   articals: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
  }

  handlePrevClick = async () => {
    // console.log("Previous");

    // let apiUrl = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=9b07d2dd07b741c7b9a3b5d802289c0f&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(apiUrl);
    // let parseData = await data.json();
    // console.log(parseData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articals: parseData.articles,
    //   loading: false,
    // });
    this.setState({page:this.state.page - 1});
    this.updateNews();
  };

  handleNextClick = async () => {
      console.log("Next");
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   let apiUrl = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=9b07d2dd07b741c7b9a3b5d802289c0f&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(apiUrl);
    //   let parseData = await data.json();

    //   this.setState({
    //     page: this.state.page + 1,
    //     articals: parseData.articles,
    //     loading: false,
    //   });
    // }
    this.setState({page:this.state.page + 1});
    this.updateNews();
  };

  render() {
    // console.log("render")
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsDevpristh - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articals.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
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
