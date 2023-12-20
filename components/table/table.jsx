import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React from 'react';
import { RenderCell } from './render-cell';

export const TableWrapper = ({ columns = [], data = [], actions }) => {
  if (!data) return;
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === 'actions'}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        {data && (
          <TableBody items={data}>
            {(item, i) => (
              <TableRow key={i}>
                {(key) => {
                  const column = columns.find((c) => c.uid === key);
                  return (
                    <TableCell>
                      {RenderCell({
                        data: item[key],
                        columnData: item,
                        column,
                        type: column?.type,
                      })}
                    </TableCell>
                  );
                }}
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
};
