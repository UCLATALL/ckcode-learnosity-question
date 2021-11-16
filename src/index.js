// noinspection JSUnresolvedVariable
LearnosityAmd.define(() => {
  /**
   * Construct the feature
   * @param {{$el: JQuery, events: { trigger: (name: string) => void }}} init
   */
  function CKCodeFeature(init) {
    init.$el.html(`<iframe src="https://uclatall.github.io/ckcode-sandbox">`);
    init.events.trigger("ready");
  }

  return { Feature: CKCodeFeature };
});
