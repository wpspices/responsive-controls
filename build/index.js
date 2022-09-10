/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/GenerateCss.js":
/*!***************************************!*\
  !*** ./src/components/GenerateCss.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper */ "./src/helper.js");




const GenerateCss = props => {
  const {
    name,
    attributes,
    setAttributes,
    isSelected,
    clientId
  } = props;
  const {
    responsiveControlsID,
    responsiveControlsHideInDesktop,
    responsiveControlsHideInTab,
    responsiveControlsHideInMobile,
    responsiveControlsCss,
    responsiveControlsDStyle,
    responsiveControlsMStyle,
    responsiveControlsTStyle
  } = attributes;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let setCss = true;

    if (setCss) {
      setAttributes({
        responsiveControlsCss: getCss('.rcsid-' + clientId),
        responsiveControlsID: clientId
      });
      setLocalCSS(getCss('#block-' + clientId));
    }

    return () => {
      setCss = false;
    };
  }, [responsiveControlsHideInDesktop, responsiveControlsHideInTab, responsiveControlsHideInMobile, responsiveControlsDStyle, responsiveControlsMStyle, responsiveControlsTStyle]);
  const boxControls = ['padding', 'margin'];

  const getTypographyCss = typography => {
    if ((0,_helper__WEBPACK_IMPORTED_MODULE_1__.rcsIsEmpty)(typography)) {
      return ``;
    }

    return `${(0,_helper__WEBPACK_IMPORTED_MODULE_1__.rcsIsEmpty)(typography.fontSize) ? `` : `font-size:${typography.fontSize} !important;`}`;
  };

  const getDevicsCss = function (deviceAttr, selector) {
    let deviceName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Desktop';
    let HideInDevice = responsiveControlsHideInDesktop;

    if ('Tablet' === deviceName) {
      HideInDevice = responsiveControlsHideInTab;
    } else if ('Mobile' === deviceName) {
      HideInDevice = responsiveControlsHideInMobile;
    }

    return `
            ${selector}{
                ${HideInDevice ? `display:none;` : ``}
                ${(0,_helper__WEBPACK_IMPORTED_MODULE_1__.rcsIsEmpty)(deviceAttr) ? `` : (0,_helper__WEBPACK_IMPORTED_MODULE_1__.boxControlCompileCss)(deviceAttr, boxControls) + getTypographyCss(deviceAttr.typography)}
            }`;
  };

  const getCss = selector => {
    //Desktop css
    return `
            ${getDevicsCss(responsiveControlsDStyle, selector, 'Desktop')}

            @media only screen and (min-width: 769px) and (max-width: 1080px) {
                ${getDevicsCss(responsiveControlsTStyle, selector, 'Tablet')}
            }

            @media only screen and (max-width: 768px) {
                ${getDevicsCss(responsiveControlsMStyle, selector, 'Mobile')}
            }
        `;
  };

  const [localCSS, setLocalCSS] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(getCss('#block-' + clientId));
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, localCSS);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GenerateCss);

/***/ }),

/***/ "./src/components/HideInDevice.js":
/*!****************************************!*\
  !*** ./src/components/HideInDevice.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);




const HideInDevice = props => {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    responsiveControlsHideInDesktop,
    responsiveControlsHideInTab,
    responsiveControlsHideInMobile
  } = attributes;
  const HideInDeviceOptions = {
    desktop: responsiveControlsHideInDesktop,
    tablet: responsiveControlsHideInTab,
    smartphone: responsiveControlsHideInMobile
  };

  const setHideInDevice = deviceName => {
    let hideValue = HideInDeviceOptions[deviceName] ? false : true;

    if ('desktop' === deviceName) {
      setAttributes({
        responsiveControlsHideInDesktop: hideValue
      });
    }

    if ('tablet' === deviceName) {
      setAttributes({
        responsiveControlsHideInTab: hideValue
      });
    }

    if ('smartphone' === deviceName) {
      setAttributes({
        responsiveControlsHideInMobile: hideValue
      });
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hide in device', 'responsive-controls'),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, null, ['desktop', 'tablet', 'smartphone'].map(deviceName => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: deviceName,
      isSmall: true,
      isDestructive: true,
      variant: HideInDeviceOptions[deviceName] ? 'primary' : undefined,
      onClick: () => setHideInDevice(deviceName),
      icon: deviceName
    });
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HideInDevice);

/***/ }),

