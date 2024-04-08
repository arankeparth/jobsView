
import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import TicketComponent from '../TaskInfo/TaskInfo';
import './TicketPage.css'
import SingleComment from '../comments/singleComment';
import { useParams } from 'react-router-dom';
import { SDK } from '../sdk/sdk';
const TicketPage = () => {
  const ticketId = useParams().ticketId;
  
  const [ticket, setTicket] = useState({
    "comments":[]
  });
  const [commentInput, setCommentInput] = useState('');

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  }; 

  const fetchTicketData = async () => {
    try {
      const ticketIdInt = parseInt(ticketId);
      const filter = {"id": ticketIdInt}
      const ticketData = await SDK.fetchTasks(filter);
      const comments = await SDK.fetchComments(ticketIdInt);
      ticketData[0].comments = comments;
      setTicket(ticketData[0]);
    } catch (error) {
      console.error('Error fetching ticket data:', error);
    }
  };

  useEffect(() => {
    fetchTicketData();
  }, [ticketId]);

  const handleCommentSubmit = async (event) => {
    try {
      event.preventDefault();
      const customer = await SDK.fetchCustomer(localStorage.getItem('customerid'));
      console.log(ticketId);
      const ticketIdInt = parseInt(ticketId);
      const newComment = {
        "id" : ticket.comments.length + 1,
        "author_name": customer.fisrtname + " " + customer.lastname,
        "content": commentInput,
        "ticketid": ticketIdInt,
      };
      await SDK.createComment(newComment);
      setCommentInput('');
      fetchTicketData();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleEditTicket = () => {
    // Implement edit functionality as needed
    // This function might toggle an edit mode or navigate to a separate edit page
    console.log('Edit ticket');
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className='ticket-info-comments'>
        <TicketComponent ticketInfo={ticket}></TicketComponent>
        <div className='comments-box'>
          <h2>Comments</h2>

          <form onSubmit={handleCommentSubmit}>
            <input id ="coment" type="text" value={commentInput} onChange={handleCommentChange} placeHolder='Enter comment'/>
            <button type="submit">Add comment</button>
          </form>
          <ul className='comments-container'>
            {ticket && ticket.comments.length > 0 ? (
              ticket.comments.map(comment => (
                <SingleComment key={comment.id} comment={comment}></SingleComment>
              ))
            ) : (
              <></>
            )}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default TicketPage;
