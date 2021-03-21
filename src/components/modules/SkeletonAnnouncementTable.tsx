import Table from '@elements/Table';
import Td from '@elements/Td';
import Th from '@elements/Th';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonAnnouncementTable = () => {
  return (
    <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto mb-2">
      <div>
        <Skeleton count={3}/>
      </div>
      <hr className="mt-2 mb-2" /> 
      <Skeleton count={6} />
    </div>
  );
};

export default SkeletonAnnouncementTable;