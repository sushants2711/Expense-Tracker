import React, { useContext, useEffect } from 'react';
import { SearchContextApi } from '../context_api/SearchContextApi';
import { Link } from 'react-router-dom';

export const SearchPage = () => {
    const { searchData } = useContext(SearchContextApi);

    useEffect(()=> {
        document.title = "Search-Page";
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Search Results: {searchData.length}
                </h1>

                {searchData.length > 0 ? (
                    <div className="overflow-x-auto shadow-lg rounded-xl bg-white border border-blue-100">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800 uppercase">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800 uppercase">
                                        Title
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800 uppercase">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800 uppercase">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {searchData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-blue-50 transition duration-200"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {item.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">
                                            ₹{item.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center mt-20">
                        <h2 className="text-lg text-red-600 font-semibold">
                           Oops! You're looking for something that is currently not available...
                        </h2>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link
                        to="/home"
                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
