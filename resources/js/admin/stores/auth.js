import { router } from "@/plugins/1.router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    adminData: useCookie("adminData").value || null,
    adminAbilityRules: useCookie("adminAbilityRules").value || [],
  }),
  actions: {
    adminLogin(adminData, accessToken, adminAbilityRules) {
      useCookie("adminAccessToken").value = accessToken;
      useCookie("adminAbilityRules").value = adminAbilityRules;
      useCookie("adminData").value = adminData;
      this.adminData = adminData;
      this.adminAbilityRules = adminAbilityRules;
    },
    updateUserProfile(adminData, adminAbilityRules) {
      useCookie("adminData").value = adminData;
      this.adminData = adminData;
      if (adminAbilityRules) {
        useCookie("adminAbilityRules").value = adminAbilityRules;
        this.adminAbilityRules = adminAbilityRules;
      }
    },
    adminLogout() {
      this.adminData = null;
      this.adminAbilityRules = [];
      useCookie("adminData").value = null;
      useCookie("adminAbilityRules").value = null;
      useCookie("adminAccessToken").value = null;

      router.replace("/login");
    },
  },
});
