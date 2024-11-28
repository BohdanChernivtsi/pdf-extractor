import React from 'react';
import './ContentDisplay.css'

interface ExtractedData {
    data: string;
    isLoading: boolean;
    isError: boolean;
  }

interface ContentDisplayProps {
    radioSelected: string;
    extractedData: ExtractedData;
    pdfContent: string;
    handlePdfChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  }

  const ContentDisplay: React.FC<ContentDisplayProps> = ({ radioSelected, extractedData, pdfContent, handlePdfChange }) => {
  return (
    <div className='content-group'>
      {radioSelected === 'text' ? (
        <div className='content'>{extractedData?.data}</div>
      ) : (
        <textarea
          value={pdfContent}
          onChange={handlePdfChange}
          rows={30}
          cols={50}
          className='extract-textArea'
        />
      )}

      {extractedData?.isLoading && <b>Loading...</b>}

      {extractedData?.isError && <div><p>Error happened</p></div>}
    </div>
  );
}

export default ContentDisplay;