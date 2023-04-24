import { RethinkID } from "@rethinkid/rethinkid-js-sdk";
import type { Options } from "@rethinkid/rethinkid-js-sdk";

console.log("app ID", import.meta.env.VITE_APP_ID);

const config: Options = {
  appId: import.meta.env.VITE_APP_ID,
  loginRedirectUri: import.meta.env.VITE_REDIRECT_URI,
  onApiConnectError: (rid, message) => {
    console.log("onApiConnectError callback fired! Message:", message);

    if (message.includes("invalid_token")) {
      rid.logOut();
    }
  },
};

if (import.meta.env.DEV) {
  config.oAuthUri = "http://localhost:3377";
  config.dataApiUri = "http://localhost:3377";
}

export const rid = new RethinkID(config);

export const LISTS_TABLE_NAME = "lists";
export const ORDER_TABLE_NAME = "order";

export const listsTable = rid.table(LISTS_TABLE_NAME);
export const orderTable = rid.table(ORDER_TABLE_NAME, {
  onCreate: async () => {
    console.log("insert after create order table");
    await rid.table(ORDER_TABLE_NAME).insert({ id: LISTS_TABLE_NAME, order: [] });
  },
});
