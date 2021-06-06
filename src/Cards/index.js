import React, { Component } from "react";
import axios from "axios";
import "./card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export class Card extends Component {
  constructor(props) {
    super(props);
		this.state={
			isfavorite:false,
		}
  }
	componentDidMount(){
		const favList= localStorage.getItem("favoriteList");
		if(favList) {
			let data = JSON.parse(favList);
			if(data.includes(this.props.cardContent.id)){
				this.setState({
					isfavorite:true
				})
			}
		}

	}
  render() {
    const { story, id } = this.props.cardContent;
    const date = new Date(story["content-created-at"]);
    return (
      <div className="card-container">
        <div className="card-header">
          <div>
            <div className="card-header-title">{story.headline}</div>
            <div className="card-header-author">{story["author-name"]}</div>
          </div>

          <div className="card-header-date">
            {`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}
          </div>
        </div>
        <div className="card-body">
					<a href={story.url}>Read more</a>
				</div>
        <div className="card-footer">
					<div onClick={(e)=>{
						if(!this.state.isfavorite){
							const favorite = localStorage.getItem('favoriteList');
							if(favorite) {
								const newFavorite = [...JSON.parse(favorite),id];
								localStorage.setItem("favoriteList",JSON.stringify(newFavorite));
							}
							else localStorage.setItem("favoriteList",JSON.stringify([id]));

						}
						else{
							const favorite = JSON.parse(localStorage.getItem('favoriteList'));
							const newFavorite = favorite.filter((item)=> item!== this.props.cardContent.id)
							localStorage.setItem("favoriteList",JSON.stringify(newFavorite));

						}
					
						this.setState({
							isfavorite: !this.state.isfavorite
						})
						
						
					}}>
					<FontAwesomeIcon icon={faHeart} className={this.state.isfavorite?"card-footer-icon fav":"card-footer-icon"}/>
					</div>
					
				</div>
      </div>
    );
  }
}

export default Card;
