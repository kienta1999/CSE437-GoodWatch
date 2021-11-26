import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col} from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";

import { getLists, checkList, removeFromList, addToList } from "../data/lists";
import UserContext from "../context/UserContext.js";

const UpdateLists = ({ movieid }) => {
    const { currUser, setUser } = useContext(UserContext);

    const [existingLists, setExistingLists] = useState([]);
    const [listInfo, setListInfo] = useState([]);
    const [listOptions, setListOptions] = useState([{label:"hi",value:"hi"}]);
    const [possibleListIds, setPossibleListIds] = useState(null);
    const [selectedlists, setSelectedLists] = useState([]);
    const [addToListMsg, setAddToListMsg] = useState("");

    //Get all user's lists
    useEffect(() => {
        (async () => {
    
        let res = await getLists();
        console.log("Getting list info in MoviePage", res);
        setListInfo(res.data.listInfo);

        if (res.data.listInfo) {
            if (res.data.listInfo.length > 0) {

            let possibleListIdsTemp = [];
            res.data.listInfo.map((list) => {
                console.log(list);
                possibleListIdsTemp.push(list["id"]);
            });
            setPossibleListIds(possibleListIdsTemp);
            }
        }

        if (res.data.listInfo) {
            if (res.data.listInfo.length > 0) {
            var listOpts = []
            res.data.listInfo.map(function (li, index) {
                listOpts.push({
                label: li.listName,
                value: li.id
                })
            });
            setListOptions(listOpts);
            }
        }
        
        })();
    }, []);

    //Check if movie is currently in a list
    useEffect(() => {
        (async () => {
        if (possibleListIds) {
            let res = await checkList(movieid, possibleListIds);
            console.log("Checking list info in MoviePage", res);
            if (res.data.existingLists) {
              if (res.data.existingLists.length > 0) {
                  var selected = []
                  res.data.existingLists.map(function (li, index) {
                  selected.push({
                      label: li.listName,
                      value: li.id
                  })
                  });
                  setExistingLists(selected);
                  setSelectedLists(selected)
              }
            }
        }
        })();
    }, [addToListMsg, possibleListIds]);

    //Add movie to selected lists
    const handleAddToList = async () => {
        if (!currUser || JSON.stringify(currUser) === "{}") {
        alert("Please login to add to lists");
        } else {
            try {

                const res = await removeFromList(listInfo, movieid)
                console.log("Remove from all lists", res)

                const res2 = await addToList(selectedlists, movieid);
                setAddToListMsg(res2.data.message);

            } catch (error) {
                console.log(error);
            }
        }
    };
     
    return (
      <>
        {selectedlists && selectedlists.length==0 ? (
          <strong>
            Add to a List
          </strong>
        ) : (
          <strong>
            Add to a List
          </strong>
        )}
        <br></br>
        <small className="message">{addToListMsg}</small>

        {listInfo && listInfo.length > 0 ? (
            <>
              {/* <pre>{JSON.stringify(selectedlists)}</pre> */}
              <MultiSelect
                options={listOptions}
                value={selectedlists}
                onChange={setSelectedLists}
                labelledBy="Select"
                hasSelectAll={false}
                disableSearch={true}
              />
              <button
                onClick={handleAddToList}
                className="btn btn-sm btn-primary"
              >
                Update Lists
              </button>
            </>
          ) : (
            <></>
          )}

          {listInfo &&
          listInfo.length == 0 &&
          currUser &&
          JSON.stringify(currUser) !== "{}" ? (
            <p>
              You don't have any lists yet! Make one in your profile page first to
              add this movie to a list.
            </p>
          ) : (
            <></>
          )}

      </>
    );
  };
  
  export default UpdateLists;