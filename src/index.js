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
    console.log('color', color.toHex());
    const isNested = /-/.test(color.name);
    const isOpacity1 = color.toHex().a === 'ff';
    const hexColor = isOpacity1
      ? `#${color.toHex().r}${color.toHex().g}${color.toHex().b}`
      : `#${color.toHex().r}${color.toHex().g}${color.toHex().b}${
          color.toHex().a
        }`;

    if (isNested && !excludedRegex.test(color.name)) {
      const keys = color.name.split(/-(.*)/s);
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

function textStyles(context) {
  const textStyles = context.project.textStyles || [];

  const result = {};
  textStyles.forEach((textStyle) => {
    const splitText = textStyle.name.split(/(\(|\))/);
    const level1 = splitText[0];
    const level2 = `${splitText[2]}${splitText[4]}`;
    const hexColor = `#${textStyle.color.toHex().r}${
      textStyle.color.toHex().g
    }${textStyle.color.toHex().b}`;

    if (level1 in result) {
      result[level1][level2] = {
        color: hexColor,
        fontSize: `${textStyle.fontSize}px`,
        fontWeight: textStyle.weightText,
        fontFamily: textStyle.fontFamily,
        lineHeight: `${textStyle.lineHeight}px`,
      };
      return;
    }
    result[level1] = {
      [level2]: {
        color: hexColor,
        fontSize: `${textStyle.fontSize}px`,
        fontWeight: textStyle.weightText,
        fontFamily: textStyle.fontFamily,
        lineHeight: `${textStyle.lineHeight}px`,
      },
    };
  });
  return {
    language: 'json',
    code: JSON.stringify(result, null, 2),
  };
}

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
