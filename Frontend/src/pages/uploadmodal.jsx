import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

function UploadModal({ isOpen, onClose, hostUser }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

      // Lấy tất cả các hàng trừ dòng đầu tiên
      const rows = worksheet.slice(1);
      
      // Lấy dữ liệu từ cột thứ 6 (chỉ lấy giá trị từ cột thứ 6)
      const students = rows.map(row => row[5]).filter(id => id);
      console.log(students);

      const payload = {
        managerUser: hostUser,
        students: students,
      };

      axios.post('http://localhost:3000/import', payload)
        .then((response) => {
          console.log('Data successfully sent:', response.data);
          onClose();
        })
        .catch((error) => {
          console.error('Error sending data:', error);
          onClose();
        });
    };

    reader.readAsArrayBuffer(file);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Upload excel file containing students list you manage</h3>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <div className="button-container">
          <button className='uploadbutton' onClick={handleUpload}>Complete</button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
