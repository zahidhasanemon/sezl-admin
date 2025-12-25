import { createMongoAbility } from "@casl/ability";
import { abilitiesPlugin } from "@casl/vue";

export default function (app) {
  const adminAbilityRules = useCookie("adminAbilityRules");
  const initialAbility = createMongoAbility(adminAbilityRules.value ?? []);

  app.use(abilitiesPlugin, initialAbility, {
    useGlobalProperties: true,
  });
}
