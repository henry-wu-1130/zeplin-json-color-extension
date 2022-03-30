/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

function layer(context, selectedLayer) {}

function screen(context, selectedVersion, selectedScreen) {}

function component(context, selectedVersion, selectedComponent) {}

function colors(context) {
  const excludedRegex = /shadow/;
  const colors = context.project.colors;
  const result = {};

  colors.forEach((color) => {
    const isNested = /-/.test(color.name);
    const hexColor = `#${color.toHex().r}${color.toHex().g}${color.toHex().b}`;

    if (isNested && !excludedRegex.test(color.name)) {
      const keys = color.name.split('-');
      if (keys[0] in result) {
        result[keys[0]][keys[1]] = hexColor;
        return;
      }
      result[keys[0]] = {
        [keys[1]]: hexColor,
      };
      return;
    }
    result[color.name] = hexColor;
  });
  return {
    language: 'json',
    code: JSON.stringify(result, null, 2),
  };
}

function textStyles(context) {}

function spacing(context) {}

function exportColors(context) {}

function exportTextStyles(context) {}

function exportSpacing(context) {}

/**
 * The following functions will be deprecated. Your extensions can export them to support old versions of Zeplin's macOS app.
 * See Zeplin Extensions migration guide for details:
 * https://zpl.io/shared-styleguides-extensions-migration-guide
 */

function styleguideColors(context, colors) {}

function styleguideTextStyles(context, textStyles) {}

function exportStyleguideColors(context, colors) {}

function exportStyleguideTextStyles(context, textStyles) {}

function comment(context, text) {}

export default {
  layer,
  screen,
  component,
  colors,
  textStyles,
  spacing,
  exportColors,
  exportTextStyles,
  exportSpacing,
  styleguideColors,
  styleguideTextStyles,
  exportStyleguideColors,
  exportStyleguideTextStyles,
  comment,
};
