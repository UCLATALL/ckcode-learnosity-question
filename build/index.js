"use strict";function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&iter[Symbol.iterator]!=null||iter["@@iterator"]!=null)return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i]}return arr2}LearnosityAmd.define(function(){var build_sandbox_html=function build_sandbox_html(id){var extra_setup=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"";var extra_prompt=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"";return"\n    <code-cell id=\"".concat(id,"\">\n      <code data-type=\"setup\">\n        require(coursekata)\n        candy_rankings <- fivethirtyeight::candy_rankings %>%\n          mutate(nutty = peanutyalmondy, sugarpercent = sugarpercent * 100) %>%\n          select(competitorname, winpercent, chocolate, fruity, nutty, hard, bar, sugarpercent, pricepercent)\n        selfies <- readr::read_csv(\"https://docs.google.com/spreadsheets/d/1jqMg3-L4Z5bK5FCjCC2rv6Za4qzM5nq_Yn6k_rJmZ6M/export?format=csv\")\n        ").concat(extra_setup,"\n      </code>\n      <code data-type=\"prompt\">\n        ").concat(extra_prompt,"\n      </code>\n    </code-cell>\n  ")};var find_unique_id=function find_unique_id(existing_ids){var counter=existing_ids.length;var id="sandbox-".concat(counter);while(existing_ids.includes(id)){counter+=1;id="sandbox-".concat(counter)}return id};function CKCodeFeature(init){var _init$feature$id,_init$feature$extra_s,_init$feature$extra_p;var code_cells=document.querySelectorAll("code-cell");var existing_ids=_toConsumableArray(code_cells).map(function(element){return element.id});var id=(_init$feature$id=init.feature.id)!==null&&_init$feature$id!==void 0?_init$feature$id:find_unique_id(existing_ids);if(init.feature.id&&existing_ids.includes(init.feature.id)){console.warn("[ckcode-learnosity] The given ID ".concat(init.feature.id," already exists. Using new ID \"").concat(id,"\""))}init.$el.html(build_sandbox_html(id,(_init$feature$extra_s=init.feature.extra_setup)!==null&&_init$feature$extra_s!==void 0?_init$feature$extra_s:"",(_init$feature$extra_p=init.feature.extra_prompt)!==null&&_init$feature$extra_p!==void 0?_init$feature$extra_p:""))}return{Feature:CKCodeFeature}});