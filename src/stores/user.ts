import { defineStore } from "pinia";
import {
  settingsTable,
  SETTING_PRIMARY_LIST_ID,
  SETTING_USERNAME,
  SETTING_AUTO_HANDLE_INVITATIONS,
  getAPIOrLocalData,
  userInfoConfig,
  settingsConfig,
} from "@/rethinkid";

export const useUserStore = defineStore("user", {
  state: () => ({
    loggedIn: false,
    userId: "",
    username: "",
    primaryListId: "",
    autoHandleInvitations: true,
  }),
  actions: {
    setLoggedIn(status: boolean): void {
      this.loggedIn = status;
    },
    async fetchUserInfo(): Promise<void> {
      const userInfo = await getAPIOrLocalData(userInfoConfig);
      this.userId = userInfo.id;
    },
    async fetchSettings(): Promise<void> {
      const settings = (await getAPIOrLocalData(settingsConfig)) as any[];
      // const settings = (await settingsTable.read()) as any[];
      const username = settings.find((setting) => setting.id === SETTING_USERNAME);
      this.username = username.value;

      const primaryListId = settings.find((setting) => setting.id === SETTING_PRIMARY_LIST_ID);
      this.primaryListId = primaryListId.value;

      const autoHandleInvitations = settings.find((setting) => setting.id === SETTING_AUTO_HANDLE_INVITATIONS);
      this.autoHandleInvitations = autoHandleInvitations.value;
    },
    async updateUsername(username: string): Promise<void> {
      this.username = username;
      await settingsTable.update({ id: SETTING_USERNAME, value: username });
    },
    async updatePrimaryListId(id: string): Promise<void> {
      this.primaryListId = id;
      await settingsTable.update({ id: SETTING_PRIMARY_LIST_ID, value: id });
    },
    async updateAutoHandleInvitation(value: boolean): Promise<void> {
      this.autoHandleInvitations = value;
      await settingsTable.update({ id: SETTING_AUTO_HANDLE_INVITATIONS, value });
    },
  },
});
