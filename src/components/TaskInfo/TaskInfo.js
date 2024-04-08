import './TaskInfo.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SDK } from '../sdk/sdk';
import { Editor } from 'primereact/editor';

const TicketComponent = ({ ticketInfo, setCurrentTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(ticketInfo);
  const [visibleTask, setVisibleTask] = useState(ticketInfo);

  const navigate = useNavigate();

  const validateFields = () => {
    const { summary, description, dateCreated, priority, assignee, status } = editedTask;
    if (!summary || !description || !dateCreated || !priority || !assignee || !status) {
      return false;
    }
    return true;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    setEditedTask(ticketInfo);
    setVisibleTask(ticketInfo); // Update visibleTask when ticketInfo changes
  }, [ticketInfo]);

  const handleCancelClick = () => {
    setEditedTask(ticketInfo);
    setIsEditing(false);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log('Saving task:', editedTask);
      const err = await SDK.updateTask(editedTask);
      if (err) {
        alert('Error saving task:', err);
        return;
      }
      setVisibleTask(editedTask);
      alert('Task saved successfully');
      setIsEditing(false);
    } else {
      alert('Please fill in all fields')
    }
  };

  const showTicket = () => {
    navigate(`/ticketInfo/${ticketInfo.id}`);
  }

  return (
    <div className="ticket">
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0' }}>
        <h2 className="summary">{ticketInfo.summary}</h2>
      </div>
      {isEditing ? (
        <div className="modal">
          <div className="modal-content">
            <div className="field-container-create">

              <div><label htmlFor="summary">Summary:</label></div>
              <br/>
              <div><input value={editedTask.summary} type="text" id="summary" name="summary" required onChange={(e) => setEditedTask({ ...editedTask, summary: e.target.value })} /></div>

            </div>
            <br/><br/>
            <div>
              <div><label htmlFor="description" style={{ fontWeight: 'bold' }}>Description:</label></div>
              <br/>
              <Editor value={editedTask.description} onTextChange={(e) => setEditedTask({ ...editedTask, description: e.htmlValue })} style={{ height: '320px', color: 'black' }} />
            </div>
            <form className="task-form">


              <div className="field-container-create">
                <div><label htmlFor="dueDate">Due Date:</label></div>
                <div><input type="date" id="dueDate" name="dueDate" required value={editedTask.dueDate} onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })} /></div>
              </div>
              <div className="field-container-create">
                <div><label htmlFor="priority">Priority:</label></div>
                <div>
                  <select id="priority" name="priority" value={editedTask.priority} onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div className="field-container-create">
                <div><label htmlFor="status">Status:</label></div>
                <div>
                  <select id="status" name="status" value={editedTask.status} onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}>
                    <option value="open">Open</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="field-container-create">
                <div><label htmlFor="assignee">Assignee:</label></div>
                <div><input type="text" name="assignee" required value={editedTask.assignee} onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value })} /></div>
              </div>
              <div className="button-group">

                <button id="cancelButt" onClick={handleCancelClick}>Cancel</button>

                <button onClick={handleSaveClick}>Save</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className='info-box'>
        <div className="description-box" dangerouslySetInnerHTML={{ __html: visibleTask.description }}>
        </div>
        <div className="details-box">
          <p className="details"><strong>Date Created:</strong> {visibleTask.dateCreated}</p>
          <p className="details"><strong>Due Date:</strong> {visibleTask.dueDate}</p>
          <p className="details"><strong>Priority:</strong> {visibleTask.priority}</p>
          <p className="details"><strong>Assignee:</strong> {visibleTask.assignee}</p>
          <p className="status"><strong>Status:</strong> {visibleTask.status}</p>
        </div>
      </div>
      <button className="edit-button" onClick={handleEditClick}>Edit</button>
      <button className="edit-button" id='commentsButt' onClick={showTicket}>Show comments</button>
    </div>
  );
};

export default TicketComponent;