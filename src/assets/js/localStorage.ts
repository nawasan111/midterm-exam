type prefsType = {
  fontFamily: string;
  color: {
    primary: string;
    second: string;
    warning: string;
    danger: string;
    theme: string;
  };
};
type prefsTypeSome = {
  fontFamily?: string;
  color?: {
    primary?: string;
    second?: string;
    warning?: string;
    danger?: string;
    theme?: string;
  };
};

class StorageLocal {
  prefs: prefsType = {
    color: {
      primary: "#212529",
      second: "#fff",
      warning: "#b5babe",
      danger: "#dc3545",
      theme: "#212529",
    },
    fontFamily: "Prompt",
  };
  constructor() {
    try {
      let get_prefs = localStorage.getItem("prefs") ?? "{}";
      let prefs_obj = JSON.parse(get_prefs);
      if (prefs_obj) this.prefs = { ...this.prefs, ...prefs_obj };
      console.log(this.prefs);
    } catch (err) {}
  }
  getAll() {
    return this.prefs;
  }
  set(local: prefsTypeSome) {
    localStorage.setItem("prefs", JSON.stringify({ ...this.prefs, ...local }));
  }
}

export default StorageLocal;
