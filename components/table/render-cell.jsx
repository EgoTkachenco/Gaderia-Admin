import { User, Tooltip, Chip, Image } from '@nextui-org/react';
import React, { Fragment } from 'react';
import { DeleteIcon } from '../icons/table/delete-icon';
import { EditIcon } from '../icons/table/edit-icon';

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
            <Tooltip content="Update" color="secondary">
              <button onClick={() => onUpdate(rowData)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip content="Delete" color="danger">
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
          <span>{rowData.delivery_description || '---'}</span>
        </div>
      );
    case 'list':
      return (
        <div className="flex flex-col gap-2" style={getWidthStyles()}>
          {rowData.catalog_list_id.map((item) => (
            <Fragment key={item.id}>
              <span>{item.model_catalog.header}</span>
              <span>{item.model_catalog.price}</span>
              <span>
                {item.model_catalog.measurement}{' '}
                {item.model_catalog.type_measurement}
              </span>
              ------
            </Fragment>
          ))}
        </div>
      );
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
            width={150}
            height={150}
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
