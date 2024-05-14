import React from 'react';
import { GifState } from '../Context/GifContext';
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';

function FilterGif({ alignLeft = false, showTrending = false }) {
    const { filter, setFilter } = GifState();

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    const filters = [
        {
            title: "GIFs",
            value: "gifs",
            background: "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
        },
        {
            title: "Stickers",
            value: "stickers",
            background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
        },
        {
            title: "Text",
            value: "text",
            background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
        },
    ];

    return (
        <div className={`flex items-center ${alignLeft ? 'justify-start' : 'justify-center'} space-x-4`}>
            {showTrending && (
                <div className="flex items-center space-x-1">
                    <HiMiniArrowTrendingUp size={20} className="text-teal-400" />
                    <span className="font-semibold text-gray-400">Trending</span>
                </div>
            )}
            {filters.map((filterItem) => (
                <button
                    key={filterItem.value}
                    className={`text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-50 ${filter === filterItem.value ? 'bg-gray-800' : filterItem.background}`}
                    onClick={() => handleFilterChange(filterItem.value)}
                >
                    {filterItem.title}
                </button>
            ))}
        </div>
    );
}

export default FilterGif;
