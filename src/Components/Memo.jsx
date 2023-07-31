import React, { useState, useMemo } from "react";

export default function SomeComponent() {

    const [data, setData] = useState([
        { id: 1, name: 'Apple', price: 2.99 },
        { id: 2, name: 'Banana', price: 1.99 },
        { id: 3, name: 'Cherry', price: 4.99 },
        { id: 4, name: 'Durian', price: 9.99 },
        { id: 5, name: 'Elderberry', price: 6.99 },
        ]);

    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const filteredAndSortedData = useMemo(() => {
        console.log("Started filteredAndSortedData");
        const filteredData = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        const sortedData = filteredData.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
        return sortedData;
    }, [data, search, sortOrder]) 

    return(
        <div>
            <input
                type="text"
                name="searchQuerry"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
            >
                <option value="asc">
                    Sort by ASC
                </option>
                <option value="desc">
                    Sort by DESC
                </option>
            </select>
            <hr />
            <ul>
                {filteredAndSortedData.map(item => (<li key={item.id}>Name: {item.name}; Price: {item.price}</li>))}
            </ul>
        </div>
    );
}