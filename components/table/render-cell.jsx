import {
  Tooltip,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react';
import React, { useState, Fragment } from 'react';
import { DeleteIcon } from '../icons/table/delete-icon';
import { EditIcon } from '../icons/table/edit-icon';
import { productModel } from '../products/Products';
import { TableWrapper as Table } from './table';
import _ from 'lodash';

export const RenderCell = ({
  data,
  rowData,
  type,
  column,
  onUpdate,
  onDelete,
}) => {
  const getWidthStyles = () => ({
    maxWidth: column?.width || 'unset',
    minWidth: column?.width || 'unset',
  });
  switch (type) {
    case 'boolean':
      return data ? 'true' : 'false';
    case 'actions':
      return (
        <div className="flex items-center gap-4 ">
          {onUpdate && (
            <Tooltip content="Редагувати" color="secondary">
              <button onClick={() => onUpdate(rowData)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip content="Видалити" color="danger">
              <button onClick={() => onDelete(rowData.id)}>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          )}
        </div>
      );
    case 'price':
      return (
        <div style={getWidthStyles()}>
          {rowData.amount} {rowData.currency}
        </div>
      );
    case 'delivery':
      return (
        <div className="flex flex-col gap-2" style={getWidthStyles()}>
          <span>{rowData.type_delivery}</span>
          <span>
            {rowData.delivery_description
              ? rowData.delivery_description?.regionCity +
                ', ' +
                rowData.delivery_description?.description
              : '---'}
          </span>
        </div>
      );
    case 'list':
      return <DetailsModal data={rowData} rowStyle={getWidthStyles()} />;
    case 'company':
      return (
        <div className="flex flex-col gap-2" style={getWidthStyles()}>
          <span>{rowData.name_company}</span>
          <span>{rowData.code_company}</span>
        </div>
      );
    case 'bank':
      return (
        <div className="flex flex-col gap-2" style={getWidthStyles()}>
          <span>{rowData.name_bank}</span>
          <span>{rowData.number_bank}</span>
        </div>
      );
    case 'full_address':
      const f_address = [rowData.region, rowData.settlement, rowData.address]
        .filter((el) => !!el)
        .join(', ');
      return (
        <div
          title={f_address}
          className="line-clamp-3"
          style={getWidthStyles()}
        >
          {f_address}
        </div>
      );
    case 'user':
      return (
        <div className="flex flex-col gap-2">
          <span>{rowData.full_name}</span>
          <span>{rowData.email}</span>
          <span>{rowData.number}</span>
        </div>
      );
    case 'picture':
      return (
        <div style={getWidthStyles()}>
          <Image
            src={data}
            alt="picture"
            width={column.width || 150}
            height={column.width || 150}
            style={{ objectFit: 'contain ' }}
          />
        </div>
      );
    case 'long-text':
      return (
        <div title={data} className="line-clamp-3" style={getWidthStyles()}>
          {data}
        </div>
      );
    case 'custom':
      return column.render(rowData);
    case 'text':
    default:
      return (
        <div className="line-clamp-1" style={getWidthStyles()}>
          {data}
        </div>
      );
  }
};

const DetailsModal = ({ data, rowStyle }) => {
  const [open, setOpen] = useState(false);
  const table_data = data.catalog_list_id.map((item) => ({
    ...item.model_catalog,
    measurement:
      item.model_catalog.measurement +
      ' ' +
      item.model_catalog.type_measurement,
  }));
  const model = _.cloneDeep(productModel);
  model[1].width = 50;
  return (
    <>
      <span
        className="underline font-bold cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Список
      </span>
      <Modal size="5xl" isOpen={open} onClose={() => setOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Список товарів
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2" style={rowStyle}>
              <Table data={table_data} columns={model} />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
