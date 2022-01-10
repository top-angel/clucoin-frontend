import React, { useEffect, useRef, useState } from "react";
import { FormikProps, useFormik, FormikConfig } from "formik";
import _ from "lodash";

type Props<T = any> = FormikConfig<T> & {
  onClear?: () => void;
  children?: (props: FormikProps<T>) => React.ReactNode;
  onChange?: (props: FormikProps<T> & { restoreForm: () => void }) => void;
};

const FormController = <T extends unknown = any>({
  onClear,
  onChange,
  children,
  ...formikProps
}: Props<T>) => {
  const props = useFormik<T>({
    ...formikProps,
    onSubmit: (values, helpers) => {
      (formikProps.onSubmit(values, helpers) as Promise<any>).then(() => {
        setOldData(props.values);
      });
    },
  });

  const [oldData, setOldData] = useState(props.initialValues);

  useEffect(() => {
    if (!_.isEqual(props.values, oldData)) {
      onChange &&
        onChange({
          ...props,
          restoreForm: () => {
            props.setValues(oldData);
          },
        });
    } else {
      onClear && onClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.values, props.setValues, oldData, onChange, onClear]);

  return <>{children({ ...props })}</>;
};

export default FormController;
