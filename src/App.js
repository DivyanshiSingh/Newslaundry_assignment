import "./App.css";
import Card from "./Cards";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search";
function App() {
  const [list, setList] = useState([]);
  const [headlineList, setHeadlineList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios({
        method: "GET",
        url:
          "https://cors-anywhere.herokuapp.com/https://ace.qtstage.io/api/v1/collections/entertainment",
      });
      setList(response.data.items);
      let newHeadlineList = [];
      response.data.items.map((storyItem)=>{
        const {id,item:{headline}} = storyItem;
        newHeadlineList.push({
          id,
          headline: headline[0]
        }); 
      })
      setHeadlineList(newHeadlineList);
    }
    fetchData();
  }, []);
  function handleChange (e) {
    setSearchKey(e.target.value);
    console.log(headlineList);
    if(searchKey.length>=2){
      const searchedIdList = headlineList.map((item)=>{
        console.log(item.headline, searchKey);
        if(item.headline.toLowerCase().includes(searchKey.toLowerCase()))
        return item.id;
      }).filter((item)=> item!==undefined)
      console.log(searchedIdList);
      const searchedStoryList = list.filter((item)=>{
        return searchedIdList.includes(item.id); 
      })
      setFilteredItems(searchedStoryList);
    }
    else if(searchKey.length<2){
      setFilteredItems([]);
    }
  }
  const renderSearchItems = () => {
    return (
      <React.Fragment>
        {
          filteredItems.map((item, index) => {
            return <Card cardContent={item} />;
          })
        }
      </React.Fragment>
    )
  }
  const renderItems = () => {
    return list.length ?
      list.map((item, index) => {
        return <Card cardContent={item} />;
      }) : "No Story"


  }
  return (
    <div className="App">
      <div className="App-navbar">
        <p className="App-nabar-heading">Newslaundry Intern Assignment</p>
      </div>
      <Search onChange={(e)=>handleChange(e)} value={searchKey}/> 
      <div className="storyGrid">
        {
          filteredItems.length ? renderSearchItems() : renderItems()
        }
      </div>
      
    </div>
  );
}

export default App;
