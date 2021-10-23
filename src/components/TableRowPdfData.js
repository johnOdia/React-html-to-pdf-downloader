import React from "react";
import "./TableRowPdfData.css";

const TableRowPdfData = ({ data }) => {
    const renderData = () => {
        const tableData = data.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                </tr>
            )
        })
        return tableData;
    }

    return (
        <div id='content' >
            <div className='header'>Member_List</div>
            <div className='container'>
                <table id='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderData()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableRowPdfData;
