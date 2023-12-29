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
import { useEffect } from 'react';

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

const PRODUCT_TYPES = [
  { label: 'Оберіть тип продукту', value: '' },
  { label: 'Juice', value: 'JUICE' },
  { label: 'Vinegar', value: 'VINEGAR' },
  { label: 'Apple', value: 'APPLE' },
];

const JUICE_TYPES = [
  { label: 'Оберіть тип соку', value: '' },
  { label: 'Apple', value: 'APPLE' },
  { label: 'Carrot & Apple', value: 'CARROTAPPLE' },
  { label: 'Strawberry & Apple', value: 'STRAWBERRYAPPLE' },
  { label: 'Pear & Apple', value: 'PEARAPPLE' },
];

const VINEGAR_TYPES = [
  { label: 'Оберіть тип оцту', value: '' },
  { label: 'Filtered', value: 'FILTERED' },
  { label: 'Unfiltered', value: 'UNFILTERED' },
];

const APPLE_TYPES = [
  { label: 'Оберіть тип яблука', value: '' },
  { label: 'Red Jonaprince', value: 'REDJONAPRINCE' },
  { label: 'Modi', value: 'MODI' },
  { label: 'Idared', value: 'IDARED' },
  { label: 'Florina', value: 'FLORINA' },
  { label: 'Fuji', value: 'FUJI' },
  { label: 'Gala', value: 'GALA' },
  { label: 'Golden Delicious', value: 'GOLDENDELICIOUS' },
  { label: 'Red Chief', value: 'REDCHIEF' },
  { label: 'Granny Smith', value: 'GRANNYSMITH' },
];

const PACKAGIN_TYPES = [
  { label: 'Оберіть тип пакування', value: '' },
  { label: 'Glass', value: 'GLASS' },
  { label: 'Bag in box', value: 'BAGINBOX' },
];

const MEASUREMENT_TYPES = [
  { label: 'Оберіть тип міри', value: '' },
  { label: 'Kg', value: 'KG' },
  { label: 'Liter', value: 'LITER' },
];

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
      // photo: (value) => (value ? null : 'Поле обов\'язкове'),
    },
  });

  const onFormSubmit = () => {
    form.validate();
    if (form.isValid()) {
      let formData;

      if (isNew) {
        formData = new FormData(document.getElementById('product-form'));
      } else {
        formData = new FormData(document.getElementById('product-form'));
        if (!form.values.photo) formData.delete('photo');
        // formData = new FormData();
        // formData.append('description', form.values.description);
        // formData.append('price', form.values.price);
      }

      onSubmit(formData)
        .then(() => {
          onClose();
        })
        .catch((err) => {
          form.setErrors(err.response?.data?.error);
        });
    }
  };

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
              <Input
                type="file"
                {...getFieldProps('photo', 'Photo')}
                onChange={() =>
                  form.setFieldValue(
                    'photo',
                    document.getElementById('photo').files[0]
                  )
                }
                // isInvalid={!!form.getInputProps('photo').error}
                errorMessage={form.getInputProps('photo').error}
              />
              <div>
                {form.value?.photo ? (
                  <Image
                    src={URL.createObjectURL(form.value?.photo)}
                    alt="Picture"
                    width={200}
                    height={200}
                    style={{ objectFit: 'contain' }}
                  />
                ) : product?.picture ? (
                  <Image
                    src={product.picture}
                    alt="Picture"
                    width={200}
                    height={200}
                    style={{ objectFit: 'contain' }}
                  />
                ) : null}
              </div>
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
  placeholder: `${isSelect ? 'Select' : 'Enter'} ${name.toLowerCase()}`,
  labelPlacement: 'outside',
});

const formatProduct = (data) =>
  Object.keys(data || {}).reduce(
    (acc, key) => ({ ...acc, [key]: data[key] || '' }),
    {}
  );
