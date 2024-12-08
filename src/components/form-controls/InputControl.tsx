import { ReactElement, ReactNode } from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import { Input } from '@nextui-org/input';

type Props<T extends Record<string, unknown>> = {
  control: Control<T>;
  name: keyof T;
  label: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
  endContent?: ReactNode;
  isDisabled?: boolean;
};

export default function InputControl<T extends Record<string, unknown>>({
  control,
  name,
  label,
  isRequired = false,
  isDisabled = false,
  placeholder,
  isReadOnly = false,
  endContent,
}: Readonly<Props<T>>): ReactElement {
  return (
    <Controller
      control={control}
      name={name as unknown as Path<T>}
      render={({ field: { onBlur, onChange, value }, fieldState }) => (
        <Input
          id={name as unknown as Path<T>}
          onBlur={onBlur}
          labelPlacement='inside'
          placeholder={placeholder}
          onValueChange={onChange}
          type='text'
          label={label}
          size='lg'
          inputMode='text'
          value={value as string}
          variant='flat'
          isRequired={!!isRequired}
          color={!!fieldState.error ? 'danger' : undefined}
          isInvalid={!!fieldState.error}
          errorMessage={
            fieldState?.error?.message ? fieldState?.error?.message : undefined
          }
          isDisabled={!!isDisabled}
          isReadOnly={!!isReadOnly}
          endContent={endContent}
        />
      )}
    />
  );
}
