import React from 'react';
import './Faqs.css';
import FaqCard from './faqCard';

const Faqs = () => {
    const faqs = [
        { question: 'Can education flashcards be used for all age groups?', answer: 'Answer1' },
        { question: 'How do education flashcards work?', answer: 'Answer 2' },
        { question: 'Can education flashcards be used for test preparation?', answer: 'Answer 3' },
        // Add more FAQs here
    ];

    return (
        <div class='faq'>
            <h1 id='title'>FAQ</h1>
            <div className='faq-container'>
            {faqs.map((faq, index) => (
                <FaqCard question={faq.question} answer={faq.answer} key={index} />
            ))}
            </div>
        </div>
    );
};

export default Faqs;