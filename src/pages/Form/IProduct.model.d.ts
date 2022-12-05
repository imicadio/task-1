export interface IProduct {
  text?: string | null | undefined;
  value?: string | null | boolean;
  error?: boolean;
  type?: string | null | undefined;
  inputType: string | null | undefined;
  validPattern?: string | null | undefined;
  helperText?: string | null | undefined;
  checked?: boolean;
}