/***/ "./src/components/PaddingMargin.js":
/*!*****************************************!*\
  !*** ./src/components/PaddingMargin.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SelectDevice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SelectDevice */ "./src/components/SelectDevice.js");


/**
 * Range Unit control :
 * unit selection with set space attributes
 */






const PaddingMargin = props => {
  const {
    name,
    attributes,
    setAttributes,
    isSelected,
    clientId,
    rcsIsMargin
  } = props;
  const {
    responsiveControlsDStyle,
    responsiveControlsMStyle,
    responsiveControlsTStyle
  } = attributes;
  const deviceType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return select('core/edit-post').__experimentalGetPreviewDeviceType();
  }, []);

  const getSpacing = () => {
    if ('Mobile' === deviceType) {
      return rcsIsMargin ? responsiveControlsMStyle === null || responsiveControlsMStyle === void 0 ? void 0 : responsiveControlsMStyle.margin : responsiveControlsMStyle === null || responsiveControlsMStyle === void 0 ? void 0 : responsiveControlsMStyle.padding;
    } else if ('Tablet' === deviceType) {
      return rcsIsMargin ? responsiveControlsTStyle === null || responsiveControlsTStyle === void 0 ? void 0 : responsiveControlsTStyle.margin : responsiveControlsTStyle === null || responsiveControlsTStyle === void 0 ? void 0 : responsiveControlsTStyle.padding;
    } else {
      return rcsIsMargin ? responsiveControlsDStyle === null || responsiveControlsDStyle === void 0 ? void 0 : responsiveControlsDStyle.margin : responsiveControlsDStyle === null || responsiveControlsDStyle === void 0 ? void 0 : responsiveControlsDStyle.padding;
    }
  };

  const setSpacing = spacing => {
    if (spacing !== getSpacing()) {
      if ('Mobile' === deviceType) {
        if (rcsIsMargin) {
          setAttributes({
            responsiveControlsMStyle: { ...responsiveControlsMStyle,
              margin: spacing
            }
          });
        } else {
          setAttributes({
            responsiveControlsMStyle: { ...responsiveControlsMStyle,
              padding: spacing
            }
          });
        }
      } else if ('Tablet' === deviceType) {
        if (rcsIsMargin) {
          setAttributes({
            responsiveControlsTStyle: { ...responsiveControlsTStyle,
              margin: spacing
            }
          });
        } else {
          setAttributes({
            responsiveControlsTStyle: { ...responsiveControlsTStyle,
              padding: spacing
            }
          });
        }
      } else {
        if (rcsIsMargin) {
          setAttributes({
            responsiveControlsDStyle: { ...responsiveControlsDStyle,
              margin: spacing
            }
          });
        } else {
          setAttributes({
            responsiveControlsDStyle: { ...responsiveControlsDStyle,
              padding: spacing
            }
          });
        }
      }
    }
  };

  const allowNegativeMargin = rcsIsMargin ? {
    min: -1000
  } : {};
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, {
    className: "justify-content-end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SelectDevice__WEBPACK_IMPORTED_MODULE_4__["default"], null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalBoxControl, {
    label: rcsIsMargin ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Margin', 'responsive-controls') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding', 'responsive-controls'),
    values: getSpacing(),
    inputProps: allowNegativeMargin,
    onChange: nextValues => setSpacing(nextValues)
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaddingMargin);

/***/ }),

/***/ "./src/components/RangeUnitControl.js":
/*!********************************************!*\
  !*** ./src/components/RangeUnitControl.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SelectDevice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectDevice */ "./src/components/SelectDevice.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helper */ "./src/helper.js");


/**
 * Range Unit control :
 * unit selection with set space attributes
 */





