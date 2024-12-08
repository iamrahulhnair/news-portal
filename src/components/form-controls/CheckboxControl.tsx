import { Control, Controller, Path } from 'react-hook-form';
import { ReactElement, ReactNode } from 'react';
import { Checkbox, CheckboxProps } from '@nextui-org/checkbox';

interface Props<T extends Record<string, unknown>> {
  control: Control<T>;
  name: keyof T;
  label: ReactNode;
  className?: string;
  radius?: CheckboxProps['radius'];
}

export default function CheckboxControl<T extends Record<string, unknown>>({
  control,
  name,
  label,
  className,
  radius,
}: Readonly<Props<T>>): ReactElement {
  return (
    <Controller
      control={control}
      name={name as unknown as Path<T>}
      render={({ field: { onChange, value } }) => (
        <div className={className ?? ''}>
          <Checkbox
            size='md'
            radius={radius}
            isSelected={value as undefined | boolean}
            onValueChange={onChange}
          >
            {label}
          </Checkbox>
        </div>
      )}
    />
  );
}
