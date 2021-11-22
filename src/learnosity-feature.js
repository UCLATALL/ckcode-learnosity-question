// The original version of this file was distributed under the MIT license.
// The rest is (git) history.
//
// MIT License
//
// Copyright (c) 2018 Charlie Stigler
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// 	The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// 	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// 	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// 	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// noinspection JSUnresolvedVariable
LearnosityAmd.define(["jquery-v1.10.2"], function ($) {
  /**
   * Build the CKCode sandbox HTML
   * @param {string} id
   * @param {string} extra_setup
   * @param {string} extra_prompt
   * @return {string}
   */
  const build_sandbox_html = (id, extra_setup = "", extra_prompt = "") => `
    <code-cell id="${id}">
      <code data-type="setup">
        require(coursekata)
        candy_rankings <- fivethirtyeight::candy_rankings %>%
          mutate(nutty = peanutyalmondy, sugarpercent = sugarpercent * 100) %>%
          select(competitorname, winpercent, chocolate, fruity, nutty, hard, bar, sugarpercent, pricepercent)
        selfies <- readr::read_csv("https://docs.google.com/spreadsheets/d/1jqMg3-L4Z5bK5FCjCC2rv6Za4qzM5nq_Yn6k_rJmZ6M/export?format=csv")
        ${extra_setup}
      </code>
      <code data-type="prompt">
        ${extra_prompt}
      </code>
    </code-cell>
  `;

  /**
   * Create a unique sandbox ID
   * @param {string[]} existing_ids
   * @return {string}
   */
  const find_unique_id = (existing_ids) => {
    let counter = existing_ids.length;
    let id = `sandbox-${counter}`;
    while (existing_ids.includes(id)) {
      counter += 1;
      id = `sandbox-${counter}`;
    }

    return id;
  };

  // noinspection SpellCheckingInspection
  const ckcode_bundle =
    "//cdn.jsdelivr.net/gh/UCLATALL/ckcode-learnosity-question@1.0/build/ckcode.bundle.js";

  // lock to make sure we don't start loading the script from multiple instances at the same time
  let loading_script = false;

  /**
   * Construct the feature
   * @param {{
   *   $el: JQuery,
   *   events: { trigger: (name: string) => void },
   *   feature: { id?: string, extra_setup?: string, extra_prompt?: string }
   * }} init
   */
  function CKCodeFeature(init) {
    const code_cells = document.querySelectorAll("code-cell");
    const existing_ids = [...code_cells].map((element) => element.id);
    const id = init.feature?.id ?? find_unique_id(existing_ids);
    if (init.feature?.id && existing_ids.includes(init.feature.id)) {
      console.warn(
        `[ckcode-learnosity] The given ID ${init.feature.id} already exists. Using new ID "${id}"`
      );
    }

    init.$el.html(
      build_sandbox_html(
        id,
        init.feature?.extra_setup || "",
        init.feature?.extra_prompt || ""
      )
    );

    // only load the ckcode script once -- check to see if the app is defined to see if it is already loaded
    let already_loaded = typeof window.ckcode !== "undefined";

    if (already_loaded) {
      // CKCode already loaded, so just initialize the new exercises added
      // noinspection JSUnresolvedFunction
      window.ckcode.hookup_cells();
      init.events.trigger("ready");
    } else if (loading_script) {
      // somebody else is grabbing the script, we can just chill
      init.events.trigger("ready");
    } else {
      // fetch the script if we're not already doing so (and lock so other instances don't try also)
      loading_script = true;

      // caching is A-OK with us - we only _want_ to load the script once anyway
      return $.ajax({
        dataType: "script",
        cache: true,
        url: ckcode_bundle,
        success: function () {
          console.log("[ckcode-learnosity] Loaded script successfully!");
          init.events.trigger("ready");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(
            "[ckcode-learnosity] Error loading script: ",
            textStatus,
            errorThrown
          );
        },
        complete: function () {
          // whether we succeeded or failed, we're not trying anymore
          loading_script = false;
        },
      });
    }
  }

  return { Feature: CKCodeFeature };
});
