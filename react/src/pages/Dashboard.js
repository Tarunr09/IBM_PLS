import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';  // For txt file
import { Document, Packer, Paragraph, TextRun } from "docx";  // For docx file
//import jsPDF from 'jspdf';

const Dashboard = () => {
  const [selectedLeftBrain, setSelectedLeftBrain] = useState([]);
  const [selectedRightBrain, setSelectedRightBrain] = useState([]);
  const [speech, setSpeech] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [preferredStyle, setPreferredStyle] = useState('');

  const handleCheckboxChange = (event, setState) => {
    const { name, checked } = event.target;
    setState(prevState =>
      checked ? [...prevState, name] : prevState.filter(item => item !== name)
    );
  };

  const handleStyleChange = (event) => {
    setPreferredStyle(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate_speech', {
        topic,
        left_elements: selectedLeftBrain,
        right_elements: selectedRightBrain,
        style: preferredStyle
      });
      setSpeech(response.data.speech);
    } catch (error) {
      console.error('Error generating speech:', error);
      alert('Failed to generate speech. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const leftBrainElements = ["Educate", "Inform", "Solve Problems"];
  const rightBrainElements = ["Entertain", "Inspire", "Challenge"];
  const styles = ["Text", "Voice Script", "Video Script"];

  const renderSpeechParagraphs = () => {
    return speech.split('\n').map((paragraph, index) => (
      <p key={index} className="text-lg leading-relaxed mb-4">{paragraph}</p>
    ));
  };

  const generateContent = () => {
    return `Topic: ${topic}\n\nLeft Brain Elements: ${selectedLeftBrain.join(', ')}\nRight Brain Elements: ${selectedRightBrain.join(', ')}\nPreferred Style: ${preferredStyle}\n\nSpeech:\n${speech}`;
  };

  // Function to download speech as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10; // 10 mm margin
    const maxLineWidth = pageWidth - 2 * margin;
    const lineHeight = 10; // Line height in mm
    let cursorY = margin + 10; // Initial Y position
  
    doc.setFontSize(12);
  
    const content = `
    Topic: ${topic}
  
    Left Brain Elements: ${selectedLeftBrain.join(', ')}
  
    Right Brain Elements: ${selectedRightBrain.join(', ')}
  
    Preferred Style: ${preferredStyle}
  
    Speech:
    ${speech}
    `;
  
    const splitText = doc.splitTextToSize(content, maxLineWidth);
  
    splitText.forEach((line, index) => {
      // Check if adding this line would exceed the page height
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = margin; // Reset Y position for the new page
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight; // Move Y position down for the next line
    });
  
    doc.save(`${topic}_speech.pdf`);
  };
  

  // Function to download speech as a DOCX
  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ text: `Topic: ${topic}`, heading: "Heading1" }),
            new Paragraph({ text: `Left Brain Elements: ${selectedLeftBrain.join(', ')}` }),
            new Paragraph({ text: `Right Brain Elements: ${selectedRightBrain.join(', ')}` }),
            new Paragraph({ text: `Preferred Style: ${preferredStyle}` }),
            new Paragraph({ text: `Speech:\n${speech}`, spacing: { after: 200 } }),
          ],
        },
      ],
    });
  
    try {
      // Use toBlob instead of toBuffer
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${topic}_speech.docx`);
    } catch (error) {
      console.error('Error generating DOCX:', error);
      alert('Failed to generate DOCX file. Please try again later.');
    }
  };
  
  
  // Function to download speech as a TXT
  const downloadTXT = () => {
    const blob = new Blob([generateContent()], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${topic}_speech.txt`);
  };

  return (
    <div className="overflow bg-richblack-900 text-white flex justify-center flex-col items-center">
      <main className="flex-1 py-7 flex flex-col items-center justify-center px-4 relative w-full h-full">
        <h1 className="text-4xl md:text-6xl font-bold mt-8 text-center z-0">
          Identify your <br /><span className="text-yellow-400">Learning</span> Style
        </h1>
        <div className="w-full max-w-md mt-8 relative">
          <input
            type="text"
            placeholder="Enter Keywords"
            className="w-full py-3 px-4 pr-16 text-black rounded-lg"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black py-2 px-4 rounded-lg"
            onClick={handleSubmit}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
        </div>
        <div className="w-full max-w-4xl mt-4 flex justify-center space-x-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Left Brain Elements:</h2>
            <div className="mt-2">
              {leftBrainElements.map(element => (
                <label key={element} className="flex items-center space-x-2 m-2">
                  <input
                    type="checkbox"
                    name={element}
                    checked={selectedLeftBrain.includes(element)}
                    onChange={(e) => handleCheckboxChange(e, setSelectedLeftBrain)}
                    className="form-checkbox h-5 w-5 text-yellow-400"
                  />
                  <span className="text-lg">{element}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Right Brain Elements:</h2>
            <div className="mt-2">
              {rightBrainElements.map(element => (
                <label key={element} className="flex items-center space-x-2 m-2">
                  <input
                    type="checkbox"
                    name={element}
                    checked={selectedRightBrain.includes(element)}
                    onChange={(e) => handleCheckboxChange(e, setSelectedRightBrain)}
                    className="form-checkbox h-5 w-5 text-yellow-400"
                  />
                  <span className="text-lg">{element}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="text-center">
          <h2 className="text-2xl font-bold">Preferred Style:</h2>
          <div className="mt-2">
            {styles.map(style => (
              <label key={style} className="flex items-center space-x-2 m-2">
                <input
                  type="radio"
                  name="style"
                  value={style}
                  checked={preferredStyle === style}
                  onChange={handleStyleChange}
                  className="form-radio h-5 w-5 text-yellow-400"
                />
                <span className="text-lg">{style}</span>
              </label>
            ))}
          </div>
        </div>
        </div>
        
        <div className="max-w-4xl mt-8 px-4 text-center">
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {renderSpeechParagraphs()}
              {speech && (
                <div className="mt-6 space-x-4">
                  <button
                    onClick={downloadPDF}
                    className="bg-yellow-400 text-black py-2 px-4 rounded-lg"
                  >
                    Download as PDF
                  </button>
                  <button
                    onClick={downloadDOCX}
                    className="bg-yellow-400 text-black py-2 px-4 rounded-lg"
                  >
                    Download as DOCX
                  </button>
                  <button
                    onClick={downloadTXT}
                    className="bg-yellow-400 text-black py-2 px-4 rounded-lg"
                  >
                    Download as TXT
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
