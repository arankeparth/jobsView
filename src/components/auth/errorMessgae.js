import React from 'react';

const ErrorMessage = ({ error }) => {
    return (
        <div className="error-message">
            {error && <h5 class="errorMsg">{error}</h5>}
        </div>
    );
};

export default ErrorMessage;