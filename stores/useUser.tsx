import axios from "axios";
import create from "zustand";
import { combine } from "zustand/middleware";
import { User } from "../types";
import { AUTH_URI, isServer } from "../constants";

export const useUser = create(
  combine<
    { token?: string; user?: User; loading: boolean },
    {
      updateToken: (token: string) => void;
      fetchUser: () => Promise<User | undefined>;
      removeToken: () => void;
      updateUser: (data: Partial<User>) => void;
    }
  >(
    {
      token: !isServer && localStorage.getItem("token"),
      user: null,
      loading: false,
    },
    (set, get) => ({
      removeToken: () => {
        set({ token: null, user: null, loading: false });
      },
      updateToken: (token: string) => {
        set({ token });
      },
      updateUser: (data: Partial<User>) => {
        set({ user: { ...get().user, ...data } });
      },
      fetchUser: () => {
        const token = get().token;
        set({ loading: true });
        return axios
          .get<User>(AUTH_URI + "/v1/users/@me", {
            headers: { Authorization: token },
          })
          .then((res) => {
            set({ user: res.data });
            return res.data;
          })
          .catch(() => undefined)
          .then((res) => {
            set({ loading: false });
            return res;
          });
      },
    })
  )
);
