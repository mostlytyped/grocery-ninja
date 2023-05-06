import { defineStore } from "pinia";
import { rid, settingsTable, SETTING_PRIMARY_LIST_ID, SETTING_USERNAME } from "@/rethinkid";

export const useUserStore = defineStore("user", {
  state: () => ({
    loggedIn: false,
    userId: "",
    username: "",
    primaryListId: "",
  }),
  actions: {
    setLoggedIn(status: boolean): void {
      this.loggedIn = status;
    },
    async setUserId(): Promise<void> {
      rid.users.getInfo().then((response) => {
        this.userId = response.id;
      });
    },
    async fetchSettings(): Promise<void> {
      const settings = (await settingsTable.read()) as any[];
      const username = settings.find((setting) => setting.id === SETTING_USERNAME);
      this.username = username.value;

      const primaryListId = settings.find((setting) => setting.id === SETTING_PRIMARY_LIST_ID);
      this.primaryListId = primaryListId.value;
    },
    async updateUsername(username: string): Promise<void> {
      this.username = username;
      await settingsTable.update({ id: SETTING_USERNAME, value: username });
    },
    async updatePrimaryListId(id: string): Promise<void> {
      this.primaryListId = id;
      await settingsTable.update({ id: SETTING_PRIMARY_LIST_ID, value: id });
    },
  },
});
