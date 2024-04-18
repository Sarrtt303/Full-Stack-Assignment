import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VerificationPage = () => {
  const { email } = useParams();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendVerificationEmail = async () => {
      try {
        setIsLoading(true); // Set loading state to true before sending the email
        const response = await fetch(`/api/send-verification-email/${email}`, {
          method: 'GET',
        });
        const data = await response.json();
        setVerificationStatus(data.success);
      } catch (error) {
        console.error('Error sending verification email:', error);
        setVerificationStatus(false);
      } finally {
        // Simulate the loading state for 3 seconds
        setTimeout(() => {
          setIsLoading(false);
        }, 10000);
      }
    };

    sendVerificationEmail();
  }, [email]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        {isLoading ? (
          <div className="flex items-center text-yellow-500">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>Sending verification email...</p>
          </div>
        ) : verificationStatus === null ? (
          <div className="flex items-center text-gray-500">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p>Waiting for response...</p>
          </div>
        ) : verificationStatus ? (
          <div className="flex items-center text-green-500">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>Verification email sent successfully. Please check your inbox.</p>
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>Error sending verification email. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;