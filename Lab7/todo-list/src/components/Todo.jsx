import { useEffect, useRef, useState, useCallback } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Webcam from "react-webcam";
import { addPhoto, GetPhotoSrc } from "../db.jsx";

const WebcamCapture = (props) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgId, setImgId] = useState(null);
  const [photoSave, setPhotoSave] = useState(false);

  useEffect(() => {
    if (photoSave) {
      props.photoedTask(imgId);
      setPhotoSave(false);
    }
  }, [photoSave, imgId, props]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;
    setImgSrc(imageSrc);
  }, []);

  const savePhoto = (id, src) => {
    if (!src) return;
    addPhoto(id, src);
    setImgId(id);
    setPhotoSave(true);
  };

  const cancelPhoto = () => {
    setImgSrc(null);
    setImgId(null);
    setPhotoSave(false);
  };

  return (
    <>
      {!imgSrc && <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />}
      {imgSrc && <img src={imgSrc} alt="capture" />}
      <div className="btn-group">
        {!imgSrc && (
          <button type="button" className="btn" onClick={capture}>
            Capture photo
          </button>
        )}
        {imgSrc && (
          <button type="button" className="btn" onClick={() => savePhoto(props.id, imgSrc)}>
            Save Photo
          </button>
        )}
        <button type="button" className="btn todo-cancel" onClick={cancelPhoto}>
          Cancel
        </button>
      </div>
    </>
  );
};

const ViewPhoto = (props) => {
  const photoSrc = GetPhotoSrc(props.id);
  return (
    <>
      <div>{photoSrc ? <img src={photoSrc} alt={props.alt} /> : <p>No photo saved.</p>}</div>
    </>
  );
};

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);
  const editButtonRef = useRef(null);

  useEffect(() => {
    setNewName(props.name);
  }, [props.name]);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;
    props.editTask(props.id, trimmed);
    setEditing(false);
    editButtonRef.current?.focus();
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => {
            setNewName(props.name);
            setEditing(false);
            editButtonRef.current?.focus();
          }}
        >
          Cancel <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          checked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}{" "}
          <a href={props.location?.mapURL}>(map)</a>
          &nbsp; | &nbsp;
          <a href={props.location?.smsURL}>(sms)</a>
        </label>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>

        <Popup
          trigger={
            <button type="button" className="btn">
              Take Photo
            </button>
          }
          modal
        >
          <div>
            <WebcamCapture id={props.id} photoedTask={props.photoedTask} />
          </div>
        </Popup>

        <Popup
          trigger={
            <button type="button" className="btn">
              View Photo
            </button>
          }
          modal
        >
          <div>
            <ViewPhoto id={props.id} alt={props.name} />
          </div>
        </Popup>

        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;