import "./App.css";
import Card from "./Cards";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { fetchStories } from "./api/story.api";
function App() {
  const [list, setList] = useState([]);
  const [headlineList, setHeadlineList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetchStories();
      setList(response.items);
      let newHeadlineList = [];
      response.items.map((storyItem) => {
        const {
          id,
          item: { headline },
        } = storyItem;
        newHeadlineList.push({
          id,
          headline: headline[0],
        });
      });
      setHeadlineList(newHeadlineList);
    }
    fetchData();
  }, []);
  function handleChange(e) {
    setSearchKey(e.target.value);

    if (searchKey.length >= 2) {
      const searchedIdList = headlineList
        .map((item) => {
          if (item.headline.toLowerCase().includes(searchKey.toLowerCase()))
            return item.id;
        })
        .filter((item) => item !== undefined);
      if (searchedIdList.length > 0) {
        const searchedStoryList = list.filter((item) => {
          return searchedIdList.includes(item.id);
        });

        setFilteredItems(searchedStoryList);
      }
    }
    if (searchKey.length < 2) {
      setFilteredItems([]);
    }
  }
  const renderSearchItems = () => {
    return (
      <React.Fragment>
        {filteredItems.map((item, index) => {
          return <Card cardContent={item} />;
        })}
      </React.Fragment>
    );
  };
  const renderItems = () => {
    return list.length
      ? list.map((item, index) => {
          return <Card cardContent={item} />;
        })
      : "No Story";
  };
  return (
    <div className="App">
      <div className="App-navbar">
        <p className="App-nabar-heading">Newslaundry Intern Assignment</p>
      </div>
      <Search onChange={(e) => handleChange(e)} value={searchKey}/>
      <div className="storyGrid">
        {filteredItems.length ? renderSearchItems() : renderItems()}
      </div>
    </div>
  );
}

export default App;
