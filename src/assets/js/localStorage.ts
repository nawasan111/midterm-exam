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
export type prefsTypeSome = {
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
  public prefs: prefsType = {
    color: {
      primary: "#0d6efd",
      second: "#6c757d",
      warning: "#b5babe",
      danger: "#dc3545",
      theme: "##3d3846",
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
