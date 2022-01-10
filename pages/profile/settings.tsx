import React, { useMemo, useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import * as yup from "yup";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import ChangesModal from "../../components/ChangesModal";
import Connection from "../../components/Connection";
import SettingsForm from "../../components/SettingsForm";
import { WithAuth } from "../../components/withAuth";
import { AUTH_URI } from "../../constants";
import FormController from "../../controllers/FormController";
import Discord from "../../icons/Discord";
import Twitch from "../../icons/Twitch";
import { useDialog } from "../../stores/useDialog";
import { useUser } from "../../stores/useUser";
import { DiscordIntegration } from "../../types";
import VerifyEmail from "../../components/VerifyEmail";
import Checkbox from "../../components/Checkbox";

const Settings = () => {
  const router = useRouter();
  const [cookies] = useCookies();
  const { setDialog } = useDialog();
  const user = useUser((s) => s.user);
  const [loading, setLoading] = useState(false);
  const updateUser = useUser((s) => s.updateUser);

  const userAvatar = useMemo(
    () =>
      user?.avatar_hash
        ? `https://avatars.clucoin.com/${user?.avatar_hash}`
        : undefined,
    [user]
  );

  const showDialog = useCallback(
    ({ restoreForm, handleSubmit }) => {
      setDialog(
        <ChangesModal
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() => {
            restoreForm();
            setDialog(null);
          }}
        />
      );
    },
    [setDialog, loading]
  );

  const hideDialog = useCallback(() => setDialog(null), [setDialog]);

  return (
    <WithAuth>
      <Head>
        <title>Profile Settings</title>
      </Head>
      {!user?.email_verified && user?.email && <VerifyEmail />}
      <div className="Container">
        <div className="settings">
          <div className="info">
            <div className="avatar">
              <Image width={100} height={100} src={userAvatar} alt="avatar" />
            </div>
            {user?.username}
          </div>
          <div className="settings-grid">
            <FormController<{
              email: string;
              username: string;
              allow_emails: boolean;
              allow_public_badges: boolean;
              allow_public_twitch: boolean;
              allow_public_discord: boolean;
            }>
              initialValues={{
                username: user?.username,
                email: user?.email,
                allow_emails: user?.allow_emails,
                allow_public_badges: user?.allow_public_badges,
                allow_public_twitch: user?.integrations.twitch?.is_public,
                allow_public_discord: user?.integrations.discord?.is_public,
              }}
              validationSchema={() =>
                yup.object({
                  username: yup
                    .string()
                    .min(3, "Username should be at least 3 chars long")
                    .required("Username is required"),
                  email: user.email
                    ? yup
                        .string()
                        .email("Invalid Email")
                        .required("Email is required")
                    : yup.string().email("Invalid Email"),
                  allow_emails: yup.boolean(),
                })
              }
              onSubmit={(values) => {
                setLoading(true);
                return toast
                  .promise(
                    axios
                      .patch(AUTH_URI + "/v1/users/@me", values, {
                        headers: {
                          Authorization: cookies.token,
                        },
                      })
                      .then(() => updateUser(values)),
                    {
                      loading: "Updating user data",
                      error: "Failed to update user data",
                      success: "User updated successfully",
                    }
                  )
                  .then(() => {
                    setLoading(false);
                  });
              }}
              onChange={showDialog}
              onClear={hideDialog}
            >
              {(props) => (
                <>
                  <SettingsForm {...props} />
                  <div className="connections-settings">
                    <h5 className="title">Connected Accounts</h5>
                    <Connection
                      title="Discord"
                      icon={<Discord />}
                      connected={!!user?.integrations?.discord}
                      username={user?.integrations?.discord?.username}
                      onClick={() => {
                        router.push(
                          AUTH_URI +
                            `/v1/integrations/discord/redirect?callback=${encodeURIComponent(
                              origin + "/auth/discord/callback"
                            )}`
                        );
                      }}
                      onReloadClick={() => {
                        toast.promise(
                          axios
                            .get<DiscordIntegration>(
                              AUTH_URI + "/v1/integrations/discord/refresh",
                              {
                                headers: { Authorization: cookies.token },
                              }
                            )
                            .then((res) =>
                              updateUser({
                                ...user,
                                integrations: {
                                  ...user.integrations,
                                  discord: res.data,
                                },
                              })
                            ),
                          {
                            success: "Discord data updated",
                            loading: "Updating discord data",
                            error: "Failed to update discord data",
                          }
                        );
                      }}
                      onRemoveClick={() => {
                        toast.promise(
                          axios
                            .delete(AUTH_URI + "/v1/integrations/discord/", {
                              headers: { Authorization: cookies.token },
                            })
                            .then(() =>
                              updateUser({
                                integrations: {
                                  ...user.integrations,
                                  discord: null,
                                },
                              })
                            ),
                          {
                            loading: "Unlinking discord",
                            success: "Unlinked discord Successfully",
                            error: "Couldn't unlink discord",
                          }
                        );
                      }}
                    />
                    <Connection
                      title="Twitch"
                      icon={<Twitch />}
                      connected={!!user?.integrations?.twitch}
                      username={user?.integrations.twitch?.username}
                      onClick={() => {
                        router.push(
                          AUTH_URI +
                            `/v1/integrations/twitch/redirect?callback=${encodeURIComponent(
                              origin + "/auth/twitch/callback"
                            )}`
                        );
                      }}
                      onReloadClick={() => {
                        toast.promise(
                          axios
                            .get<DiscordIntegration>(
                              AUTH_URI + "/v1/integrations/twitch/refresh",
                              {
                                headers: { Authorization: cookies.token },
                              }
                            )
                            .then((res) =>
                              updateUser({
                                ...user,
                                integrations: {
                                  ...user.integrations,
                                  twitch: res.data,
                                },
                              })
                            ),
                          {
                            success: "Twitch data updated",
                            loading: "Updating twitch data",
                            error: "Failed to update twitch data",
                          }
                        );
                      }}
                      onRemoveClick={() => {
                        toast.promise(
                          axios
                            .delete(AUTH_URI + "/v1/integrations/twitch/", {
                              headers: { Authorization: cookies.token },
                            })
                            .then(() =>
                              updateUser({
                                integrations: {
                                  ...user.integrations,
                                  twitch: null,
                                },
                              })
                            ),
                          {
                            loading: "Unlinking twitch",
                            success: "Unlinked Twitch Successfully",
                            error: "Couldn't unlink twitch",
                          }
                        );
                      }}
                    />
                    {user?.integrations?.discord && (
                      <div className="newsletter-check">
                        Public Discord
                        <Checkbox
                          title="Receive newsletter"
                          value={props.values.allow_public_discord}
                          onChange={(v: boolean) => {
                            props.setFieldValue("allow_public_discord", v);
                          }}
                        />
                      </div>
                    )}
                    {user?.integrations?.twitch && (
                      <div className="newsletter-check">
                        Public Twitch
                        <Checkbox
                          title="Receive newsletter"
                          value={props.values.allow_public_twitch}
                          onChange={(v: boolean) => {
                            props.setFieldValue("allow_public_twitch", v);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </FormController>
          </div>
        </div>
      </div>
    </WithAuth>
  );
};

export default Settings;