const RangeUnitControl = props => {
  const {
    rangeLabel,
    rangeAttrValue,
    onChangeFunc,
    rangeMin,
    rangeMax,
    rangeStep
  } = props;
  const units = (0,_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUseCustomUnits)({
    availableUnits: ['px', 'em', 'rem', 'vh', 'vw'],
    defaultValues: {
      px: 0,
      em: 0,
      rem: 0,
      vh: 0,
      vw: 0
    }
  });

  const getQtyOrunit = function (rawUnit) {
    let quantityOrUnit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'unit';
    const [quantityToReturn, unitToReturn] = (0,_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalParseQuantityAndUnitFromRawValue)(rawUnit);
    let unit = 'undefined' === typeof unitToReturn || null === unitToReturn ? 'px' : unitToReturn;
    let Qty = 'undefined' === typeof quantityToReturn || null === quantityToReturn || '' == quantityToReturn ? 0 : quantityToReturn;
    return 'unit' === quantityOrUnit ? unit : quantityToReturn;
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", {
    className: "components-border-radius-control"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", null, (0,_helper__WEBPACK_IMPORTED_MODULE_4__.rcsIsEmpty)(rangeLabel) ? '' : rangeLabel), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SelectDevice__WEBPACK_IMPORTED_MODULE_3__["default"], null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-border-radius-control__wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    className: "components-border-radius-control__range-control",
    value: getQtyOrunit(rangeAttrValue, 'Qty'),
    withInputField: false,
    onChange: qty => onChangeFunc(qty + getQtyOrunit(rangeAttrValue)),
    min: rangeMin,
    max: rangeMax[getQtyOrunit(rangeAttrValue)],
    step: rangeStep
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, {
    className: "components-border-radius-control__unit-control",
    units: units,
    value: rangeAttrValue,
    onChange: rangeAttrValue => onChangeFunc(rangeAttrValue)
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RangeUnitControl);

/***/ }),

/***/ "./src/components/SelectDevice.js":
/*!****************************************!*\
  !*** ./src/components/SelectDevice.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);





const SelectDevice = () => {
  const deviceType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return select('core/edit-post').__experimentalGetPreviewDeviceType();
  }, []);
  const {
    __experimentalSetPreviewDeviceType: setPreviewDeviceType
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/edit-post');
  const deviceIcon = {
    Desktop: 'desktop',
    Tablet: 'tablet',
    Mobile: 'smartphone'
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "responsive-controls-select-device-icon-group"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, null, ['Desktop', 'Tablet', 'Mobile'].map(deviceOption => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      key: deviceOption,
      isSmall: true,
      variant: deviceOption === deviceType ? 'primary' : undefined,
      onClick: () => setPreviewDeviceType(deviceOption),
      icon: deviceIcon[deviceOption]
    });
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectDevice);

/***/ }),

/***/ "./src/components/Typography.js":
/*!**************************************!*\
  !*** ./src/components/Typography.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _RangeUnitControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RangeUnitControl */ "./src/components/RangeUnitControl.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helper */ "./src/helper.js");


/**
 * Range Unit control :
 * unit selection with set space attributes
 */







