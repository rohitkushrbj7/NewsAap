import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
     let {title , description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%", zIndex:"1"}}>
              {source} </span>
        <img src={!imageUrl?"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704931200&semt=sph":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}  </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on  {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blanck' className="btn btn-sm btn-dark">Read more</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem

// // <button type="button" class="btn btn-primary position-relative">
//   Inbox
 
// </button>