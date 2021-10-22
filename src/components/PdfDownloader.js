import React, { useState } from 'react';
import jsPDF from 'jspdf';
import TableRowPdfData from './TableRowPdfData';
import "./PdfDownloader.css"
import { AmiriRegular } from "./fonts";

const PdfDownloader = () => {
    const [value, setValue] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [isTableVisible, setTableVisible] = useState(false);

    const generatePdf = () => {
        const doc = new jsPDF("p", "pt", "a4");
        doc.addFileToVFS("Amiri-Regular.ttf", AmiriRegular);
        doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");

        doc.html(document.querySelector('#content'), {
            callback: (pdf) => {
                pdf.save("mypdf.pdf");
            }
        })
        setTimeout(() => {
            setValue([]);
            setTableVisible(false);
        }, 1000)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        generatePdf();
    }
    const handleChange = (e) => {
        const data = e.target.value;
        e.target.placeholder === 'Name' ? setName(data) : setAge(data);
    }
    const handleClick = () => {
        const entry = { name, age };
        setValue([
            ...value,
            entry,
        ]);
        setAge('');
        setName('');
    }
    const showTable = () => {
        isTableVisible ? setTableVisible(false) : setTableVisible(true);
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='inputContainer'>
                        <input type='text' placeholder='Name' value={name} onChange={handleChange} />
                        <input type='number' placeholder='Age' value={age} onChange={handleChange} />
                        <button type='button' onClick={handleClick} disabled={!name && !age}>Add</button>
                    </div>
                    <button type='button' disabled={!value[0]} onClick={showTable} className='preview' >
                        Preview
                    </button>
                    <button type='submit' disabled={!value[0] || !isTableVisible}>Download PDF</button>
                </form>
            </div>
            {isTableVisible ? <TableRowPdfData data={value} /> : ""}
        </>
    )
}

export default PdfDownloader;
