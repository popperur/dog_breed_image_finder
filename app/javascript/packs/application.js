
import Rails from "@rails/ujs"
Rails.start()

const componentRequireContext = require.context("components", true)
const ReactRailsUJS = require("react_ujs")
// eslint-disable-next-line react-hooks/rules-of-hooks
ReactRailsUJS.useContext(componentRequireContext)
