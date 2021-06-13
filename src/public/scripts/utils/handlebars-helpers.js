// eslint-disable-next-line no-undef
Handlebars.registerHelper('isnull', (value) => {
  console.log(value === null)
  return value === null
})
