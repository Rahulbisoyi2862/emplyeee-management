import React from 'react';

const StockDetailPage = () => {
  return (
    <div className="h-screen bg-red-700 flex items-center justify-center py-3">
      <div className="bg-white rounded-lg shadow-lg w-full  ">
        <iframe
          src="https://docs.google.com/spreadsheets/d/1dm6Pc3jvLhhzMu1bZBYe-V2EjEteLwR7T1sgc-YRiVo/edit?usp=sharing"
          width="100%"
          className='h-screen'

          title="Stock Data"
        ></iframe>


      </div>
    </div>
  );
};

export default StockDetailPage;
