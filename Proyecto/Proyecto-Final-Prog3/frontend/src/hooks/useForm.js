import { useForm } from 'react-hook-form';

export default function useCustomForm(defaultValues = {}) {
  return useForm({ defaultValues, mode: 'onChange' });
}