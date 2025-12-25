import { useAppStore } from "@/stores";
import { createFetch } from "@vueuse/core";
import { destr } from "destr";

const appStore = useAppStore();

function showLoader() {
  appStore.updateLoader(true);
}

function hideLoader() {
  appStore.updateLoader(false);
}

export const useApi = createFetch({
  baseUrl: import.meta.env.VITE_API_ADMIN_BASE_URL || "/",
  fetchOptions: {
    headers: {
      Accept: "application/json",
    },
  },
  options: {
    refetch: true,
    async beforeFetch({ options }) {
      showLoader();

      // Set default headers
      const headers = {
        Accept: "application/json",
      };

      // Only set Content-Type for non-FormData requests
      if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";

        // Stringify body if it's not FormData and not already a string
        if (options.body && typeof options.body !== "string") {
          options.body = JSON.stringify(options.body);
        }
      }

      const accessToken = useCookie("adminAccessToken").value;
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      options.headers = {
        ...options.headers,
        ...headers,
      };

      return { options };
    },
    afterFetch(ctx) {
      hideLoader();

      const { data, response } = ctx;

      // Parse data if it's JSON
      let parsedData = null;
      try {
        parsedData = destr(data);
      } catch (error) {
        // console.error('Parse error:', error)
      }

      return { data: parsedData, response };
    },
    onFetchError(ctx) {
      hideLoader();

      const { data, response } = ctx;

      // Parse error data if it's JSON
      let parsedError = null;
      try {
        parsedError = destr(data);
      } catch (error) {
        console.error("Parse error:", error);
      }

      if (response?.status === 401) {
        // Handle unauthorized - clear cookies and redirect to login
        useCookie("adminAccessToken").value = null;
        useCookie("adminData").value = null;
        useCookie("adminAbilityRules").value = null;

        // Redirect to login page
        window.location.href = "/admin/login";
      }

      // Return modified context with parsed error data
      return {
        ...ctx,
        data: parsedError,
        error: {
          ...ctx.error,
          response: {
            ...response,
            _data: parsedError,
          },
        },
      };
    },
  },
});
