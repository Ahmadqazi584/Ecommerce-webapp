import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, Tooltip } from '@mui/material';
import { IoIosSearch } from "react-icons/io";
import { FiArrowDown, FiArrowUp, FiRefreshCw } from "react-icons/fi";
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import useCategories from '../../hooks/useCategory';

const Filters = () => {

    const { categories, categoriesLoading } = useCategories();

    console.log(categories)

    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Initialize state from URL params
    const [searchTerm, setSearchTerm] = useState(searchParams.get("keyword") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "All");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "asc");

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams(); 
        
        if (searchTerm) params.set("keyword", searchTerm);
        if (category !== "All") params.set("category", category);
        if (sortOrder !== "asc") params.set("sortOrder", sortOrder);
        
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }, [searchTerm, category, sortOrder, navigate, location.pathname]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
    };

    const handleSortOrderChange = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleClearFilters = () => {
        setSearchTerm("");
        setCategory("All");
        setSortOrder("asc");
    };

    return (
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div className="w-full md:w-1/3">
                <div className="relative">
                    <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Filter Controls */}
            <div className="w-full md:w-auto flex flex-col md:flex-row justify-end items-stretch gap-3">
                {/* Category Select */}
                <FormControl className="min-w-[180px]" size="small">
                <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        label="Category"
                        onChange={handleCategoryChange}
                        disabled={categoriesLoading}
                    >
                        <MenuItem value="All">All Categories</MenuItem>
                        {categoriesLoading ? (
                            <MenuItem disabled>Loading categories...</MenuItem>
                        ) : (
                            categories.map((cat) => (
                                <MenuItem key={cat.categoryId} value={cat.categoryName}>
                                    {cat.categoryName}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>

                {/* Sort Button */}
                <Tooltip title={`Sorted By Price: ${sortOrder}`}>
                    <Button
                        variant="contained"
                        color="primary"
                        className="h-[40px] gap-2 w-full md:w-auto"
                        onClick={handleSortOrderChange}
                    >
                        Sort Order
                        {sortOrder === 'asc' ? 
                            <FiArrowUp size={20} /> : 
                            <FiArrowDown size={20} />
                        }
                    </Button>
                </Tooltip>

                {/* Clear Filters */}
                <button 
                    onClick={handleClearFilters}
                    className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md transition-colors w-full md:w-auto h-[40px]"
                >
                    <FiRefreshCw />
                    <span>Clear Filters</span>
                </button>
            </div>
        </div>
    );
};

export default Filters;


    // const categories = [
    //     { "categoryID": 1, "categoryName": "Electronics" },
    //     { "categoryID": 2, "categoryName": "Clothing" },
    //     { "categoryID": 3, "categoryName": "Home & Kitchen" },
    //     { "categoryID": 4, "categoryName": "Books" },
    //     { "categoryID": 5, "categoryName": "Sports & Outdoors" }
    // ];