import React from 'react';
import { Text } from 'react-native'
export const Timestamp = ({ timeAgo  ,timestampstyle}) => {
    function calculateTimeAgo(timestamp) {
        const currentDate = new Date();
        const createdAtDate = new Date(timestamp);
        const timeDifference = currentDate - createdAtDate;
        const seconds = Math.floor(timeDifference / 1000);

        if (seconds < 60) {
            return "0 min ago";
        }

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} min ago`;
        }

        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} hr ago`;
        }

        const days = Math.floor(hours / 24);
        if (days < 30) {
            return `${days} days ago`;
        }

        const months = Math.floor(days / 30);
        return `${months} month ago`;
    }
    return (
        <Text style={timestampstyle}>
          {calculateTimeAgo(timeAgo)}
        </Text>
      );
    };
    
