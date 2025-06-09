import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { handleError } from '../toast_message/errorMessage';
import { searchBarAPi } from '../API/SearchApi';
import { SearchContextApi } from '../context_api/SearchContextApi';

export const Navbar = () => {

  const { setSearchData } = useContext(SearchContextApi);

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState({ query: "" });

  const urlEncode = encodeURIComponent(search.query);

  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-600 font-semibold border-b-2 border-gray-500'
      : 'text-gray-700 hover:text-blue-500 transition-colors';

  const handleSearchChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSearch({
      ...search,
      [name]: value
    });
  };

  const handleSearchBarFormSubmission = async (e) => {
    e.preventDefault();

    const result = await searchBarAPi(search.query);
    console.log(result)
    const { success, data } = result;

    if (success) {
      setSearchData(data);
      setSearch({
        query: ""
      });
      navigate(`/search/${urlEncode}`);
    };
  };

  return (
    <nav className="bg-white shadow-md w-full z-10">
      <div className="max-w-[1340px] mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left - Logo */}
        <NavLink to="/home" className="text-xl font-bold text-blue-600">
          Expense Tracker
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-20">
          {/* Search bar */}
          <form onSubmit={handleSearchBarFormSubmission} className="flex items-center space-x-0.5">
            <input
              type="search"
              name="query"
              placeholder="Search..."
              value={search.query}
              onChange={handleSearchChange}
              className="px-4 py-2 border rounded-md text-sm w-40 md:w-80 lg:w-96 focus:outline-1"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {/* Nav Links */}
          <div className="flex items-center space-x-6">
            <NavLink to="/create" className={navLinkClass}>Create</NavLink>
            <NavLink to="/title-sort" className={navLinkClass}>Title Sort</NavLink>
            <NavLink to="/category-sort" className={navLinkClass}>Category Sort</NavLink>
            <NavLink to="/price-asc-sort" className={navLinkClass}>Ascending</NavLink>
            <NavLink to="/price-dsc-sort" className={navLinkClass}>Descending</NavLink>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-800" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 flex flex-col justify-center items-center">
          <form onSubmit={handleSearchBarFormSubmission} className="w-full flex space-x-2">
            <input
              type="search"
              name="query"
              placeholder="Search..."
              value={search.query}
              onChange={handleSearchChange}
              className="px-3 py-1 border rounded-md text-sm w-full focus:outline-1"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
          <NavLink to="/create" className={navLinkClass}>Create</NavLink>
          <NavLink to="/title-sort" className={navLinkClass}>Title Sort</NavLink>
          <NavLink to="/category-sort" className={navLinkClass}>Category Sort</NavLink>
          <NavLink to="/price-asc-sort" className={navLinkClass}>Ascending</NavLink>
          <NavLink to="/price-dsc-sort" className={navLinkClass}>Descending</NavLink>
        </div>
      )}
    </nav>
  );
};
