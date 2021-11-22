import "@uclatall/ckcode";

const app = new ckcode.CKCode({
  cell: {
    local_storage: {
      enable: false,
    },
  },
});

const init = () => {
  window.ckcode = app;
  app.hookup_cells();
};

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", init);
} else {
  // `DOMContentLoaded` has already fired
  init();
}
