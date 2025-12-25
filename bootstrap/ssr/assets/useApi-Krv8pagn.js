import { ofetch } from "ofetch";
import { ref } from "vue";
function useApi() {
  const loading = ref(false);
  const error = ref(null);
  const success = ref(null);
  const getCsrfToken = () => {
    const tokenEl = document.querySelector('meta[name="csrf-token"]');
    return tokenEl ? tokenEl.getAttribute("content") : "";
  };
  const getAuthToken = () => {
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
        "Accept": "application/json",
        ...options.headers
      };
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
      const response = await ofetch(url, {
        credentials: "include",
        // send cookies
        ...options,
        headers
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
    request
  };
}
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return "";
}
export {
  useApi as u
};
