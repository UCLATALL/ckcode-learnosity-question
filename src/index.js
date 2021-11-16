// noinspection JSUnresolvedVariable
LearnosityAmd.define(() => {
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

  /**
   * Construct the feature
   * @param {{
   *   $el: JQuery,
   *   events: { trigger: (name: string) => void },
   *   feature: {
   *     id?: string,
   *     extra_setup?: string,
   *     extra_prompt?: string
   *   }
   * }} init
   */
  function CKCodeFeature(init) {
    const code_cells = document.querySelectorAll("code-cell");
    const existing_ids = [...code_cells].map((element) => element.id);
    const id = init.feature.id ?? find_unique_id(existing_ids);
    if (init.feature.id && existing_ids.includes(init.feature.id)) {
      console.warn(
        `[ckcode-learnosity] The given ID ${init.feature.id} already exists. Using new ID "${id}"`
      );
    }

    init.$el.html(
      build_sandbox_html(
        id,
        init.feature.extra_setup ?? "",
        init.feature.extra_prompt ?? ""
      )
    );

    init.events.trigger("ready");
  }

  return { Feature: CKCodeFeature };
});
