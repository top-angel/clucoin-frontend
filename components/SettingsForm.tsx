import React from "react";
import { FormikProps } from "formik";
import Checkbox from "./Checkbox";
import Input from "./Input";

type Props<T = any> = FormikProps<T> & {
  resetForm: () => void;
};

const SettingsForm = ({
  errors,
  handleChange,
  handleSubmit,
  setFieldValue,
  values: { username, email, allow_emails, allow_public_badges },
}: Props) => {
  return (
    <form className="profile-settings" onSubmit={handleSubmit}>
      <h5 className="title">Profile</h5>
      <label>Username</label>
      <Input
        name="username"
        value={username}
        onChange={handleChange}
        error={errors?.username as string | undefined}
      />
      <label>Email</label>
      <Input
        name="email"
        value={email}
        onChange={handleChange}
        error={errors?.email as string | undefined}
      />
      <div className="newsletter-check">
        Receive Newsletter?
        <Checkbox
          title="Receive newsletter"
          value={allow_emails}
          onChange={(v: boolean) => {
            setFieldValue("allow_emails", v);
          }}
        />
      </div>
      <div className="newsletter-check">
        Public Badges
        <Checkbox
          title="Receive newsletter"
          value={allow_public_badges}
          onChange={(v: boolean) => {
            setFieldValue("allow_public_badges", v);
          }}
        />
      </div>
    </form>
  );
};

export default SettingsForm;
