import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { MdModeEdit } from "react-icons/md";
import { MdOutlineCreditCardOff } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";

import {
  addTask,
  deleteTask,
  CompleteTask,
  unCompleteTask,
  editData,
  MyEditSave,
} from "./todoSlice";
import "./index.css";

const Display = () => {
  const [val, setVal] = useState("");
  const [editBtnFlag, setEditBtnFlag] = useState(true);
  const [tmpId, setTmpId] = useState("");
  const mydata = useSelector((state) => state.todo.task);
  const myeditData = useSelector((state) => state.todo.workdata);
  const MyDispatch = useDispatch();

  const myTaskAdd = () => {
    if (val.trim() !== "") {
      MyDispatch(addTask(val));
      toast.success("Task added suceessfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setVal("");
    } else {
      toast.warn("Please enter a task before adding!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const myTaskDelete = (myid) => {
    MyDispatch(deleteTask(myid));
    toast.error("task deleted successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const myTaskComplete = (myid) => {
    MyDispatch(CompleteTask(myid));
    toast.success("Task completed", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const myTaskUncomplete = (myid) => {
    MyDispatch(unCompleteTask(myid));
    toast.warn("task is yet to complete", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const myTaskEdit = (myid) => {
    MyDispatch(editData(myid));
    setEditBtnFlag(false);
    setTmpId(myid);
  };

  useEffect(() => {
    setVal(myeditData);
  }, [myeditData]);

  const editDataSave = () => {
    MyDispatch(MyEditSave({ id: tmpId, myData: val }));
    setEditBtnFlag(true);
    toast.success("Task Edited Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setVal("");
  };

  const ans = mydata.map((key, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td className={key.status ? "" : "completed-task"}>
        {key.status ? key.work : <span>{key.work}</span>}
      </td>
      <td>
        <button onClick={() => myTaskDelete(key.id)}>
          <AiFillDelete style={{ fontSize: "20px", color: "red" }} />
        </button>
      </td>
      <td>
        <button onClick={() => myTaskComplete(key.id)}>
          <TiTick style={{ fontSize: "25px", color: "green" }} />
        </button>
      </td>
      <td>
        <button onClick={() => myTaskUncomplete(key.id)}>
          <MdOutlineCreditCardOff style={{ fontSize: "25px" }} />
        </button>
      </td>
      <td>
        <button onClick={() => myTaskEdit(key.id)}>
          <MdModeEdit style={{ fontSize: "25px", color: "blue" }} />
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container">
      <h1> Todo App </h1>
      <label htmlFor="task">Enter Task:</label>
      <input
        type="text"
        className="task-input"
        placeholder="Enter task here..."
        name="task"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
      {editBtnFlag ? (
        <button
          className="add-btn"
          onClick={myTaskAdd}
          style={{ color: "black" }}
        >
          <IoAddSharp style={{ fontSize: "30px" }} />
        </button>
      ) : (
        <button className="save-btn" onClick={editDataSave}>
          <FaSave style={{ fontSize: "30px", color: "black" }} />
        </button>
      )}
      <hr />
      <table className="task-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Task</th>
            <th>Delete</th>
            <th>Complete</th>
            <th>Uncomplete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{ans}</tbody>
      </table>
    </div>
  );
};

export default Display;