const Typography = props => {
  const {
    name,
    attributes,
    setAttributes,
    isSelected,
    clientId,
    rcsIsMargin
  } = props;
  const {
    responsiveControlsDStyle,
    responsiveControlsMStyle,
    responsiveControlsTStyle
  } = attributes;
  const deviceType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return select('core/edit-post').__experimentalGetPreviewDeviceType();
  }, []);

  const getTypographyValue = name => {
    if ('Mobile' === deviceType) {
      return (0,_helper__WEBPACK_IMPORTED_MODULE_5__.rcsIsEmpty)(responsiveControlsMStyle) || (0,_helper__WEBPACK_IMPORTED_MODULE_5__.rcsIsEmpty)(responsiveControlsMStyle.typography) ? undefined : responsiveControlsMStyle.typography[name];
    } else if ('Tablet' === deviceType) {
      return (0,_helper__WEBPACK_IMPORTED_MODULE_5__.rcsIsEmpty)(responsiveControlsTStyle) || (0,_helper__WEBPACK_IMPORTED_MODULE_5__.rcsIsEmpty)(responsiveControlsTStyle.typography) ? undefined : responsiveControlsTStyle.typography[name];
    } else {
      return (0,_helper__WEBPACK_IMPORTED_MODULE_5__.rcsIsEmpty)(responsiveControlsDStyle) || (0,_helper__WEBPACK_IMPORTED_MODULE_5__.rcsIsEmpty)(responsiveControlsDStyle.typography) ? undefined : responsiveControlsDStyle.typography[name];
    }
  }; //Prevent useeffect to set  attributes on first render


  const [firstRender, setFirstRender] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);

  const setFontSize = fontSize => {
    if (fontSize !== getTypographyValue('fontSize')) {
      let typographyObj = {
        fontSize: fontSize
      };

      if ('Mobile' === deviceType) {
        setAttributes({
          responsiveControlsMStyle: { ...responsiveControlsMStyle,
            typography: { ...typographyObj
            }
          }
        });
      } else if ('Tablet' === deviceType) {
        setAttributes({
          responsiveControlsTStyle: { ...responsiveControlsTStyle,
            typography: { ...typographyObj
            }
          }
        });
      } else {
        setAttributes({
          responsiveControlsDStyle: { ...responsiveControlsDStyle,
            typography: { ...typographyObj
            }
          }
        });
      }
    }
  };

  const MAX_SPACE_VALUES = {
    px: 120,
    em: 20,
    rem: 20,
    vh: 1,
    vw: 1
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Typography', 'responsive-controls'),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_RangeUnitControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    data: props,
    rangeLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font size', 'responsive-controls'),
    rangeAttrValue: getTypographyValue('fontSize'),
    rangeAttrName: "",
    onChangeFunc: fontSizeValue => setFontSize(fontSizeValue),
    rangeMin: 5,
    rangeMax: MAX_SPACE_VALUES,
    rangeStep: 1
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Typography);

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boxControlCompileCss": () => (/* binding */ boxControlCompileCss),
/* harmony export */   "rcsIsEmpty": () => (/* binding */ rcsIsEmpty)
/* harmony export */ });
//Check if empty
const rcsIsEmpty = data => 'undefined' === typeof data || null === data || '' === data; //Generate css for box controls output like padding, margin border e.g obj = style.padding

const boxControlCompileCss = (obj, nameArray) => {
  if (rcsIsEmpty(obj)) {
    return ``;
  }

  let css = nameArray.map(name => rcsIsEmpty(obj[name]) ? ` ` : `  
            ${rcsIsEmpty(obj[name].top) ? `` : `${name}-top:${obj[name].top} !important;`}
            ${rcsIsEmpty(obj[name].bottom) ? `` : `${name}-bottom:${obj[name].bottom} !important;`}
            ${rcsIsEmpty(obj[name].right) ? `` : `${name}-right:${obj[name].right} !important;`}
            ${rcsIsEmpty(obj[name].left) ? `` : `${name}-left:${obj[name].left} !important;`}
        `);
  return css.join(' ');
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_HideInDevice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/HideInDevice */ "./src/components/HideInDevice.js");
/* harmony import */ var _components_GenerateCss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/GenerateCss */ "./src/components/GenerateCss.js");
/* harmony import */ var _components_PaddingMargin__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/PaddingMargin */ "./src/components/PaddingMargin.js");
/* harmony import */ var _components_Typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/Typography */ "./src/components/Typography.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");














const withInspectorControls = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    const {
      name,
      attributes,
      setAttributes,
      isSelected,
      clientId
    } = props;
    const {
      useResponsiveControls
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockEdit, props), useResponsiveControls ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_GenerateCss__WEBPACK_IMPORTED_MODULE_9__["default"], props) : '', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Responsive Controls', 'responsive-controls'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Use Responsive controls', 'responsive-controls'),
      checked: useResponsiveControls,
      onChange: useResponsiveControls => setAttributes({
        useResponsiveControls
      })
    }), useResponsiveControls ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_HideInDevice__WEBPACK_IMPORTED_MODULE_8__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Typography__WEBPACK_IMPORTED_MODULE_11__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Spacing', 'responsive-controls'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_PaddingMargin__WEBPACK_IMPORTED_MODULE_10__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_PaddingMargin__WEBPACK_IMPORTED_MODULE_10__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      rcsIsMargin: true
    })))) : '')));
  };
}, 'withInspectorControl');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('editor.BlockEdit', 'my-plugin/with-inspector-controls', withInspectorControls);

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkresponsive_controls"] = self["webpackChunkresponsive_controls"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map