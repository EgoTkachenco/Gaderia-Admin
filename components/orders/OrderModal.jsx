import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { STATUSES } from '../../constants';

const OrderModal = ({ order, onClose, onSubmit }) => {
  const isOpen = !!order;
  const form = useForm({
    initialValues: { status: '' },

    validate: {
      status: (value) => (value ? null : "Поле обов'язкове"),
    },
  });

  const onFormSubmit = () => {
    form.validate();
    if (form.isValid()) {
      onSubmit(form.values)
        .then(() => {
          onClose();
        })
        .catch((err) => {
          form.setErrors(err.response?.data?.error);
        });
    }
  };

  useEffect(() => {
    if (isOpen) form.setValues({ status: order.status, ttn: order.ttn || '' });
    return () => {
      form.reset();
    };
  }, [isOpen]);

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Редагування замовлення
        </ModalHeader>
        <ModalBody>
          <form
            id="product-form"
            className="flex gap-4"
            onSubmit={onFormSubmit}
          >
            <div className="flex flex-col gap-4 w-2/4">
              <CInput form={form} id="ttn" name="ТТН" />
              <CSelect
                form={form}
                id="status"
                name="Статус"
                items={STATUSES}
                isHalfWidth={false}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Закрити
          </Button>
          <Button color="primary" onClick={onFormSubmit}>
            Зберегти
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;

export const CSelect = ({
  form,
  id,
  name,
  items = [],
  isHalfWidth = true,
  ...props
}) => (
  <Select
    isRequired
    items={items}
    {...getFieldProps(id, name, true, isHalfWidth)}
    selectedKeys={[form.getInputProps(id).value]}
    onChange={(e) => {
      form.getInputProps(id).onChange(e.target.value);
    }}
    // isInvalid={!!form.getInputProps(id).error}
    errorMessage={form.getInputProps(id).error}
    {...props}
  >
    {(item) => (
      <SelectItem key={item.value} value={item.value}>
        {item.label}
      </SelectItem>
    )}
  </Select>
);

const CInput = ({ form, id, name, isHalfWidth, ...props }) => {
  return (
    <Input
      {...getFieldProps(id, name, false, isHalfWidth)}
      value={form.getInputProps(id).value}
      onValueChange={(v) => form.getInputProps(id).onChange(v)}
      // isInvalid={!!form.getInputProps(id).error}
      errorMessage={form.getInputProps(id).error}
      {...props}
    />
  );
};

const getFieldProps = (id, name, isSelect = false, isHalfWidth = false) => ({
  id,
  name: id,
  className: isHalfWidth ? 'w-2/4' : '',
  label: name,
  placeholder: `${isSelect ? 'Select' : 'Enter'} ${name.toLowerCase()}`,
  labelPlacement: 'outside',
});
