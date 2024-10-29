import { useState } from "react";

interface props {
    items: string[];
    heading: string;
}

function ListGroup({items,heading}:props) {
    const [selectedIndex, SetSelectedIndex] = useState(0);
    return (
        <>
            <h1>{heading}</h1>
            <ul className="list-group">
                {items.length === 0 ? <p>No item found</p> : null}
                {items.map((item, index) => (
                    <li className={selectedIndex === index ? "list-group-item active" : "list-group-item"} key={item} onClick={() => { SetSelectedIndex(index); }}>{item}</li>
                ))}
            </ul>
        </>
    );
}

export default ListGroup