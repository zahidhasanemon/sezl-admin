import { ofetch } from "ofetch";
import { ref } from "vue";

export function useApi() {
  const loading = ref(false);
  const error = ref(null);
  const success = ref(null);

  // Get CSRF token from meta tag
  const getCsrfToken = () => {
    const tokenEl = document.querySelector('meta[name="csrf-token"]');
    return tokenEl ? tokenEl.getAttribute("content") : "";
  };

  // Get auth token from cookie/localStorage
  const getAuthToken = () => {
    // example from cookie (implement getCookie yourself)
    return getCookie("auth_token") || "";
  };

  const request = async (url, options = {}) => {
    loading.value = true;
    error.value = null;
    success.value = null;

    const csrfToken = getCsrfToken();
    const authToken = getAuthToken();

    try {
      const headers = {
        "X-CSRF-TOKEN": csrfToken,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      };
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

      const response = await ofetch(url, {
        credentials: "include", // send cookies
        ...options,
        headers,
      });

      success.value = "Request successful.";
      return response;
    } catch (err) {
      error.value = err.message || "Request failed.";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    success,
    request,
  };
}

// Helper to get cookie by name
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return "";
}
