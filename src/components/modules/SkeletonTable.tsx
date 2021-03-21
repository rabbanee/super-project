import Table from '@elements/Table';
import Td from '@elements/Td';
import Th from '@elements/Th';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonTable = () => {
  return (
    <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
      <thead className="bg-primary">
        <tr>
          {
            Array.apply(1, Array(4)).map((value, i) => 
              <Th className="text-center" key={i}>
                <Skeleton count={1}/>
              </Th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          Array.apply(1, Array(5)).map((value, i) => 
            <tr key={i}>
              <Td className="text-center">
                <Skeleton count={1} />
              </Td>
              <Td className="text-center">
                <Skeleton count={1} />
              </Td>
              <Td className="text-center">
                <Skeleton count={1} />
              </Td>
              <Td className="text-center ">
                <Skeleton count={1} />
              </Td>
            </tr>  
          )
        }
      </tbody>
    </Table>
  );
};

export default SkeletonTable;