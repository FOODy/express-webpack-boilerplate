declare namespace module {
  declare const hot: Hot | undefined;

  interface Hot {
    accept(path: string, cb: () => void): void;
  }
}