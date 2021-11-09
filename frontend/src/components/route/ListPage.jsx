import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import UserContext from "../../context/UserContext.js";
import NavigationBar from "../NavigationBar.jsx";
import MovieList from "../MovieList.jsx";


import { getListContent, removeFromList, changeList, getLists } from "../../data/lists";
import { getMovieData } from "../../data/movie.js";

const ListPage = (props) => {
  const { listid } = useParams();
  const [listContent, setListContent] = useState([]);
  const [listContentDetails, setListContentDetails] = useState([]);
  const [removeMsg, setRemoveMsg] = useState("");

  const [changeListBool, setChangeListBool] = useState(false);
  const [listInfo, setListInfo] = useState([]);
  const [selectedItemtoChange, setSelectedItemtoChange] = useState(null);
  const [selectedlist, setSelectedList] = useState(null);
  const [changeListMsg, setChangeListMsg] = useState("");

  const { currUser, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      let res = await getListContent(listid);
      console.log("Getting list content in ListPage", res);
      setListContent(res.data.listContent);
      if (res.data.listContent.length > 0) {
        console.log(res.data.listContent[0]['imdbId'])
        setSelectedItemtoChange(res.data.listContent[0]['imdbId'])
      }   
      setRemoveMsg("")
      setChangeListMsg("")
    })();
  }, [removeMsg, changeListMsg]);

  useEffect(() => {
    (async () => {
    const allFn = listContent
      .map((movie) => movie.imdbId)
      .map((id) => {
        return async () => {
          return await getMovieData(id);
        };
      });
    const listContentInfo = await Promise.all(allFn.map((fn) => fn()));

    setListContentDetails(listContentInfo)
    })();
  }, [listContent]);

  useEffect(() => {
    (async () => {
      let res = await getLists();
      console.log("Getting list info in ListPage", res);
      setListInfo(res.data.listInfo);
      if (res.data.listInfo.length > 0) {
        for (var i = 0; i <  res.data.listInfo.length; i++) {
          if (res.data.listInfo[i]['id'] != listid) {
            console.log(res.data.listInfo[i]['id'])
            setSelectedList(res.data.listInfo[i]['id'])
            break;
          }
        }
      } 
    })();
  }, [changeListBool]);

  const handleRemove = async (event) => {
    event.preventDefault();
    console.log(event.target.parentNode.className)
    let itemId = event.target.parentNode.className
    try {
      const res = await removeFromList(listid, itemId);
      console.log(res)
      setRemoveMsg(res.data.message)
    } catch (error) {
      console.log(error);
    }
  }

  const handleMove = async (event) => {
    setChangeListBool(!changeListBool)
  }

  const handleChangeList = async (event) => {
    let itemId = selectedItemtoChange
    try {
      const res = await changeList(selectedlist, itemId);
      console.log(res)
      setChangeListMsg(res.data.message)
      setChangeListBool(!changeListBool)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <NavigationBar history={props.history}/>
      <Container>
        {removeMsg && (<p className="message">{removeMsg}</p>)}
        {changeListMsg && (<p className="message">{changeListMsg}</p>)}
        {listContentDetails.length > 0 && (<button onClick={handleMove}>Move a Movie to a Different List</button>)}
        {changeListBool && (
          <>
            <select
              name="listItems"
              onChange={(e) => {
                setSelectedItemtoChange(e.target.value);
                setChangeListMsg("")
              }}
            >
              {listContentDetails.map(function (movie, index) {
                    return <option key={movie['imdbID']} value={movie['imdbID']}>{movie['Title']}</option>;
              })}
            </select>
            <select
              name="userLists"
              onChange={(e) => {
                setSelectedList(e.target.value);
                setChangeListMsg("")
              }}
            >
              {listInfo.map(function (li, index) {
                if (li.id != listid) {
                    return <option key={li.id} value={li.id}>{li.listName}</option>;
                }
              })}
            </select>
            <button
            onClick={handleChangeList}
            className="main_button"
            >
              Update List
            </button>
          </>
        )}
      </Container>
      {
        listContentDetails.length > 0 ? (
          <Container>
            {listContentDetails.map((movie) => {
              return (
                <div key={movie['imdbID']} className={movie['imdbID']}>
                  <p>{movie['Title']}</p>
                  <button onClick={handleRemove}>Remove From List</button>
                </div>
              );
            })}
            {/* {listContentDetails && <MovieList movies={listContentDetails} row={5} />} */}
          </Container>
        ) : (
          <Container>This list doesn't have anything in it yet! Add some movies or TV shows to this list to see them here.</Container>
        )
      }
    </div>
  );
};

export default ListPage;