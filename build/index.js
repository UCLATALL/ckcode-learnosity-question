"use strict";LearnosityAmd.define(function(){var build_sandbox_html=function build_sandbox_html(id){var extra_setup=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"";var extra_prompt=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"";return"\n    <code-cell id=\"".concat(id,"\">\n      <code data-type=\"setup\">\n        require(coursekata)\n        candy_rankings <- fivethirtyeight::candy_rankings %>%\n          mutate(nutty = peanutyalmondy, sugarpercent = sugarpercent * 100) %>%\n          select(competitorname, winpercent, chocolate, fruity, nutty, hard, bar, sugarpercent, pricepercent)\n        selfies <- readr::read_csv(\"https://docs.google.com/spreadsheets/d/1jqMg3-L4Z5bK5FCjCC2rv6Za4qzM5nq_Yn6k_rJmZ6M/export?format=csv\")\n        ").concat(extra_setup,"\n      </code>\n      <code data-type=\"prompt\">\n        ").concat(extra_prompt,"\n      </code>\n    </code-cell>\n  ")};var find_unique_id=function find_unique_id(existing_ids){var counter=existing_ids.length;var id="sandbox-".concat(counter);while(existing_ids.includes(id)){counter+=1;id="sandbox-".concat(counter)}return id};function CKCodeFeature(init){var _init$feature$id,_init$feature$extra_s,_init$feature$extra_p;var code_cells=document.querySelectorAll("code-cell");var existing_ids=code_cells.map(function(element){return element.id});var id=(_init$feature$id=init.feature.id)!==null&&_init$feature$id!==void 0?_init$feature$id:find_unique_id(existing_ids);if(init.feature.id&&existing_ids.includes(init.feature.id)){console.warn("[ckcode-learnosity] The given ID ".concat(init.feature.id," already exists. Using new ID \"").concat(id,"\""))}init.$el.html(build_sandbox_html(id,(_init$feature$extra_s=init.feature.extra_setup)!==null&&_init$feature$extra_s!==void 0?_init$feature$extra_s:"",(_init$feature$extra_p=init.feature.extra_prompt)!==null&&_init$feature$extra_p!==void 0?_init$feature$extra_p:""))}return{Feature:CKCodeFeature}});