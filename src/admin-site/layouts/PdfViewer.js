import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Button, Row, Col } from 'antd'
import classes from './assets/PdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const style = { padding: '8px 0' };
const API_HOST = process.env.REACT_APP_DISWIKI_API_URL;
export default function PdfViewer(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    function nextPage() {
        if (pageNumber > 0)
            setPageNumber(pageNumber + 1)
    }
    function prevPage() {
        if (pageNumber > 1)
            setPageNumber(pageNumber - 1)
    }
    return (
        <div style={{ marginTop: '-25px' }} >
            <Row gutter={24}>
                <Col className="gutter-row" span={3}>
                    <div style={style}>
                        <Button type="primary" onClick={prevPage}>
                            Previous
                        </Button>
                    </div>
                </Col>
                <Col className="gutter-row" span={16}>
                </Col>
                <Col className="gutter-row" span={3}>
                    <div style={style}>
                        <Button type="primary" onClick={nextPage}>
                            Next
                        </Button>
                    </div>
                </Col>
            </Row>



            <Document
                file={{
                    url: `${API_HOST}file/download-document?file_name=${props.file_name}`,
                    // withCredentials: true,
                    // httpHeaders: {
                    //     'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
                    // }
                    // url: 'http://localhost:5000/api/file/showfile?access_tokem=asdasd'
                }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    );
}