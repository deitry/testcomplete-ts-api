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

declare const lmNone: lmNone;
declare const lmMessage: lmMessage;
declare const lmWarning: lmWarning;
declare const lmError: lmError;

/** Do not post any message. */
type lmNone = 0 & {Tag: "LogMessage"};
/** Post an informative message. */
type lmMessage = 1 & {Tag: "LogMessage"};
/** Post a warning message. */
type lmWarning = 2 & {Tag: "LogMessage"};
/** Post an error message. */
type lmError = 3 & {Tag: "LogMessage"};

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

declare const varEmpty: varEmpty;
declare const varNull: varNull;
declare const varSmallInt: varSmallInt;
declare const varInteger: varInteger;
declare const varSingle: varSingle;
declare const varDouble: varDouble;
declare const varCurrency: varCurrency;
declare const varDate: varDate;
declare const varOleStr: varOleStr;
declare const varDispatch: varDispatch;
declare const varError: varError;
declare const varBoolean: varBoolean;
declare const varVariant: varVariant;
declare const varUnknown: varUnknown;
declare const varShortInt: varShortInt;
declare const varByte: varByte;
declare const varWord: varWord;
declare const varLongWord: varLongWord;
declare const varInt64: varInt64;
declare const varStrArg: varStrArg;
declare const varString: varString;
declare const varAny: varAny;
declare const varArray: varArray;
declare const varByRef: varByRef;
/** Empty (uninitialized). */
type varEmpty = 0x0000 & {Tag: "VarType"};
/** Null (no valid data). */
type varNull = 0x0001 & {Tag: "VarType"};
/** Signed 16-bit integer. */
type varSmallInt = 0x0002 & {Tag: "VarType"};
/** Signed 32-bit integer. */
type varInteger = 0x0003 & {Tag: "VarType"};
/** Single-precision floating-point number. Number of significant digits: 7-8. */
type varSingle = 0x0004 & {Tag: "VarType"};
/** Double-precision floating-point number. Number of significant digits: 15-16. */
type varDouble = 0x0005 & {Tag: "VarType"};
/** High-precision floating-point number. Number of significant digits: 19-20.
 * Intended to minimize rounding errors in monetary calculations. */
type varCurrency = 0x0006 & {Tag: "VarType"};
/** OLE-compatible TDateTime type. */
type varDate = 0x0007 & {Tag: "VarType"};
/** String of 16-bit Unicode characters. */
type varOleStr = 0x0008 & {Tag: "VarType"};
/** Automation object that implements `IDispatch` interface. */
type varDispatch = 0x0009 & {Tag: "VarType"};
/** Code of an OS error. */
type varError = 0x000A & {Tag: "VarType"};
/** Boolean. */
type varBoolean = 0x000B & {Tag: "VarType"};
/** Variant. */
type varVariant = 0x000C & {Tag: "VarType"};
/** Reference to an unknown OLE object. */
type varUnknown = 0x000D & {Tag: "VarType"};
/** Signed 8-bit integer. */
type varShortInt = 0x0010 & {Tag: "VarType"};
/** Unsigned 8-bit integer. */
type varByte = 0x0011 & {Tag: "VarType"};
/** Unsigned 16-bit integer. */
type varWord = 0x0012 & {Tag: "VarType"};
/** Unsigned 32-bit integer. */
type varLongWord = 0x0013 & {Tag: "VarType"};
/** Signed 64-bit integer. */
type varInt64 = 0x0014 & {Tag: "VarType"};
/** A COM-compatible string. */
type varStrArg = 0x0048 & {Tag: "VarType"};
/** A reference to a dynamically allocated string (not COM-compatible). */
type varString = 0x0100 & {Tag: "VarType"};
/** A Variant that can contain any value. */
type varAny = 0x0101 & {Tag: "VarType"};
/** Array. Type of array elements is specified by the lower bits.
 * For example, `2003h` is an array of integers. */
type varArray = 0x2000 & {Tag: "VarType"};
/** Reference to a value of the type given by the lower bits.
 * For example, `4007h` is a reference to a date. */
type varByRef = 0x4000 & {Tag: "VarType"};
