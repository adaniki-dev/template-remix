import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  useActionData,
  Form as RemixForm,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import type { FormProps as RemixFormProps } from "@remix-run/react";

/**
 * Representa o estado de um campo de formulário
 */
type FieldState = {
  value: any;
  touched: boolean;
  error?: string;
};

/**
 * Estado completo do formulário, mapeando nomes de campos para seus estados
 */
type FormState = {
  [fieldName: string]: FieldState;
};

/**
 * Estrutura de erros de validação, mapeando nomes de campos para mensagens de erro
 */
type ValidationErrors = {
  [fieldName: string]: string;
};

/**
 * Função de validação que recebe os valores do formulário e retorna erros de validação
 */
type Validator = (values: Record<string, any>) => ValidationErrors;

/**
 * Interface do contexto do formulário que fornece acesso ao estado e métodos
 */
interface FormContextType {
  values: Record<string, any>;
  errors: ValidationErrors;
  touched: Record<string, boolean>;
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, isTouched: boolean) => void;
  setFieldError: (name: string, error?: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

// Contexto do formulário
const FormContext = createContext<FormContextType | null>(null);

/**
 * Props para o FormProvider
 */
interface FormProviderProps {
  initialValues: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void;
  validate?: Validator;
  children: React.ReactNode;
}

/**
 * Provider principal para o formulário. Gerencia o estado do formulário e fornece
 * acesso aos valores, erros e métodos através do contexto.
 *
 * @example
 * ```tsx
 * <FormProvider
 *   initialValues={{ name: '', email: '' }}
 *   validate={(values) => {
 *     const errors = {};
 *     if (!values.name) errors.name = 'Nome é obrigatório';
 *     return errors;
 *   }}
 * >
 *   {children}
 * </FormProvider>
 * ```
 */
export const FormProvider: React.FC<FormProviderProps> = ({
  initialValues,
  onSubmit,
  validate,
  children,
}) => {
  const [formState, setFormState] = useState<FormState>(() => {
    const initialState: FormState = {};

    Object.keys(initialValues).forEach((key) => {
      initialState[key] = {
        value: initialValues[key],
        touched: false,
      };
    });

    return initialState;
  });

  const actionData = useActionData<ValidationErrors>();
  const navigation = useNavigation();
  const submit = useSubmit();

  // Sincroniza erros de servidor do Remix com o estado local
  useEffect(() => {
    if (actionData && navigation.state === "idle") {
      const newFormState = { ...formState };

      Object.keys(actionData).forEach((fieldName) => {
        if (newFormState[fieldName]) {
          newFormState[fieldName] = {
            ...newFormState[fieldName],
            error: actionData[fieldName],
          };
        }
      });

      setFormState(newFormState);
    }
  }, [actionData, navigation.state]);

  // Extrai valores, erros e estado de touched para fácil acesso
  const values = Object.keys(formState).reduce(
    (acc, key) => {
      acc[key] = formState[key].value;
      return acc;
    },
    {} as Record<string, any>,
  );

  const errors = Object.keys(formState).reduce((acc, key) => {
    if (formState[key].error) {
      acc[key] = formState[key].error!;
    }
    return acc;
  }, {} as ValidationErrors);

  const touched = Object.keys(formState).reduce(
    (acc, key) => {
      acc[key] = formState[key].touched;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  /**
   * Define o valor de um campo específico
   * @param {string} name - Nome do campo
   * @param {any} value - Novo valor para o campo
   */
  const setFieldValue = useCallback((name: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
      },
    }));
  }, []);

  /**
   * Define o estado 'touched' de um campo específico
   * @param {string} name - Nome do campo
   * @param {boolean} isTouched - Novo estado 'touched'
   */
  const setFieldTouched = useCallback((name: string, isTouched: boolean) => {
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: isTouched,
      },
    }));
  }, []);

  /**
   * Define um erro para um campo específico
   * @param {string} name - Nome do campo
   * @param {string} [error] - Mensagem de erro (undefined para limpar o erro)
   */
  const setFieldError = useCallback((name: string, error?: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        error,
      },
    }));
  }, []);

  /**
   * Lida com o envio do formulário, realizando validação e processamento adequado
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envio do formulário
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Marca todos os campos como tocados
      const newFormState = { ...formState };
      Object.keys(newFormState).forEach((key) => {
        newFormState[key].touched = true;
      });
      setFormState(newFormState);

      // Validação do lado do cliente
      let clientErrors: ValidationErrors = {};
      if (validate) {
        clientErrors = validate(values);

        // Atualiza erros no estado
        Object.keys(clientErrors).forEach((key) => {
          setFieldError(key, clientErrors[key]);
        });

        if (Object.keys(clientErrors).length > 0) {
          return;
        }
      }

      // Função de callback personalizada ou envio para o Remix
      if (onSubmit) {
        onSubmit(values);
      } else {
        const formData = new FormData(e.currentTarget);
        submit(formData, {
          method: "post",
          action: (e.currentTarget as HTMLFormElement).action,
        });
      }
    },
    [formState, validate, values, onSubmit, submit],
  );

  const contextValue: FormContextType = {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    handleSubmit,
    isSubmitting: navigation.state === "submitting",
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

/**
 * Hook para acessar o contexto do formulário
 *
 * @returns O contexto do formulário com valores, erros e métodos
 * @throws Error Se usado fora de um FormProvider
 *
 * @example
 * ```tsx
 * const { values, errors, setFieldValue } = useForm();
 * // Agora você pode acessar valores, erros e métodos
 * ```
 */
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm deve ser usado dentro de um FormProvider");
  }
  return context;
};

