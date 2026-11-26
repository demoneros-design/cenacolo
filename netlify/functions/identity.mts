const ADMIN_EMAIL = "moriconieros@gmail.com";

export default {
  userValidate(event: { user: { email?: string }; deny: () => unknown }) {
    if ((event.user.email || "").trim().toLowerCase() !== ADMIN_EMAIL) {
      return event.deny();
    }
  },

  userSignup(event: { user: Record<string, any> }) {
    if ((event.user.email || "").trim().toLowerCase() !== ADMIN_EMAIL) {
      throw new Error("Registrazione non autorizzata.");
    }

    return {
      user: {
        ...event.user,
        appMetadata: {
          ...(event.user.appMetadata || {}),
          roles: ["admin"]
        }
      }
    };
  }
};
