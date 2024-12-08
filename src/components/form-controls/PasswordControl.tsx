import {
  FunctionComponent,
  ReactElement,
  useState,
  KeyboardEvent,
  useEffect,
} from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface Props<T extends Record<string, unknown>> {
  control: Control<T>;
  name: keyof T;
  isRequired?: boolean;
  label?: string;
}

export default function PasswordControl<T extends Record<string, unknown>>({
  control,
  name,
  isRequired,
  label = 'Password',
}: Readonly<Props<T>>): ReactElement {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setIsVisible(false);
  }, []);

  return (
    <Controller
      name={name as unknown as Path<T>}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <div>
          <Input
            labelPlacement='inside'
            variant='bordered'
            maxLength={16}
            label={label}
            size='lg'
            isRequired={!!isRequired}
            color={!!fieldState.error ? 'danger' : undefined}
            isInvalid={!!fieldState.error}
            errorMessage={
              fieldState?.error?.message
                ? fieldState?.error?.message
                : undefined
            }
            placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
            onBlur={onBlur}
            onChange={onChange}
            value={value as string}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
              if (event.code === 'Space') event.preventDefault();
            }}
            endContent={
              <ToggleButton
                isVisible={isVisible}
                toggleVisibility={toggleVisibility}
              />
            }
            type={isVisible ? 'text' : 'password'}
          />
        </div>
      )}
    />
  );
}

const ToggleButton: FunctionComponent<{
  isVisible: boolean;
  toggleVisibility: () => void;
}> = ({ isVisible, toggleVisibility }): ReactElement => {
  return (
    <Button
      className='focus:outline-none'
      type='button'
      onPress={toggleVisibility}
      isIconOnly
      variant='light'
      aria-label='toggle password visibility'
    >
      {isVisible ? <EyeIcon /> : <EyeOffIcon />}
    </Button>
  );
};
