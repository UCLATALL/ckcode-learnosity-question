// noinspection JSUnresolvedVariable
LearnosityAmd.define(() => {
  /**
   * Construct the feature
   * @param {{$el: JQuery, events: { trigger: (name: string) => void }}} init
   */
  function CKCodeFeature(init) {
    const style = ["min-width:600px", "max-width:900px"].join(";");
    init.$el.html(
      `<iframe src="https://uclatall.github.io/ckcode-sandbox" style="${style}">`
    );
    init.events.trigger("ready");
  }

  return { Feature: CKCodeFeature };
});
