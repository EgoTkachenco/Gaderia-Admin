import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
  Image,
} from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';

import {
  PRODUCT_TYPES,
  JUICE_TYPES,
  VINEGAR_TYPES,
  APPLE_TYPES,
  PACKAGIN_TYPES,
  MEASUREMENT_TYPES,
} from '/constants';

const new_product = {
  header: '',
  description: '',
  price: 0,
  type_measurement: '',
  type_product: '',
  measurement: '',
  is_discount: false,
  price_discount: 0,
  photo: null,
};

const ProductModal = ({ product, onClose, onSubmit }) => {
  const isOpen = !!product;
  const isNew = !product?.id;
  const form = useForm({
    initialValues: new_product,

    validate: {
      header: (value) => {
        if (!value) return "Поле обов'язкове";
        if (value.length > 50) return 'Поле задовге, максимальна довжина  50';
        return null;
      },
      description: (value) => (value ? null : "Поле обов'язкове"),
      price: (value) => (value ? null : "Поле обов'язкове"),
      type_measurement: (value) => (value ? null : "Поле обов'язкове"),
      type_product: (value) => (value ? null : "Поле обов'язкове"),
      measurement: (value) => (value ? null : "Поле обов'язкове"),
      type_juice: (value) =>
        !form.values.type_product !== 'JUICE'
          ? null
          : value
          ? null
          : "Поле обов'язкове",
      type_apple: (value) =>
        !form.values.type_product !== 'APPLE'
          ? null
          : value
          ? null
          : "Поле обов'язкове",

      type_vinegar: (value) =>
        form.values.type_product !== 'VINEGAR'
          ? null
          : value
          ? null
          : "Поле обов'язкове",
      type_packaging: (value) => (value ? null : "Поле обов'язкове"),
      photo: (value) => (value || !isNew ? null : "Поле обов'язкове"),
    },
  });

  const onFormSubmit = form.onSubmit((values) => {
    let formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key] !== '' && values[key] !== null)
        formData.append(key, values[key]);
    });

    onSubmit(formData)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        debugger;
        form.setErrors(
          err.response?.data?.error || { photo: err.response?.data?.data }
        );
      });
  });

  useEffect(() => {
    if (isOpen) {
      const f_p = Object.keys(product || {}).reduce(
        (acc, key) => ({
          ...acc,
          [key]: product[key] !== null ? product[key] : '',
        }),
        {}
      );
      form.setValues(f_p);
    }
    return () => {
      form.reset();
    };
  }, [isOpen]);

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {isNew ? 'Створення' : 'Редагування'} продукту
        </ModalHeader>
        <ModalBody>
          <form
            id="product-form"
            className="flex gap-4"
            onSubmit={onFormSubmit}
          >
            <div className="flex flex-col gap-4 w-2/4">
              <CInput form={form} id="header" name="Назва" isRequired />
              <CInput form={form} id="description" name="Опис" isRequired />

              <Row>
                <CInput
                  form={form}
                  isRequired
                  type="number"
                  step="0.1"
                  id="measurement"
                  name="Міра"
                  isHalfWidth={true}
                  min={0}
                />

                <CSelect
                  form={form}
                  id="type_measurement"
                  name="Тип міри"
                  items={MEASUREMENT_TYPES}
                />
              </Row>

              <Row>
                <CSelect
                  form={form}
                  id="type_product"
                  name="Тип продукту"
                  items={PRODUCT_TYPES}
                />

                {form.values?.type_product === 'JUICE' && (
                  <CSelect
                    form={form}
                    id="type_juice"
                    name="Тип соку"
                    items={JUICE_TYPES}
                  />
                )}
                {form.values?.type_product === 'VINEGAR' && (
                  <CSelect
                    form={form}
                    id="type_vinegar"
                    name="Тип оцту"
                    items={VINEGAR_TYPES}
                  />
                )}
                {form.values?.type_product === 'APPLE' && (
                  <CSelect
                    form={form}
                    id="type_apple"
                    name="Тип яблука"
                    items={APPLE_TYPES}
                  />
                )}
              </Row>
            </div>
            <div className="flex flex-col gap-4 w-2/4">
              <CSelect
                form={form}
                id="type_packaging"
                name="Тип пакування"
                items={PACKAGIN_TYPES}
                isHalfWidth={false}
              />
              <Row>
                <CInput
                  isRequired
                  form={form}
                  type="number"
                  id="price"
                  name="Ціна"
                  endContent={<div className="text-xs">uah</div>}
                  className="w-2/3"
                  min={0}
                />
                <div className="flex items-center gap-2 w-1/3">
                  <Checkbox
                    className="mt-4"
                    name="is_discount"
                    {...form.getInputProps('is_discount')}
                    isSelected={form.values.is_discount}
                  />
                  <CInput
                    form={form}
                    type="number"
                    id="price_discount"
                    name="Знижка"
                    endContent={<div className="text-xs">%</div>}
                    max={100}
                    min={0}
                  />
                </div>
              </Row>
              <FileInput
                name={'photo'}
                value={form.getInputProps('photo').value}
                onChange={form.getInputProps('photo').onChange}
                picture={product?.picture}
                errorMessage={form.getInputProps('photo').error}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Закрити
          </Button>
          <Button color="primary" onClick={onFormSubmit}>
            {isNew ? 'Додати' : 'Зберегти'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;

const Row = ({ children }) => (
  <div className="flex gap-4 items-start">{children}</div>
);

const CSelect = ({
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

      if (id == 'type_product')
        form.setValues({ type_juice: '', type_vinegar: '', type_apple: '' });
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
  placeholder: `${isSelect ? 'Оберіть' : 'Введіть'} ${name.toLowerCase()}`,
  labelPlacement: 'outside',
});

const formatProduct = (data) =>
  Object.keys(data || {}).reduce(
    (acc, key) => ({ ...acc, [key]: data[key] || '' }),
    {}
  );

const FileInput = ({ name, value, onChange, picture, errorMessage }) => {
  const [isEdit, setIsEdit] = useState(!picture);

  const render = () => {
    if (isEdit)
      return (
        <input
          id={name}
          name={name}
          type="file"
          onChange={(e) => {
            onChange(e.target.files[0]);
            setIsEdit(false);
          }}
        />
      );

    if (value)
      return (
        <Image
          src={URL.createObjectURL(value)}
          alt="Picture"
          width={200}
          height={200}
          style={{ objectFit: 'contain' }}
        />
      );

    if (picture)
      return (
        <Image
          src={picture}
          alt="Picture"
          width={200}
          height={200}
          style={{ objectFit: 'contain' }}
        />
      );

    return;
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="file">Картинка</label>
      <div className="flex gap-4">
        {render()}
        {!isEdit && (
          <Button
            className="w-32"
            onClick={() => {
              onChange(null);
              setIsEdit(true);
            }}
          >
            Змінити
          </Button>
        )}
      </div>
      {errorMessage ? (
        <div className="text-tiny text-danger">{errorMessage}</div>
      ) : null}
    </div>
  );
};
