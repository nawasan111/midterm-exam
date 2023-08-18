type prefsType = {
  fontFamily: string;
  hideFooter: boolean;
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
  hideFooter?: boolean;
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
    hideFooter: false,
    color: {
      primary: "#0d6efd",
      second: "#6c757d",
      warning: "#b5babe",
      danger: "#dc3545",
      theme: "#3d3846",
    },
    fontFamily: "Chakra Petch",
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
