
import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import TicketComponent from '../TaskInfo/TaskInfo';
import './TicketPage.css'
import SingleComment from '../comments/singleComment';
import { useParams } from 'react-router-dom';
import { SDK } from '../sdk/sdk';
import LoadingIcons from 'react-loading-icons'
const TicketPage = () => {
  const ticketId = useParams().ticketId;
  const [addingComment, setAddingComment] = useState(false);
  const [ticket, setTicket] = useState({
});
  const [comments, setComments] = useState([]); // [comments, setComments
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
    setAddingComment(false);
  };

  useEffect(() => {
    fetchTicketData();
  }, [ticketId]);

  const handleCommentSubmit = async (event) => {
    try {
      setAddingComment(true);
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

          <form onSubmit={handleCommentSubmit} class="comment-form">
            <input id ="coment" type="text" value={commentInput} onChange={handleCommentChange} placeHolder='Enter comment'/>
           
            {addingComment ? (
               <div><LoadingIcons.Oval stroke="gray" style={{scale: '0.8'}} speed={2}/></div>
            ) : (
              <button type="submit">Add comment</button>
            )}
          </form>
          <ul className='comments-container'>
            {ticket && ticket.comments ? (
              ticket.comments.map(comment => (
                <SingleComment key={comment.id} comment={comment}></SingleComment>
              ))
            ) : (
              <div className='loading'>
           <div className='loading-box'><LoadingIcons.ThreeDots stroke="gray" style={{scale: 1}} speed={2}/></div>
        </div>
            )}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default TicketPage;
