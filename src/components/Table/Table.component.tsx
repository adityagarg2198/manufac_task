import { Table as MantineTable } from '@mantine/core';
import { FC } from 'react';
import { TableProps } from './Table.types';

const Table: FC<TableProps> = ({ tableData }) => {
  return (
    <MantineTable
      withTableBorder
      borderColor='black'
      withColumnBorders
      data={tableData}
      captionSide='top'
    />
  );
};

export default Table;