/**
 * Propriedades do campo retornadas pelo hook useField
 */
type FieldProps = {
  name: string;
  value: any;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onBlur: () => void;
};

/**
 * Metadados do campo retornados pelo hook useField
 */
type FieldMeta = {
  value: any;
  error?: string;
  touched: boolean;
};

/**
 * Hook equivalente ao useField do Formik, fornecendo acesso e controle
 * a um campo específico do formulário
 *
 * @param name - Nome do campo a ser acessado
 * @returns Um array contendo as props do campo e seus metadados
 *
 * @example
 * ```tsx
 * const [field, meta] = useField('nome');
 * // field contém: { name, value, onChange, onBlur }
 * // meta contém: { value, error, touched }
 * return (
 *   <div>
 *     <input {...field} />
 *     {meta.touched && meta.error && <div>{meta.error}</div>}
 *   </div>
 * );
 * ```
 */
export const useField = (name: string) => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = useForm();

  const value = values[name];
  const error = errors[name];
  const isTouched = touched[name];

  /**
   * Manipula mudanças no valor do campo
   * @param {React.ChangeEvent} e - Evento de mudança
   */
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { value } = e.target;
      setFieldValue(name, value);
    },
    [name, setFieldValue],
  );

  /**
   * Manipula o evento de blur do campo
   */
  const handleBlur = useCallback(() => {
    setFieldTouched(name, true);
  }, [name, setFieldTouched]);

  // Simula a API do useField do Formik
  const field = {
    name,
    value,
    onChange: handleChange,
    onBlur: handleBlur,
  };

  const meta = {
    value,
    error,
    touched: isTouched,
  };

  return [field, meta] as const;
};

/**
 * Props para o componente SmartForm
 */
interface SmartFormProps extends Omit<RemixFormProps, "onSubmit"> {
  initialValues: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void;
  validate?: Validator;
  children: React.ReactNode;
}

/**
 * Componente Form inteligente que encapsula o FormProvider e o Form do Remix
 *
 * @example
 * ```tsx
 * <SmartForm
 *   method="post"
 *   initialValues={{ name: '', email: '' }}
 *   validate={(values) => {
 *     const errors = {};
 *     if (!values.name) errors.name = 'Nome é obrigatório';
 *     return errors;
 *   }}
 * >
 *   <InputField name="name" label="Nome" />
 *   <InputField name="email" label="Email" />
 *   <button type="submit">Enviar</button>
 * </SmartForm>
 * ```
 */
export const SmartForm: React.FC<SmartFormProps> = ({
  initialValues,
  onSubmit,
  validate,
  children,
  ...formProps
}) => {
  return (
    <FormProvider
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      <InnerForm {...formProps}>{children}</InnerForm>
    </FormProvider>
  );
};

/**
 * Componente interno que acessa o contexto e renderiza o Form do Remix
 */
const InnerForm: React.FC<Omit<RemixFormProps, "onSubmit">> = ({
  children,
  ...formProps
}) => {
  const { handleSubmit } = useForm();

  return (
    <RemixForm {...formProps} onSubmit={handleSubmit}>
      {children}
    </RemixForm>
  );
};

// Exporta como Form para facilitar o uso
export const Form = SmartForm;
