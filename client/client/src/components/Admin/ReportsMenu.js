import React, { useState, useEffect } from 'react';
import { getActiveIssues, getMembershipList, getMoviesList, getBooksList, getOverdueReturns } from '../../services/api';

const ReportsMenu = () => {
  const [activeReport, setActiveReport] = useState(null);
  const [reportData, setReportData] = useState([]);

  const fetchReport = async (reportType) => {
    setActiveReport(reportType);
    let data;
    switch (reportType) {
      case 'activeIssues':
        data = await getActiveIssues();
        break;
      case 'membershipList':
        data = await getMembershipList();
        break;
      case 'moviesList':
        data = await getMoviesList();
        break;
      case 'booksList':
        data = await getBooksList();
        break;
      case 'overdueReturns':
        data = await getOverdueReturns();
        break;
      default:
        data = [];
    }
    setReportData(data);
  };

  const renderReportData = () => {
    if (!activeReport) return null;

    return (
      <table>
        <thead>
          <tr>
            {Object.keys(reportData[0] || {}).map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Reports Menu</h2>
      <div>
        <button onClick={() => fetchReport('activeIssues')}>Active Issues</button>
        <button onClick={() => fetchReport('membershipList')}>Master list of Memberships</button>
        <button onClick={() => fetchReport('moviesList')}>Master list of Movies</button>
        <button onClick={() => fetchReport('booksList')}>Master list of Books</button>
        <button onClick={() => fetchReport('overdueReturns')}>Overdue returns</button>
      </div>
      {renderReportData()}
    </div>
  );
};

export default ReportsMenu;