/*
 * Enum values that available in global scope without stating namespace.
 * TODO: Make auto-generated
 */

declare const lsXML = 0;
declare const lsHTML = 1;
declare const lsMHT = 2;
declare const lsZip = 3;
declare const lsPackedHTML = 4;
declare const lsJUnit = 5;

declare const pmLowest: pmLowest;
declare const pmLower: pmLower;
declare const pmNormal: pmNormal;
declare const pmHigher: pmHigher;
declare const pmHighest: pmHighest;
// By intersecting int with empty object we force type to remain in hovers
// (if leave just int type will be replaced with its value)
declare type pmLowest = 100 & {Tag: "Priority"};
declare type pmLower = 200 & {Tag: "Priority"};
declare type pmNormal = 300 & {Tag: "Priority"};
declare type pmHigher = 400 & {Tag: "Priority"};
declare type pmHighest = 500 & {Tag: "Priority"};

/** shift key is pressed */
declare const skShift: skShift;
/** alt key is pressed */
declare const skCtrl: skCtrl;
/** ctrl key is pressed */
declare const skAlt: skAlt;
/** neither ctrl, shift nor alt key pressed */
declare const skNoShift: skNoShift;
type skShift = 1 & {Tag: "ShiftState"};
type skCtrl = 1 & {Tag: "ShiftState"};
type skAlt = 2 & {Tag: "ShiftState"};
type skNoShift = 0 & {Tag: "ShiftState"};

declare const searchDepthFirst = TestComplete.ObjectSearchStrategyType.searchDepthFirst;
declare const searchBreadthFirst = TestComplete.ObjectSearchStrategyType.searchBreadthFirst;

declare const cmpContains = TestComplete.CompareCondition.cmpContains;
declare const cmpEndsWith = TestComplete.CompareCondition.cmpEndsWith;
declare const cmpEqual = TestComplete.CompareCondition.cmpEqual;
declare const cmpGreater = TestComplete.CompareCondition.cmpGreater;
declare const cmpGreaterOrEqual = TestComplete.CompareCondition.cmpGreaterOrEqual;
declare const cmpIn = TestComplete.CompareCondition.cmpIn;
declare const cmpLess = TestComplete.CompareCondition.cmpLess;
declare const cmpLessOrEqual = TestComplete.CompareCondition.cmpLessOrEqual;
declare const cmpMatches = TestComplete.CompareCondition.cmpMatches;
declare const cmpNotContains = TestComplete.CompareCondition.cmpNotContains;
declare const cmpNotEndsWith = TestComplete.CompareCondition.cmpNotEndsWith;
declare const cmpNotEqual = TestComplete.CompareCondition.cmpNotEqual;
declare const cmpNotIn = TestComplete.CompareCondition.cmpNotIn;
declare const cmpNotMatches = TestComplete.CompareCondition.cmpNotMatches;
declare const cmpNotStartsWith = TestComplete.CompareCondition.cmpNotStartsWith;
declare const cmpStartsWith = TestComplete.CompareCondition.cmpStartsWith;

declare const cbChecked: cbChecked;
declare const cbUnchecked: cbUnchecked;
declare const cbGrayed: cbGrayed;
type cbUnchecked = 0 | false;
type cbChecked = 1 | true;
type cbGrayed = 2;

declare const lmNone = TestComplete.MessageType.lmNone;
declare const lmMessage = TestComplete.MessageType.lmMessage;
declare const lmWarning = TestComplete.MessageType.lmWarning;
declare const lmError = TestComplete.MessageType.lmError;

declare const HKEY_CLASSES_ROOT: Win32API.Registry.HKEY_CLASSES_ROOT;
declare const HKEY_CURRENT_CONFIG: Win32API.Registry.HKEY_CURRENT_CONFIG;
declare const HKEY_CURRENT_USER: Win32API.Registry.HKEY_CURRENT_USER;
declare const HKEY_DYN_DATA: Win32API.Registry.HKEY_DYN_DATA;
declare const HKEY_LOCAL_MACHINE: Win32API.Registry.HKEY_LOCAL_MACHINE;
declare const HKEY_PERFORMANCE_DATA: Win32API.Registry.HKEY_PERFORMANCE_DATA;
declare const HKEY_USERS: Win32API.Registry.HKEY_USERS;

/** 32-bit registry (default) */
declare const AQRT_32_BIT: AQRT_32_BIT;
/** 64-bit registry */
declare const AQRT_64_BIT: AQRT_64_BIT;
declare type AQRT_32_BIT = 0 & {Tag: "RegistryType"};
declare type AQRT_64_BIT = 1 & {Tag: "RegistryType"};

declare const mrAbort: mrAbort;
declare const mrAll: mrAll;
declare const mrCancel: mrCancel;
declare const mrIgnore: mrIgnore;
declare const mrNo: mrNo;
declare const mrNone: mrNone;
declare const mrNoToAll: mrNoToAll;
declare const mrOk: mrOk;
declare const mrRetry: mrRetry;
declare const mrYes: mrYes;
declare const mrYesToAll: mrYesToAll;
type mrAbort = 3 & {Tag: "ModalResult"};
type mrAll = 8 & {Tag: "ModalResult"};
type mrCancel = 2 & {Tag: "ModalResult"};
type mrIgnore = 5 & {Tag: "ModalResult"};
type mrNo = 7 & {Tag: "ModalResult"};
type mrNone = 0 & {Tag: "ModalResult"};
type mrNoToAll = 9 & {Tag: "ModalResult"};
type mrOk = 1 & {Tag: "ModalResult"};
type mrRetry = 4 & {Tag: "ModalResult"};
type mrYes = 6 & {Tag: "ModalResult"};
type mrYesToAll = 10 & {Tag: "ModalResult"};

declare const mtConfirmation: mtConfirmation;
declare const mtCustom: mtCustom;
declare const mtError: mtError;
declare const mtInformation: mtInformation;
declare const mtWarning: mtWarning;
type mtConfirmation = 0 & {Tag: "MessageType"};
type mtCustom = 1 & {Tag: "MessageType"};
type mtError = 2 & {Tag: "MessageType"};
type mtInformation = 3 & {Tag: "MessageType"};
type mtWarning = 4 & {Tag: "MessageType"};
