import React, { useEffect, useState } from "react";
import "./table.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  usersObj,
  addNewUser,
  EditUser,
  deleteUser,
} from "../redux/user/userSlice";
import { RootState } from "../redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";

const Table = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [actions, setActions] = useState("");
  const [add, setAdd] = useState(false);
  const [addUser, setAddUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });
  const [eUser, setEuser] = useState({
    id: -1,
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });
  const [searchData, setSearchData] = useState("");

  const submitHandler = () => {
    dispatch(addNewUser({ ...addUser, id: users.length + 1 }));
    setAdd(false);
    setAddUser({ first_name: "", last_name: "", email: "", avatar: "" });
  };

  const deleteHandler = (id: number) => {
    dispatch(deleteUser(id));
  };

  const editHandler = () => {
    dispatch(EditUser(eUser));
    setEuser({ id: -1, first_name: "", last_name: "", email: "", avatar: "" });
  };

  const onAddCancel = () => {
    setAdd(false);
    setAddUser({ first_name: "", last_name: "", email: "", avatar: "" });
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <h1>Table</h1>
      <div>
        <input
          placeholder="search something here"
          onChange={(e) => {
            setSearchData(e.target.value);
          }}
        />
      </div>
      {add ? (
        <button onClick={onAddCancel}>cancel</button>
      ) : (
        <button onClick={() => setAdd(!add)}>Add user</button>
      )}
      <table className="table" width={"90%"}>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>avatar</th>
          <th>actions</th>
        </tr>
        {searchData ? (
          <>
            {users
              .filter(
                (user: usersObj) =>
                  Object.values(user).filter((i: string | number) =>
                    String(i).toLowerCase().includes(searchData.toLowerCase())
                  ).length
              )
              .map((user: usersObj) => (
                <>
                  {eUser.id === user.id ? (
                    <tr>
                      <td></td>
                      <td>
                        <input
                          name="first_name"
                          placeholder="first name"
                          value={eUser?.first_name}
                          onChange={(e) =>
                            setEuser({ ...eUser, first_name: e.target.value })
                          }
                        />
                        <input
                          name="last_name"
                          placeholder="last name"
                          value={eUser?.last_name}
                          onChange={(e) =>
                            setEuser({ ...eUser, last_name: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          name="email"
                          placeholder="email"
                          value={eUser?.email}
                          onChange={(e) =>
                            setEuser({ ...eUser, email: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          name="avatar"
                          placeholder="imageURL"
                          value={eUser?.avatar}
                          onChange={(e) =>
                            setEuser({ ...eUser, avatar: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <button onClick={editHandler}>Save</button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{user.id}</td>
                      <td>
                        {user.first_name} {user.last_name}
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <img height={"30px"} src={user.avatar} alt="user" />
                      </td>
                      <td>
                        <button onClick={() => setEuser(user)}>Edit</button>{" "}
                        <button onClick={() => deleteHandler(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )}
                </>
              ))}
          </>
        ) : (
          <>
            {users.map((user: usersObj) => (
              <>
                {eUser.id === user.id ? (
                  <tr>
                    <td></td>
                    <td>
                      <input
                        name="first_name"
                        placeholder="first name"
                        value={eUser?.first_name}
                        onChange={(e) =>
                          setEuser({ ...eUser, first_name: e.target.value })
                        }
                      />
                      <input
                        name="last_name"
                        placeholder="last name"
                        value={eUser?.last_name}
                        onChange={(e) =>
                          setEuser({ ...eUser, last_name: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        name="email"
                        placeholder="email"
                        value={eUser?.email}
                        onChange={(e) =>
                          setEuser({ ...eUser, email: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        name="avatar"
                        placeholder="imageURL"
                        value={eUser?.avatar}
                        onChange={(e) =>
                          setEuser({ ...eUser, avatar: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <button onClick={editHandler}>Save</button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>{user.id}</td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <img height={"30px"} src={user.avatar} alt="user" />
                    </td>
                    <td>
                      <button onClick={() => setEuser(user)}>Edit</button>{" "}
                      <button onClick={() => deleteHandler(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </>
        )}
        {add && (
          <tr id="edit">
            <td></td>
            <td>
              <input
                name="first_name"
                placeholder="first name"
                value={addUser?.first_name}
                onChange={(e) =>
                  setAddUser({ ...addUser, first_name: e.target.value })
                }
              />
              <input
                name="last_name"
                placeholder="last name"
                value={addUser?.last_name}
                onChange={(e) =>
                  setAddUser({ ...addUser, last_name: e.target.value })
                }
              />
            </td>
            <td>
              <input
                name="email"
                placeholder="email"
                value={addUser?.email}
                onChange={(e) =>
                  setAddUser({ ...addUser, email: e.target.value })
                }
              />
            </td>
            <td>
              <input
                name="avatar"
                placeholder="imageURL"
                value={addUser?.avatar}
                onChange={(e) =>
                  setAddUser({ ...addUser, avatar: e.target.value })
                }
              />
            </td>
            <td>
              <button onClick={submitHandler}>Add</button>{" "}
              <button onClick={onAddCancel}>Cancel</button>
            </td>
          </tr>
        )}
      </table>
    </>
  );
};
export default Table;
