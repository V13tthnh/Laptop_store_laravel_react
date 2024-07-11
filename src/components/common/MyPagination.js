import React, { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (page) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    disabled={currentPage === i}
                    style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div>
            <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;