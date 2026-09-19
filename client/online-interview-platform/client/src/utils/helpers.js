// This file exports utility functions that can be used throughout the application.

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateTimeDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end - start;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
};

export const isEmpty = (value) => {
    return value === null || value === undefined || value === '';
};