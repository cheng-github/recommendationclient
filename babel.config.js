const presets = [
  "@vue/app",
  [
    "@babel/preset-env", { "modules": false }
  ]  
];

const plugins = [
  [
    "component",
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }
  ]
];

module.exports = { presets, plugins };





