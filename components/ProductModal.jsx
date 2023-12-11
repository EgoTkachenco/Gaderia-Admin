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
import { useCallback } from 'react';

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
  { label: 'Select product type', value: '' },
  { label: 'Juice', value: 'JUICE' },
  { label: 'Vinegar', value: 'VINEGAR' },
  { label: 'Apple', value: 'APPLE' },
];

const JUICE_TYPES = [
  { label: 'Select juice type', value: '' },
  { label: 'Apple', value: 'APPLE' },
  { label: 'Carrot & Apple', value: 'CARROTAPPLE' },
  { label: 'Strawberry & Apple', value: 'STRAWBERRYAPPLE' },
  { label: 'Pear & Apple', value: 'PEARAPPLE' },
];

const VINEGAR_TYPES = [
  { label: 'Select vinegar type', value: '' },
  { label: 'Filtered', value: 'FILTERED' },
  { label: 'Unfiltered', value: 'UNFILTERED' },
];

const APPLE_TYPES = [
  { label: 'Select apple type', value: '' },
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
  { label: 'Select package type', value: '' },
  { label: 'Glass', value: 'GLASS' },
  { label: 'Bag in box', value: 'BAGINBOX' },
];

const MEASUREMENT_TYPES = [
  { label: 'Select measure type', value: '' },
  { label: 'Kg', value: 'KG' },
  { label: 'Liter', value: 'LITER' },
];

const ProductModal = ({ isOpen, onClose, onSubmit }) => {
  const form = useForm({
    initialValues: new_product,

    validate: {
      header: (value) => (value ? null : 'Field Required'),
      description: (value) => (value ? null : 'Field Required'),
      price: (value) => (value ? null : 'Field Required'),
      type_measurement: (value) => (value ? null : 'Field Required'),
      type_product: (value) => (value ? null : 'Field Required'),
      measurement: (value) => (value ? null : 'Field Required'),
      type_juice: (value) =>
        !form.values.type_product !== 'JUICE'
          ? null
          : value
          ? null
          : 'Field Required',
      type_apple: (value) =>
        !form.values.type_product !== 'APPLE'
          ? null
          : value
          ? null
          : 'Field Required',

      type_vinegar: (value) =>
        form.values.type_product !== 'VINEGAR'
          ? null
          : value
          ? null
          : 'Field Required',
      type_packaging: (value) => (value ? null : 'Field Required'),
      photo: (value) => (value ? null : 'Field Required'),
    },
  });

  const onFormSubmit = () => {
    form.validate();
    if (form.isValid()) {
      const formData = new FormData(document.getElementById('product-form'));
      onSubmit(formData)
        .then(() => {
          onClose();
        })
        .catch((err) => {
          form.setErrors(err.response.data.error);
        });
    }
  };

  useEffect(() => {
    form.reset();
  }, [isOpen]);

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">New Product</ModalHeader>
        <ModalBody>
          <form
            id="product-form"
            className="flex gap-4"
            onSubmit={onFormSubmit}
          >
            <div className="flex flex-col gap-4 w-2/4">
              <CInput form={form} id="header" name="Header" isRequired />
              <CInput
                form={form}
                id="description"
                name="Description"
                isRequired
              />

              <Row>
                <CInput
                  form={form}
                  isRequired
                  type="number"
                  id="measurement"
                  name="Measurement"
                  isHalfWidth={true}
                  min={0}
                />

                <CSelect
                  form={form}
                  id="type_measurement"
                  name="Measure Type"
                  items={MEASUREMENT_TYPES}
                />
              </Row>

              <Row>
                <CSelect
                  form={form}
                  id="type_product"
                  name="Product type"
                  items={PRODUCT_TYPES}
                />

                {form.values.type_product === 'JUICE' && (
                  <CSelect
                    form={form}
                    id="type_juice"
                    name="Juice type"
                    items={JUICE_TYPES}
                  />
                )}
                {form.values.type_product === 'VINEGAR' && (
                  <CSelect
                    form={form}
                    id="type_vinegar"
                    name="Vinegar type"
                    items={VINEGAR_TYPES}
                  />
                )}
                {form.values.type_product === 'APPLE' && (
                  <CSelect
                    form={form}
                    id="type_apple"
                    name="Apple type"
                    items={APPLE_TYPES}
                  />
                )}
              </Row>
            </div>
            <div className="flex flex-col gap-4 w-2/4">
              <CSelect
                form={form}
                id="type_packaging"
                name="Packaging type"
                items={PACKAGIN_TYPES}
                isHalfWidth={false}
              />
              <Row>
                <CInput
                  isRequired
                  form={form}
                  type="number"
                  id="price"
                  name="Price"
                  endContent={<div className="text-xs">uah</div>}
                  className="w-2/3"
                  min={0}
                />
                <div className="flex items-center gap-2 w-1/3">
                  <Checkbox
                    className="mt-4"
                    name="is_discount"
                    {...form.getInputProps('is_discount')}
                  />
                  <CInput
                    form={form}
                    type="number"
                    id="price_discount"
                    name="Discount"
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
                isInvalid={!!form.getInputProps('photo').error}
              />
              <div>
                {form.getInputProps('photo')?.value && (
                  <Image
                    src={URL.createObjectURL(form.getInputProps('photo').value)}
                    alt="Picture"
                    width={200}
                    height={200}
                    style={{ objectFit: 'contain' }}
                  />
                )}
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={onFormSubmit}>
            Create
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
    isInvalid={!!form.getInputProps(id).error}
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
      isInvalid={!!form.getInputProps(id).error}
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
