/**
 * Declaration for TestComplete internal types
 * - With the help of https://github.com/falafelsoftware/testcomplete-typescript
 * - Allows intellisense in external editors such as VS Code
 */


// interface int extends number {};
declare type int = number;

declare namespace TestComplete {

    type Variant = any;

    /* Generic abstractions */

    /**
     * Common properties for all processes, windows, controls and onscreen objects.
     */
    interface RuntimeObject {
        readonly Name: string;

        /** The Exists property tells whether a given object still exists in the system.
         * If it does not exist, Exists is False; else, True. */
        readonly Exists: boolean;
        readonly Parent: RuntimeObject;
        readonly MappedName: string;
        readonly ChildCount: int;

        /** Returns one child object by its index in the list */
        Child(Index: int): RuntimeObject;

        /** Search for the desired object in the object hierarchy */
        Find(
            PropNames: Array<string> | string,
            PropValues: Array<any> | any,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): RuntimeObject;
        FindChild(
            PropNames: Array<string> | string,
            PropValues: Array<any> | any,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): RuntimeObject;

        /** Searches for all objects that have the specified values
         * of the specified properties */
        FindAll(
            PropNames: Array<string> | string,
            PropValues: Array<any> | any,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): Array<RuntimeObject>;

        /** Searches for all child objects that have the specified values
         * of the specified properties */
        FindAllChildren(
            PropNames: Array<string> | string,
            PropValues: Array<any> | any,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): Array<RuntimeObject>;

        /**
         * Pauses the test execution until the specified object property
         * achieves the specified value or until the specified timeout elapses
         */
        WaitProperty(PropertyName: string, PropertyValue: any, WaitTime?: int): boolean;
    }

    /** Any onscreen object */
    interface Element extends RuntimeObject {
        readonly Parent: Element;
        readonly Enabled: boolean;
        readonly Id: int;
        readonly Name: string;
        readonly FullName: string;
        readonly Visible: boolean;
        readonly VisibleOnScreen: boolean;

        readonly ScreenTop: int;
        readonly ScreenLeft: int;
        readonly Top: int;
        readonly Left: int;
        readonly Width: int;
        readonly Height: int;
        readonly PopupMenu: Popup;

        Refresh(): void;
        Picture(): Picture;
        Click(ClientX?: int, ClientY?: int, Shift?: boolean /* skNoShift */): void;
        DblClick(ClientX?: int, ClientY?: int, Shift?: boolean /* skNoShift */): void;
        HoverMouse(ClientX?: int, ClientY?: int): void;
        Keys(input: string): void;

        // override
        Find(
            PropNames: Array<string> | string,
            PropValues: Array<any> | any,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): Element;
        FindChild(
            PropNames: Array<string> | string,
            PropValues: Array<any> | any,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): Element;
        FindAllChildren(
            PropNames: Array<string> | string,
            PropValues: Array<any> | any,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): Array<Element>;
    }

    /** web specific interface with dimensions and scrolling */
    interface WebElement extends Element {
        clientWidth: int;
        clientHeight: int;
        clientTop: int;
        clientLeft: int;

        scrollIntoView(align: boolean): void;
        scrollIntoViewIfNeeded(align: boolean): void;
    }

    /** TestComplete objects initially generated using the TypeScriptUtils class
     * and hand edited as child property objects are defined.
     */

    interface Sys extends Element {
        ChildCount: int;
        Clipboard: Variant;
        CPU: string;
        CPUCount: int;
        CPUUsage: int;
        readonly Desktop: Desktop;
        DomainName: string;
        Exists: boolean;
        FullName: string;
        HostName: string;
        Id: int;
        MappedName: string;
        MemUsage: int;
        Name: string;
        OSInfo: any;
        Parent: any;
        UserName: string;

        OleObject(OleObject: string, MachineName?: string): OleObject;
        Browser(BrowserName?: string, BrowserIndex?: int): BrowserProcess;
        BrowserWindow(Index: int): Window;
        Child(Index: int): any;

        Find(
            PropNames: Array<any>,
            PropValues: Array<string>,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): any;

        FindAll(
            PropNames: Array<any>,
            PropValues: Array<string>,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): any;

        FindAllChildren(
            PropNames: Array<any>,
            PropValues: Array<string>,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): any;

        /** Searches for a child object that has the specified property values. */
        FindChild(
            PropNames: Array<any>,
            PropValues: Array<string>,
            Depth?: int /* 0 */,
            RefreshTree?: boolean /* true */): any;

        /** Searches for a child object that has the specified property values during the specified timeout period. */
        FindChildEx(
            PropNames: Array<any>,
            PropValues: Array<string>,
            Depth?: int /* 0 */,
            RefreshTree?: boolean /* true */,
            Timeout?: int /* 0 */): any;

        /** Searches for a child object that has the specified property values during the specified timeout period. */
        FindEx(
            PropNames: Array<any>,
            PropValues: Array<string>,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */,
            Timeout?: int /* 0 */): any;

        FindId(Id: int, RefreshTree: boolean): any;
        HighlightObject(Object: any, HighlightCount: int, Color: int): void;
        Keys(Keys: string): void;
        ObjectFromPoint(X: int, Y: int, FindTransparent: boolean): any;
        Process(ProcessName: string, GroupIndex: int): Process;
        Refresh(): void;
        Restart(): void;
        Shutdown(): void;
        WaitBrowser(BrowserName?: string, Timeout?: int, BrowserIndex?: int): BrowserProcess;
        WaitChild(ChildName: string, WaitTime: int): any;

        /**
         * Delays script execution until the specified process appears in the list of processes or the specified time limit is reached.
         * To determine whether the returned object is an extant process, call Exists.
         */
        WaitProcess(ProcessName: string, WaitTime?: int /* 0 */, ProcessIndex?: int /* 1 */): any;
        WaitProperty(PropertyName: string, PropertyValue: any, WaitTime: int): boolean;
        WindowFromHandle(Handle: int): any;
    }

    interface Desktop extends Element {
        MouseX: int;
        MouseY: int;

        readonly Width: int;
        readonly Height: int;

        PictureUnderMouse(Width: int, Height: int, Mouse: boolean): Picture;
        Picture(ClientX?: int, ClientY?: int, Width?: int, Height?: int, Mouse?: boolean): Picture;

        Keys(Keys: string): any;
        ActiveWindow(): Window;
        FocusedWindow(): Window;
        ObjectFromPoint(X: int, Y: int, FindTransparent: boolean): any;
        WindowFromHandle(Handle: int): any;

        MouseDown(VirtuakKeyCode: int, X: int, Y: int): any;
        MouseUp(VirtuakKeyCode: int, X: int, Y: int): any;

        KeyDown(VirtuakKeyCode: int): any;
        KeyUp(VirtuakKeyCode: int): any;
    }

    interface Window extends Element {
        readonly ControlId: int;
        readonly Focused: boolean;

        Handle: int;
        Height: int;
        HScroll: any;
        Id: int;
        Index: int;
        Left: int;
        MainMenu: any;
        MappedName: string;
        readonly Name: string;
        ObjectIdentifier: any;
        ObjectType: string;
        readonly PopupMenu: Popup;
        ScreenLeft: int;
        ScreenTop: int;
        SystemMenu: any;
        Top: int;
        Unicode: boolean;
        Visible: boolean;
        VisibleOnScreen: boolean;
        VScroll: any;
        Width: int;
        WndCaption: string;
        WndClass: string;
        WndStyles: int;
        WndStylesEx: int;

        // methods to get certain elements. Not sure if it should be used like that
        Popup(Name: string): Popup;
        Text(Name: string): Text;
        RadioButton(Name: string): RadioButton;

        Activate(): void;
        AWTObject(Name: any, AccName: any, Index: any, WndIndex: any): any;
        Child(Index: int): any;
        ClickM(ClientX: int, ClientY: int, Shift: any): void;
        ClickR(ClientX: int, ClientY: int, Shift: any): void;
        Close(WaitTimeout?: int): void;
        CLXObject(Name: any): any;
        DblClickM(ClientX: int, ClientY: int, Shift: any): void;
        DblClickR(ClientX: int, ClientY: int, Shift: any): void;
        Drag(ClientX: int, ClientY: int, toX: int, toY: int, Shift: any): void;
        DragM(ClientX: int, ClientY: int, toX: int, toY: int, Shift: any): void;
        DragR(ClientX: int, ClientY: int, toX: int, toY: int, Shift: any): void;
        FindId(Id: int, RefreshTree: boolean): any;
        JavaFXObject(Name: any, Text: any, Index: any): any;
        Keys(Keys: string): void;
        Maximize(): void;
        Minimize(): void;
        MouseWheel(Delta: int, Shift: any): void;
        MSAAObject(Name: any): any;
        ObjectFromPoint(X: int, Y: int, FindTransparent: boolean): any;
        Picture(ClientX?: int, ClientY?: int, Width?: int, Height?: int, Mouse?: boolean): Picture;
        Position(Left: int, Top: int, Width: int, Height: int): void;
        QtObject(Name: any, Text: any, WndIndex: any): any;
        Refresh(): void;
        Restore(): void;
        ScreenToWindow(X: int, Y: int): any;
        SetFocus(): void;
        SwingObject(Name: any, AccName: any, Index: any, WndIndex: any): any;
        SWTObject(Name: any, WndCaption: any, Index: any): any;
        TextObject(Text: any, Index: any): any;
        VBObject(Name: any): any;
        VCLNETObject(Name: any, WndCaption: any, Index: any): any;
        VCLObject(Name: any): any;
        WaitAWTObject(Name: any, AccName: any, Index: any, WndIndex: any, Timeout: int): any;
        WaitChild(ChildName: string, WaitTime: int): any;
        WaitCLXObject(Name: any, Timeout: int): any;
        WaitJavaFXObject(Name: any, Text: any, Index: any, Timeout: int): any;
        WaitMSAAObject(Name: any, Timeout: int): any;
        WaitProperty(PropertyName: string, PropertyValue: any, WaitTime: int): boolean;
        WaitQtObject(Name: any, Text: any, WndIndex: any, Timeout: int): any;
        WaitSwingObject(Name: any, AccName: any, Index: any, WndIndex: any, Timeout: int): any;
        WaitSWTObject(Name: any, WndCaption: any, Index: any, Timeout: int): any;
        WaitTextObject(Text: any, Index: any, Timeout: int): any;
        WaitVBObject(Name: any, Timeout: int): any;
        WaitVCLNETObject(Name: any, WndCaption: any, Index: any, Timeout: int): any;
        WaitVCLObject(Name: any, Timeout: int): any;
        WaitWFCObject(Name: any, WndCaption: any, Index: any, Timeout: int): any;
        WaitWindow(WndClass: string, WndCaption: string, GroupIndex: int, WaitTime: int): any;
        WaitWinFormsObject(Name: any, WndCaption: any, Index: any, Timeout: int): any;
        WaitWPFObject(Name: any, Caption: any, Index: any, Timeout: int): any;
        WFCObject(Name: any, WndCaption: any, Index: any): any;
        Window(WndClass: string, WndCaption?: string /* "*" */, GroupIndex?: int): any;
        WindowToScreen(X: int, Y: int): any;
        WinFormsObject(Name: any, WndCaption: any, Index: any): any;
        WPFObject(Name: any, Caption: any, Index: any): any;
    }

    /** Name mapping */

    interface NameMapping {
        TimeOutWarning: boolean;
        ConfigurationCount: int;
        CurrentConfigurationName: string;
        ConfigurationNames(Index: int): any;
    }

    interface Aliases {
        Exists: boolean;
        RefreshMappingInfo(): void;
        WaitProperty(PropertyName: string, PropertyValue: any, WaitTime?: int): boolean;
        WaitAliasChild(ChildName: string, WaitTime?: int): any;
        GetUnderlyingObject(): any;
    }

    interface Alias extends Aliases {
    }


    /** Browser objects */

    interface BrowserProcess {
        BrowserIndex: int;
        ChildCount: int;
        CommandLine: string;
        CPUUsage: int;
        Exists: boolean;
        FileVersionInfo: any;
        FullName: string;
        HandleCount: int;
        Id: int;
        Index: int;
        IsOpen: boolean;
        MappedName: string;
        MemUsage: int;
        Name: string;
        ObjectIdentifier: any;
        ObjectType: string;
        Parent: any;
        Path: string;
        Priority: int;
        ProcessName: string;
        ProcessType: string;
        SessionId: int;
        System: boolean;
        ThreadCount: int;
        UserName: string;
        VMSize: int;

        AppDomain(Name: any, ClrVersion: any): any;
        AWTObject(Name: any, AccName: any, Index: any, WndIndex: any): any;
        Browser(BrowserName?: string, BrowserIndex?: int): Browser;
        Child(Index: int): any;
        Close(WaitTimeout: int): void;
        CLXObject(Name: any): any;
        BrowserWindow(Index: int): Window;
        Find(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean): any;
        FindAll(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean): any;
        FindAllChildren(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean): any;
        FindChild(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean): any;
        FindChildEx(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean, Timeout: int): any;
        FindEx(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean, Timeout: int): any;
        FindId(Id: int, RefreshTree: boolean): any;
        JavaFXObject(Name: any, Text: any, Index: any): any;
        JavaRuntime(Index: any): any;
        Page(URL?: string, Index?: int): Page;
        QtObject(Name: any, Text: any, WndIndex: any): any;
        Refresh(): void;
        SaveDumpToFile(FileName: string, FullMemory: boolean): void;
        SaveDumpToLog(FullMemory: boolean): void;
        SwingObject(Name: any, AccName: any, Index: any, WndIndex: any): any;
        SWTObject(Name: any, WndCaption: any, Index: any): any;
        Terminate(): void;
        ToUrl(URL: string, WaitTime: int): any;
        VBObject(Name: any): any;
        VCLNETObject(Name: any, WndCaption: any, Index: any): any;
        VCLObject(Name: any): any;
        WaitAppDomain(Name: any, ClrVersion: any, Timeout: int): any;
        WaitAWTObject(Name: any, AccName: any, Index: any, WndIndex: any, Timeout: int): any;
        WaitChild(ChildName: string, WaitTime: int): any;
        WaitCLXObject(Name: any, Timeout: int): any;
        WaitJavaFXObject(Name: any, Text: any, Index: any, Timeout: int): any;
        WaitJavaRuntime(Index: any, Timeout: int): any;
        WaitPage(URL: string, Index?: int, Timeout?: int): any;
        WaitProperty(PropertyName: string, PropertyValue: any, WaitTime?: int): boolean;
        WaitQtObject(Name: any, Text: any, WndIndex: any, Timeout: int): any;
        WaitSwingObject(Name: any, AccName: any, Index: any, WndIndex: any, Timeout: int): any;
        WaitSWTObject(Name: any, WndCaption: any, Index: any, Timeout: int): any;
        WaitVBObject(Name: any, Timeout: int): any;
        WaitVCLNETObject(Name: any, WndCaption: any, Index: any, Timeout: int): any;
        WaitVCLObject(Name: any, Timeout: int): any;
        WaitWFCObject(Name: any, WndCaption: any, Index: any, Timeout: int): any;
        WaitWindow(WndClass: string, WndCaption?: string, GroupIndex?: int, WaitTime?: int): Window;
        WaitWinFormsObject(Name: any, WndCaption: any, Index: any, Timeout: int): any;
        WaitWPFObject(Name: any, Caption: any, Index: any, Timeout: int): any;
        WFCObject(Name: any, WndCaption: any, Index: any): any;
        Window(WndClass: string, WndCaption: string, GroupIndex: int): any;
        WinFormsObject(Name: any, WndCaption: any, Index: any): any;
        WPFObject(Name: any, Caption: any, Index: any): any;
    }

    interface Browsers {
        pX86: int;
        pX64: int;
        pAny: int;
        btIExplorer: int;
        btFirefox: int;
        btChrome: int;
        Count: int;
        Item(Family: int): BrowserInfo;
        CurrentBrowser: BrowserInfo;
        btOpera: int;
        btSafari: int;
        SystemDefaultBrowser: int;
        btEdge: int;
        Refresh(): void;
    }

    interface Browser extends Window { }

    interface BrowserInfo {
        Family: int;
        Version: any;
        Platform: int;
        Description: string;
        Run(URL?: string, PageLoadWaitTime?: int): void;
        Navigate(URL: string, WaitTime?: int): void;
    }

    interface BrowserDialog extends Window {
        OpenFile(FileName: string, FileType?: any): void;
        SaveFile(path: string): void;
    }

    interface Page {
        ChildCount: int;
        contentDocument: any;
        Enabled: boolean;
        Exists: boolean;
        FullName: string;
        Height: int;
        Id: int;
        Left: int;
        MappedName: string;
        Name: string;
        NativeWebObject: any;
        ObjectGroupIndex: any;
        ObjectIdentifier: any;
        ObjectType: string;
        Parent: any;
        ScreenLeft: int;
        ScreenTop: int;
        Top: int;
        URL: string;
        Visible: boolean;
        VisibleOnScreen: boolean;
        Width: int;
        Alert(): any;
        Child(Index: int): any;
        Click(ClientX: int, ClientY: int, Shift: any): void;
        ClickM(ClientX: int, ClientY: int, Shift: any): void;
        ClickR(ClientX: int, ClientY: int, Shift: any): void;
        Close(): void;
        Confirm(): any;
        DblClick(ClientX: int, ClientY: int, Shift: any): void;
        DblClickM(ClientX: int, ClientY: int, Shift: any): void;
        DblClickR(ClientX: int, ClientY: int, Shift: any): void;
        Drag(ClientX: int, ClientY: int, toX: int, toY: int, Shift: any): void;
        DragM(ClientX: int, ClientY: int, toX: int, toY: int, Shift: any): void;
        DragR(ClientX: int, ClientY: int, toX: int, toY: int, Shift: any): void;
        EvaluateXPath(XPath: string, SearchInFrames: boolean): any;
        Find(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean): any;
        FindAll(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean): any;
        FindAllChildren(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean): any;
        FindChild(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean): any;
        FindChildByXPath(XPath: string, SearchInFrames: boolean): any;
        FindChildEx(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean, Timeout: int): any;
        FindEx(PropNames: any, PropValues: any, Depth: int, RefreshTree: boolean, Timeout: int): any;
        FindId(Id: int, RefreshTree: boolean): any;
        HoverMouse(ClientX: int, ClientY: int): void;
        Keys(Keys: string): void;
        Login(): any;
        MouseWheel(Delta: int, Shift: any): void;
        PagePicture(ClientX: int, ClientY: int, Width: int, Height: int): any;
        Picture(ClientX: int, ClientY: int, Width: int, Height: int, Mouse: boolean): any;
        Prompt(): any;
        QuerySelector(Selector: string): any;
        QuerySelectorAll(Selector: string): any;
        Refresh(): void;
        ScreenToWindow(X: int, Y: int): any;
        SendDebuggerCommand(Command: string, ParamsJSON: string): void;
        ToUrl(URL: string, WaitTime: int): any;
        Wait(WaitTime?: int): string;
        WaitAlert(Timeout: int): any;
        WaitChild(ChildName: string, WaitTime: int): any;
        WaitConfirm(Timeout: int): any;
        WaitLogin(Timeout: int): any;
        WaitPrompt(Timeout: int): any;
        WaitProperty(PropertyName: string, PropertyValue: any, WaitTime: int): boolean;
        WindowToScreen(X: int, Y: int): any;
    }

    /* Project and Project Suite */

    interface Password {
        DecryptedValue: string;
    }

    /**
     * Provides a program interface to the properties of the current TestComplete project,
     * to its test items and to the local variables defined in this project
     */
    interface Project {
        FileName: string;
        Path: string;
        ConfigPath: string;
        TestItems: ProjectTestItems;
        Logs: any;
        Variables: ProjectVariables;
    }

    /**
     * Provides a program interface to the properties of the current TestComplete project suite
     * and to the local variables defined in this project suite.
     */
    interface ProjectSuite {
        FileName: string;
        Path: string;
        ConfigPath: string;
        TestItems: ProjectSuiteTestItems;
        Variables: ProjectSuiteVariables;
    }

    /**
     * IDispatch objects, for example, TestComplete scripting objects (Sys, Log),
     * test objects obtained from applications (Aliases.browser), COM objects, and others.
     */
    interface IDispatch {
        /**
         * Assigns a value to an object’s property given the property name as a string.
         */
        $set(PropertyName: string, Value: any): never;
        /**
         * Assigns a value to an object’s property given the property name as a string.
         */
        $set(PropertyName: string, Param: any, Value: any): never;
        /**
         * Assigns a value to an object’s property given the property name as a string.
         * Last param in `...Params` is a value of property being setted whereas all others are property parameters.
         */
        $set(PropertyName: string, Param1: any, Param2: any, ...Params: any[]): never;
    }

    interface Variables extends IDispatch {
        VariableByName(Name: string): Variant;
        VariableCount: int;
        VariableExists(Name: string): boolean;
        AddVariable(VariableName: string, VariableType: string): void;
        RemoveVariable(VariableName: string): void;
        GetVariableName(Index: int): string;
        GetVariableType(Variable: Variant): string;
        GetVariableDescription(Variable: Variant): string;
        GetVariableCategory(Variable: Variant): string;
        GetVariableDefaultValue(Variable: Variant): Variant;
    }

    /** ProjectSuitVariables and ProjectVariables can be overridden to add your
     * project's variables. For example, you can create myapp.d.ts:
     * declare namespace TestComplete {
     *
     *    interface ProjectSuiteVariables {
            ElementWait: int;
            PageWait: int;
            ElementDepth: int;
        }
     *
     */
    interface ProjectVariables extends Variables { }
    interface ProjectSuiteVariables extends Variables { }

    interface TestItemElement {
        Caption: string;
    }

    interface ProjectSuiteTestItem {
        ProjectName: string;
        ProjectLocation: string;
        Enabled: boolean;
        StopOnError: boolean;
        Timeout: int;
        Description: string;
    }

    interface ProjectTestItem {
        Parent: ProjectTestItem;
        ItemCount: int;
        TestItem(Index: int): ProjectTestItem;
        Name: string;
        Description: string;
        Enabled: boolean;
        Count: int;
        Iteration: int;
        ElementToBeRun: TestItemElement;
        Timeout: int;
        StopOnError: int;
        StopOnException: int;
    }

    interface ProjectSuiteTestItems {
        ItemCount: int;
        TestItem(Index: string): ProjectSuiteTestItem;
        Current: ProjectSuiteTestItem;
    }

    interface ProjectTestItems {
        ItemCount: int;
        TestItem(Index: int): ProjectTestItem;
        Current: ProjectTestItem;
    }

    /*
     * project items: tested apps, stores, i.e. parent items in the project explorer.
     */

    /**
     * Holds one item from the application list.
     * It has methods and properties that can set application attributes, launch or close the application
     */
    interface TestedApp {
        /** Specifies whether TestComplete launches the application automatically when the recording starts. */
        AutorunOnRecording: boolean;
        /** Specifies the number of the application instances to be launched. */
        Count: int;
        /** Returns the date of the application’s executable or batch file. */
        Date: DateTime;
        /** Specifies the file name of the tested application (without path). */
        FileName: string;
        /** Specifies the fully-qualified file name of the tested application. */
        FullFileName: string;
        /** Specifies the name of the tested application in the tested application’s collection. */
        ItemName: string;
        /** Specifies whether the application should be launched. */
        Launch: boolean;
        /** Provides a scripting interface to parameters that are specific for run modes. */
        Params: TestedAppParams;
        /** Specifies the application path. */
        Path: string
        /** Returns the size of the application’s executable or batch file. */
        Size: int;
        /** Returns the time of the tested application’s executable or batch file. */
        Time: DateTime;

        /**
         * Attempts to run one or several instances of the tested application
         * and returns the Process object that corresponds to the last instance that was launched.
         * The application is launched in the mode specified by its Run Mode property
         */
        Run(Count?: int /* -1 */, IgnoreRunning?: boolean /* false */, Timeout?: int /* -1 */): Process; // | AQtime

        /**
         * Attempts to run one or several instances of the tested application under the specified user account
         * and returns the Process object that corresponds to the last instance that was launched.
         */
        RunAs(
            Domain: string,
            UserName: string,
            Password: string,
            WorkFolder?: string,
            Parameters?: string,
            Count?: int,
            IgnoreRunning?: boolean,
            Timeout?: int,
            ): Process;

        /** Attempts to close the application normally and returns whether the attempt succeeded. */
        Close(): boolean;

        /** Attempts to terminate the application and returns whether the attempt succeeded. */
        Terminate(): boolean;
    }

    interface TestedApps {
        Count: int;
        Items: any;

        Add(FullName: string, Parameters: string, Count: int, Launch: boolean, WorkDir: string): int;
        AddBrowser(BrowserType: string, BrowserVersion: string): int;
        AddVirtualBrowser(VirtualBrowserName: string): int;
        AddClickOnceApp(StartupLink: string, ProcessToWait: string): int;
        AddJavaApp(): int;
        AddAIRApp(): int;
        AddAndroidApp(APKFileName: string): int;
        AddiOSApp(IPAFileName: string): int;
        AddWinStoreApp(PackageName: string): int;
        Find(FullName: string): int;
        Delete(Index: any): boolean;
        Clear(): void;
        RunAll(): void;
        CloseAll(): boolean;
        TerminateAll(): boolean;
    }

    interface DBTables {
    }

    interface Files {
        Add(FileName: string, Name: string, ACopyFile: boolean): boolean;
        Remove(Name: string, RemoveFromDisk: boolean): boolean;
        Count(): int;
        NameByIndex(Index: int): string;
        FileNameByIndex(Index: int): string;
        FileNameByName(Name: string): string;
        NameByFileName(FileName: string): string;
        Contains(Name: string): boolean;
        ContainsFile(FileName: string): boolean;
        NamesList(Separator: string): string;
        FileNamesList(Separator: string): string;
        LastError(): string;
        Compare(File1: string, File2: string, HashValue: int, ReportDifference: boolean, MessageType: any): boolean;
        CalculateHashValue(File1: string, File2: string): int;
        CreateEmpty(FileName: string, Name: string): boolean;
        Items(FileName: string): any;
    }

    interface Objects {
        Add(FileName: string, Name: string, ACopyFile: boolean): boolean;
        Remove(Name: string, RemoveFromDisk: boolean): boolean;
        Count(): int;
        NameByIndex(Index: int): string;
        FileNameByIndex(Index: int): string;
        FileNameByName(Name: string): string;
        NameByFileName(FileName: string): string;
        Contains(Name: string): boolean;
        ContainsFile(FileName: string): boolean;
        NamesList(Separator: string): string;
        FileNamesList(Separator: string): string;
        LastError(): string;
        Save(AObject: any, Name: string, PropNames?: string, ExceptedPropName?: string, Recursive?: boolean /* false */, OutputDirectory?: string): boolean;
        Load(AObject: any, Name: string, PropNames: string, ExceptedPropNames: string, Recursive: boolean): boolean;
        Compare(AObject: any, Name: string, ReportDifference?: boolean /* true */, MessageType?: any): boolean;
        Update(AObject: any, Name: string): boolean;
        StoredObject(Name: string): any;
        Items(ObjectName: string): any;
    }

    interface Rect {}

    interface Regions {
        Add(FileName: string, Name: string, ACopyFile: boolean): boolean;
        Remove(Name: string, RemoveFromDisk: boolean): boolean;
        Count(): int;
        NameByIndex(Index: int): string;
        FileNameByIndex(Index: int): string;
        FileNameByName(Name: string): string;
        NameByFileName(FileName: string): string;
        Contains(Name: string): boolean;
        ContainsFile(FileName: string): boolean;
        NamesList(Separator: string): string;
        FileNamesList(Separator: string): string;
        LastError(): string;
        AddPicture(
            Picture: Picture | Element,
            Name: string,
            Mouse: boolean,
            OutputDirectory: string): boolean;
        GetPicture(Item: any): Picture;
        Compare(
            Picture1: Picture | Element,
            Picture2: Picture | Element,
            Transparent?: boolean /* false */,
            Mouse?: boolean /* false */,
            ReportDifference?: boolean /* true */,
            PixelTolerance?: int /* 0 */,
            MessageType?: any /* lmWarning */): boolean;

        /** Searches pixel-by-pixel for one image */
        Find(
            PictureToSearchIn: Picture | Element,
            PictureToSeachFor: Picture | Element,
            Left?: int /* 0 */,
            Top?: int /* 0 */,
            Transparent?: boolean /* false */,
            Mouse?: boolean /* false */,
            PixelTolerance?: int /* 0 */): Rect;

        /** searches pixel-by-pixel for one image.
        The only difference from Find() is the order of the
        PictureToSearchIn and PictureToSearchFor parameters
         */
        FindRegion(
            PictureToSeachFor: Picture | Element,
            PictureToSearchIn: Picture | Element,
            Left?: int,
            Top?: int,
            Transparent?: boolean,
            Mouse?: boolean,
            PixelTolerance?: int): Rect;
        Items(RegionName: string): any;
        CreateRegionInfo(AObject: any, ClientX: int, ClientY: int, Width: int, Height: int, Mouse: boolean): any;
    }

    interface Tables {
    }

    interface WebTesting {
    }

    interface XML {
        CreateXML(Name: string, Document: any, Options: any): boolean;
        CreateCheckpointOptions(): any;
        Contains(Name: string): boolean;
    }

    /** TestComplete Utility objects */

    interface Picture {
        Handle: int;
        Size: any;
        Pixels: int;

        SaveToFile(FileName: string, Configuration: any): boolean;
        LoadFromFile(FileName: string): boolean;
        SaveToClipboard(): void;
        Find(
            PictureForSearch: Picture,
            Left?: int /* 0 */,
            Top?: int /* 0 */,
            Transparent?: boolean /* false */,
            PixelTolerance?: int /* 0 */,
            Mouse?: boolean /* true */,
            ColorTolerance?: int /* 0 */,
            Mask?: Picture): any;
        Compare(
            Picture: Picture,
            Transparent?: boolean /* false */,
            PixelTolerance?: int /* 0 */,
            Mouse?: boolean /* true */,
            ColorTolerance?: int /* 0 */,
            Mask?: Picture): boolean;
        Difference(
            Picture: Picture,
            Transparent?: boolean /* false */,
            PixelTolerance?: int /* 0 */,
            Mouse?: boolean /* true */,
            ColorTolerance?: int /* 0 */,
            Mask?: Picture): Picture;
        GetRect(X: int, Y: int, Width: int, Height: int): any;
        Stretch(Width: int, Height: int, UseHalftones: boolean): void;
        CreatePictureConfiguration(ImageFormat: string): any;
    }

    interface Utils {
        /** Creates empty Picture object */
        readonly Picture: Picture;

        Point: any;
        Rect: any;
        Size: any;
        Timers: any;

        CreateStubObject(): any;
        Enumerator(Collection: any): any;
    }

    interface Consts {
        readonly crlAlways: int;
        readonly crlNever: int;
        readonly crlWhenNotOk: int;

        readonly dmAutomatic: int;
        readonly dmManual: int;

        readonly hsConnected: int;
        readonly hsDisconnected: int;

        readonly imError: int;
        readonly imTerminate: int;
        readonly imUse: int;
        readonly lmConsole: int;
        readonly lmManual: int;
        readonly lmRDC: int;

        readonly ns_CopyingResults: int;
        readonly ns_FastVerifying: int;
        readonly ns_Idle: int;
        readonly ns_Initializing: int;
        readonly ns_Running: int;
        readonly ns_SlaveRunning: int;
        readonly ns_Stopping: int;
        readonly ns_Synchronizing: int;
        readonly ns_Verifying: int;
        readonly ns_Waiting: int;
        readonly ns_WaitingForCriticalSection: int;
        readonly ns_WorkingWithinCriticalSection: int;

        readonly ptMaster: int;
        readonly ptSlave: int;

        readonly ra_TC: int;
        readonly ra_TE: int;

        readonly saClose: int;
        readonly saLogOff: int;
        readonly saNone: int;
        readonly saReboot: int;
        readonly saShutDown: int;

        readonly svNone: int;
        readonly svProject: int;
        readonly svTestItem: int;

        readonly vcmImg: string;
        readonly vcmImgObj: string;
        readonly vcmOff: string;
    }

    interface Indicator {
        Text: string;

        /** Specifies a new text for the indicator. */
        PushText(Value: string): void;

        /** Restores the indicator text */
        PopText(): void;

        /** Removes all of the strings from the stack and reverts the
        indicator text to the default one */
        Clear(): void;

        Show(): void;
        Hide(): void;
    }

    interface LogAttributes {
        BackColor: int;
        Bold: boolean;
        ExtendedMessageAsPlainText: boolean;
        FontColor: int;
        Italic: boolean;
        StrikeOut: boolean;
        Underline: boolean;
    }

    interface CallStackSettings {
        // Enables or disables the call stack tracing for checkpoint messages.
        EnableStackOnCheckpoint: boolean;
        // Enables or disables the call stack tracing for error messages.
        EnableStackOnError: boolean;
        // Enables or disables the call stack tracing for event messages.
        EnableStackOnEvent: boolean;
        // Enables or disables the call stack tracing for messages of the file type.
        EnableStackOnFile: boolean;
        // Enables or disables the call stack tracing for image messages.
        EnableStackOnImage: boolean;
        // Enables or disables the call stack tracing for messages of the file link type.
        EnableStackOnLink: boolean;
        // Enables or disables the call stack tracing for informative messages.
        EnableStackOnMessage: boolean;
        // Enables or disables the call stack tracing for warning messages.
        EnableStackOnWarning: boolean;
    }

    interface Log {
        MsgCount: int;
        WrnCount: int;
        ErrCount: int;
        EvnCount: int;
        ImgCount: int;
        FileCount: int;
        LinkCount: int;
        Path: string;
        Enabled: boolean;
        FolderMsgCount: int;
        FolderWrnCount: int;
        FolderErrCount: int;
        FolderEvnCount: int;
        FolderImgCount: int;
        FolderFileAndLinkCount: int;
        readonly CallStackSettings: CallStackSettings;
        CheckpointCount: int;
        FolderCheckpointCount: int;

        /** Log MessageText detail,
         * and AdditionalInformation to the Additional Information panel  */
        Message(
            MessageText: any,
            AdditionalInformation?: any,
            Priority?: int, /* pmNormal */
            Attrib?: LogAttributes | null,
            Picture?: Picture | Element | string,
            FolderId?: int): void;
        Warning(
            MessageText: any,
            AdditionalInformation?: any,
            Priority?: any, /* pmNormal */
            Attrib?: LogAttributes | null,
            Picture?: Picture | Element | string,
            FolderId?: int): void;

        /**
         * If the Log.CallStackSettings.EnableStackOnError property is True,
         * then the test engine collects information about the execution
         * sequence of tests that led to the call of the Log.Error method
         * and displays this information in the Call Stack page of the test log
         */
        Error(
            MessageText: any,
            AdditionalInformation?: any,
            Priority?: any, /* pmNormal */
            Attrib?: LogAttributes | null,
            Picture?: Picture | Element | string,
            FolderId?: int): void;
        /** Event message is a message next to which TestComplete displays the Event glyph */
        Event(
            MessageText: any,
            AdditionalInformation?: any,
            Priority?: any, /* pmNormal */
            Attrib?: LogAttributes | null,
            Picture?: Picture | Element | string,
            FolderId?: int): void;
        Picture(
            Picture: Picture | Element,
            MessageText?: any,
            AdditionalInformation?: any,
            Priority?: any, /* pmNormal */
            Attrib?: LogAttributes | null,
            FolderId?: int): string;
        File(
            FileName: string,
            MessageText?: any,
            AdditionalInformation?: any,
            Priority?: int, /* pmNormal */
            Attrib?: LogAttributes | null,
            FolderId?: int): string;
        Link(
            Link: string,
            MessageText?: any,
            AdditionalInformation?: any,
            Priority?: int, /* pmNormal */
            Attrib?: LogAttributes | null,
            FolderId?: int): void;
        LockEvents(Count: int): void;
        UnlockEvents(): void;
        CreateFolder(
            MessageText: any,
            AdditionalInformation?: any,
            Priority?: any, /* pmNormal */
            Attrib?: LogAttributes | null,
            OwnerFolderId?: int): int;
        FolderCount(): int;

        /** Adds the specified folder to the folder stack
        and makes it the top folder of the stack */
        PushLogFolder(FolderId: int): void;

        /** Pops the top folder of the folder stack out of that stack */
        PopLogFolder(): void;

        SaveResultsAs(
            FileName: string,
            LogFormat?: int, /* lsXML */
            ExportVisualizerImages?: boolean, /* true */
            LogScope?: int): boolean;
        CreateIssueFromCurrentLog(): boolean;
        CreateNewAttributes(): LogAttributes;
        AppendFolder(
            MessageText: any,
            AdditionalInformation?: any,
            Priority?: any, /* pmNormal */
            Attrib?: LogAttributes | null,
            OwnerFolderId?: int): int;
        Checkpoint(
            MessageText: any,
            AdditionalInformation?: any,
            Priority?: any, /* pmNormal */
            Attrib?: LogAttributes | null,
            Picture?: Picture | Element | string,
            FolderId?: int): void;
        SaveToDisk(): void;
    }

    interface aqConvert {
        IntToStr(I: int): string;
        StrToInt(S: string): int;
        StrToInt64(S: string): bigint;
        FloatToStr(F: number): string;
        StrToFloat(S: string): number;
        VarToBool(V: Variant): boolean;
        VarToFloat(V: Variant): number;
        VarToInt(V: Variant): int;
        VarToStr(V: Variant): string;
        DateTimeToStr(D: DateTime): string;
        TimeIntervalToStr(Interval: any): string;
        DateTimeToFormatStr(D: DateTime, FormatStr: string): string;
        StrToDateTime(S: string): any;
        StrToDate(S: string): any;
        StrToTime(S: string): any;
        CurrencyToStr(C: any): string;
        StrToCurrency(S: string): any;
        CurrencyToFormatStr(
            C: any, iNumDigits: int, iLncLead: int, iUseParens: int, iGroup: int): string;
    }

    interface DateTime {
    }

    interface aqDateTime {
        /**
         * Use the aqDateTime.Now method to get the current date and time.
         * To get only the current date or only the current time, use the
         * Today and Time methods respectively.
         */
        Now(): DateTime;
        SetDateElements(Year: int, Month: int, Day: int): DateTime;
        SetTimeElements(Hour: int, Min: int, Sec: int): DateTime;
        Time(): DateTime;
        GetDayOfWeek(InputDate: DateTime): int;
        SetDateTimeElements(
            Year: int, Month: int, Day: int, Hour: int, Min: int, Sec: int): DateTime;
        IsLeapYear(Year: int): boolean;
        GetDayOfYear(InputDate: DateTime): int;
        GetDay(InputDate: DateTime): int;
        GetHours(InputDate: DateTime): int;
        GetYear(InputDate: DateTime): int;
        GetMinutes(InputDate: DateTime): int;
        GetMonth(InputDate: DateTime): int;
        GetSeconds(InputDate: DateTime): int;
        Today(): DateTime;
        AddTime(InputDate: DateTime, Days: int, Hours: int, Minutes: int, Seconds: int): DateTime;
        TimeInterval(InputTime1: DateTime, InputTime2: DateTime): DateTime;
        /**
         * -1 if Date1 is earlier than Date2
         * 0 if dates equal
         * 1 if Date1 is later than Date2
        */
        Compare(Date1: DateTime, DateTime: DateTime): int;
        AddMinutes(InputDate: DateTime, Minutes: int): DateTime;
        AddHours(InputDate: DateTime, Hours: int): DateTime;
        AddSeconds(InputDate: DateTime, Seconds: int): DateTime;
        AddDays(InputDate: DateTime, Days: int): DateTime;
        AddMonths(InputDate: DateTime, Months: int): DateTime;
        SetSystemDateTime(NewDateTime: DateTime): boolean;
    }

    interface aqEnvironment {
        LanguageForNonUnicodePrograms: string;
        GetWinVersionBuild(): int;
        GetWinMajorVersion(): int;
        GetWinMinorVersion(): int;
        GetWinAdditionalInfo(): string;
        GetWinPlatform(): int;
        SetKeyboardLayout(ProcessId: int, Locale: string): boolean;
        GetKeyboardLayout(WindowHandle: int): string;
        IsLanguageSupported(Locale: int): boolean;
        IsPluginInstalled(PluginName: string): boolean;
        IsScriptExtensionInstalled(
            PluginName: string, PluginAuthor: string, PluginVersion: string): boolean;
        GetEnvironmentVariable(VarName: string, Is64bitProcess?: boolean): string;
        RebootAndContinue(
            ScriptProcName: string,
            Password: string,
            UserName: string,
            Domain: string): boolean;
        SetLocaleInfo(Locale: int, Type: int, Data: string): boolean;
        GetLocaleInfo(Locale: int, Type: int): string;
    }

    interface aqFile {
        readonly faWrite: int; /* 10 */
        readonly faRead: int; /* 11 */
        readonly faReadWrite: int; /* 12 */

        readonly ctANSI: int; /* 20 */
        readonly ctUnicode: int; /* 21 */ // UTF-16
        readonly ctUTF8: int; /* 22 */

        GetCreationTime(PathToFile: string): any;
        GetLastAccessTime(PathToFile: string): any;
        GetLastWriteTime(PathToFile: string): any;
        GetSize(PathToFile: string): int;
        Copy(
            PathToExistingFile: string,
            PathToNewFile: string,
            RenameOnCollision?: boolean /* true */): boolean;
        Delete(PathToFile: string): boolean;
        Create(PathToFile: string): int;
        Exists(Path: string): boolean;
        Rename(
            OldPath: string,
            NewPath: string,
            RenameOnCollision?: boolean /* true */): boolean;
        Move(
            PathToExistingFile: string,
            PathToNewFile: string,
            RenameOnCollision?: boolean /* true */): boolean;
        Compare(PathToFile1: string, PathToFile2: string): boolean;
        SetCreationTime(Path: string, Time: any): boolean;
        SetLastAccessTime(Path: string, Time: any): boolean;
        SetLastWriteTime(Path: string, Time: any): boolean;
        GetFileAttributes(PathToFile: string): int;
        SetFileAttributes(Path: string, fAttr: int): int;
        OpenBinaryFile(Path: string, FileAccess: int, OverwriteOrCreate: boolean): any;
        OpenTextFile(
            Path: string,
            FileAccess: int,
            TextCodingType: int,
            OverwriteOrCreate?: boolean /* false */): aqTextFile;
        ReadWholeTextFile(Path: string, TextCodingType: int): string;
        WriteToTextFile(
            Path: string,
            String: string,
            TextCodingType: int,
            OverwriteOrCreate?: boolean /* false */): boolean;
    }

    interface aqFileSystem {
        Drives: any;

        readonly fattrSet: int;
        readonly fattrInvert: int;
        readonly fattrFree: int;

        readonly faReadOnly: int;
        readonly faHidden: int;
        readonly faSystem: int;
        readonly faDirectory: int;
        readonly faArchive: int;
        readonly faDevice: int;
        readonly faNormal: int;
        readonly faTemporary: int;
        readonly faSparseFile: int;
        readonly faReparsePoint: int;
        readonly faCompressed: int;
        readonly faOffline: int;
        readonly faNotContentIndexed: int;
        readonly faEncrypted: int;
        readonly faVirtual: int;

        CreateFolder(Path: string): int;
        DeleteFolder(Path: string, RemoveNonEmpty?: boolean /* false */): boolean;
        GetCurrentFolder(): string;
        SetCurrentFolder(DirStr: string): boolean;
        DeleteFile(PathToFile: string): boolean;
        MoveFile(
            PathToExistingFile: string,
            PathToNewFile: string,
            RenameOnCollision?: boolean /* true */): boolean;

        /** Copy one or several files to a new location */
        CopyFile(
            PathToExistingFile: string,
            PathToNewFile: string,
            RenameOnCollision?: boolean /* true */): boolean;
        GetShortPathName(longPath: string): string;
        Exists(Path: string): boolean;
        MoveFolder(
            Source: string,
            Destination: string,
            RenameOnCollision?: boolean /* true */): boolean;

        /** Copies the specified folder(s) to another location. */
        CopyFolder(
            Source: string,
            Destination: string,
            RenameOnCollision?: boolean /* true */): boolean;
        GetFileName(PathToFile: string): string;
        GetFileNameWithoutExtension(PathToFile: string): string;
        IncludeTrailingBackSlash(PathToFolder: string): string;
        ExcludeTrailingBackSlash(PathToFolder: string): string;
        GetRelativePath(CurrentFolder: string, AbsoluteFileName: string): string;
        GetFileDrive(PathToFile: string): string;
        ExpandUNCFileName(InPath: string): string;
        RenameFile(
            OldPath: string,
            NewPath: string,
            RenameOnCollision?: boolean /* true */): boolean;
        RenameFolder(OldPath: string, NewPath: string): boolean;
        GetFileFolder(PathToFile: string): string;
        GetFileExtension(PathToFile: string): string;
        ExpandFileName(InPath: string): string;
        FindFiles(
            Path: string,
            SearchPattern: string,
            SearchInSubDirs?: boolean /* false */): ObjectIterator<aqFileInfo>;
        FindFolders(
            Path: string,
            SearchPattern: string,
            SearchInSubDirs?: boolean /* false */): ObjectIterator<aqFolderInfo>;
        GetFileInfo(Path: string): any;
        GetFolderInfo(Path: string): any;
        GetDriveInfo(Drive: string): any;
        ChangeAttributes(Path: string, Attribute: int, Action: int): int;
        CheckAttributes(Path: string, Attribute: int): boolean;
        MapNetworkDrive(
            LocalName: string,
            Path: string,
            User: string,
            Password: string,
            Remember: boolean): int;
        DisconnectNetworkDrive(Name: string, Force: boolean, Remember: boolean): int;
    }

    // T == aqFileInfo | aqFolderInfo | aqDriveInfo |
    //      aqObjEvent | aqObjField | aqObjMethod | aqObjProperty
    interface ObjectIterator<T> {
        readonly Count: int;

        HasNext(): boolean;
        Next(): T;
        Reset(): void;
        Skip(SkipCount: int): T;
        Item(Index: int): T;
    }

    interface aqObject {
        readonly varEmpty: int; /* 0x0000 */
        readonly varNull: int; /* 0x0001 */
        readonly varSmallInt: int; /* 0x0002 */
        readonly varInteger: int; /* 0x0003 */
        readonly varSingle: int; /* 0x0004 */
        readonly varDouble: int; /* 0x0005 */
        readonly varCurrency: int; /* 0x0006 */
        readonly varDate: int; /* 0x0007 */
        readonly varOleStr: int; /* 0x0008 */
        readonly varDispatch: int; /* 0x0009 */
        readonly varError: int; /* 0x000A */
        readonly varBoolean: int; /* 0x000B */
        readonly varVariant: int; /* 0x000C */
        readonly varUnknown: int; /* 0x000D */
        readonly varShortInt: int; /* 0x0010 */
        readonly varByte: int; /* 0x0011 */
        readonly varWord: int; /* 0x0012 */
        readonly varLongWord: int; /* 0x0013 */
        readonly varInt64: int; /* 0x0014 */
        readonly varStrArg: int; /* 0x0048 */
        readonly varString: int; /* 0x0100 */
        readonly varAny: int; /* 0x0101 */
        readonly varArray: int; /* 0x2000 */
        readonly varByRef: int; /* 0x4000 */

        EmptyVariant: any;
        EmptyObject: any;

        GetVarType(VarParam: any): int;
        IsSupported(IObject: any, MemberName: string): boolean;
        GetPropertyValue(IObject: any, PropertyName: string): any;
        SetPropertyValue(IObject: any, PropertyName: string, Value: any): any;
        CallMethod(IObject: any, MethodName: string): any;
        RaiseEvent(IObject: any, EventName: string): boolean;

        /** Lists all the properties of the desired object */
        GetProperties(
            SourceObject: any,
            ShowHidden?: boolean /* false */): ObjectIterator<aqObjProperty>;
        GetFields(SourceObject: any, ShowHidden?: boolean): ObjectIterator<aqObjField>;
        GetMethods(SourceObject: any, ShowHidden?: boolean): ObjectIterator<aqObjEvent>;
        GetEvents(SourceObject: any, ShowHidden?: boolean): ObjectIterator<aqObjEvent>;
        CompareProperty(
            Property: any,
            Condition: int,
            Value: any,
            CaseSensitive?: boolean /* true */,
            MessageType?: int /* lmWarning */): boolean;
        SaveObjectSnapshotToFile(
            AObject: any,
            FileName: string,
            SaveRecursive?: boolean /* false */,
            SaveAllProperties?: boolean /* false */,
            AdditionalProperties?: string,
            SaveFields?: boolean /* false */,
            SaveMethods?: boolean /* false */,
            Depth?: int /* 2 */): boolean;
        CheckProperty(
            Object: any,
            Property: string,
            Condition: int,
            Value: any,
            CaseSensitive?: boolean /* true */): boolean;
    }

    interface aqUtils {
        Delay(ms: int, Str?: string): void;
        Beep(Freq: int, Duration: int): void;
        SysErrorMessage(ErrorCode: int): string;
        Win32Check(ExitCode: boolean): boolean;
        IsValidIdent(Ident: string): boolean;
        GetCOMServerPath(Server: string, Is64bit: boolean): string;
    }

    /** Lets to perform various operations on string values */
    interface aqString {
        /** Leading spaces will be trimmed. Value = 1 */
        readonly stLeading: int;
        /** Trailing spaces will be trimmed. Value = 2 */
        readonly stTrailing: int;
        /** Both leading and trailing spaces will be trimmed. Value = 3 */
        readonly stAll: int;

        /** Specifies a character used to separate individual values in a list. */
        QuoteSymbol: string;
        /** Specifies a symbol used as a quotation mark. */
        ListSeparator: string;

        /** Removes spaces and control characters from the specified string.
         * `Space` is one of the `aqString.stLeading`, `aqString.stTrailing`, `aqString.stAll` */
        Trim(InputString: string, Space: int): string;
        /** Concatenates two specified strings. */
        Concat(String1: string, String2: string): string;
        /** Encloses the specified string in quotes. */
        Quote(InputString: string): string;
        /** Converts a quoted string to an unquoted string. */
        Unquote(InputString: string): string;
        /** Returns the number of characters in a string. */
        GetLength(SourceString: string): int;
        /** Converts the specified string to upper case. */
        ToUpper(InputString: string): string;
        /** Converts the specified string to lower case. */
        ToLower(InputString: string): string;
        /** Inserts one string to another at the specified position. */
        Insert(InputString: string, InsertString: string, InsertPosition: int): string;
        /** Retrieves a substring from the input string. */
        SubString(InputString: string, StartPosition: int, Length: int): string;
        /** Retrieves a single character from the input string. */
        GetChar(InputString: string, Position: int): string;
        /** Removes a number of characters from the input string. */
        Remove(InputString: string, StartPosition: int, Length: int): string;
        /** Searches for a substring within the given string. */
        Find(
            InputString: string,
            SubString: string,
            StartPosition?: int,
            CaseSensitive?: boolean /* true */): int;
        /** Searches for the last occurrence of the substring within the given string. */
        FindLast(
            InputString: string,
            SubString: string,
            CaseSensitive?: boolean /* true */): int;
        /** Compares two specified strings. */
        Compare(String1: string, String2: string, CaseSensitive: boolean): int;
        /** Replaces all the occurrences of one substring with another substring. */
        Replace(
            InputString: string,
            StringToReplace: string,
            SubsString: string,
            CaseSensitive?: boolean /* true */): string;
        /** Checks whether a string contains a substring that matches the specified regular expression. */
        StrMatches(ExprStr: string, Str: string): boolean;
        /** Returns the number of items in the string list. */
        GetListLength(List: string): int;
        /** Returns an individual item from the list passed through the input string. */
        GetListItem(List: string, Index: int): string;
        /** Adds a new item to a string list. */
        AddListItem(List: string, NewItem: string, Index: int): string;
        /** Removes an item with the given index from a string list. */
        DeleteListItem(List: string, Index: int): string;
        /** Changes the value of the string list item with the given index. */
        ChangeListItem(List: string, NewItem: string, Index: int): string;
        /** Generates a formatted string. */
        Format(Format: string): string;
    }

    interface aqPerformance {
        Value(CounterName: string): int;
        Start(CounterName: string, WarnIfExists?: boolean): void;
        Check(
            MaxExecTime: int,
            OperationName?: string /* MaxExecTime */,
            CounterName?: string /* DefaultCounter */): boolean;
    }

    enum MessageType {
        lmNone = 0,
        lmMessage = 1,
        lmWarning = 2,
        lmError = 3,
    }

    enum Priority {
        pmLowest = 100,
        pmLower = 200,
        pmNormal = 300,
        pmHigher = 400,
        pmHighest = 500,
    }

    enum CompareCondition {
        cmpEqual = 0,
        cmpNotEqual = 1,
        cmpGreater = 2,
        cmpLess = 3,
        cmpGreaterOrEqual = 4,
        cmpLessOrEqual = 5,
        cmpContains = 6,
        cmpNotContains = 7,
        cmpStartsWith = 8,
        cmpNotStartsWith = 9,
        cmpEndsWith = 10,
        cmpNotEndsWith = 11,
        cmpMatches = 12,
        cmpNotMatches = 13,
        cmpIn = 14,
        cmpNotIn = 15,
    }

    enum CheckBoxState {
        cbUnchecked = 0,
        cbChecked = 1,
        cbGrayed = 2,
    }

    interface BuiltIn {
        // CheckBox state:
        readonly cbUnchecked: CheckBoxState.cbChecked;
        readonly cbChecked: CheckBoxState.cbUnchecked;
        readonly cbGrayed: CheckBoxState.cbGrayed;

        // Colors:
        readonly cl3DDkShadow: int;
        readonly cl3DLight: int;
        readonly clActiveBorder: int;
        readonly clActiveCaption: int;
        readonly clAppWorkSpace: int;
        readonly clAqua: int;
        readonly clBackground: int;
        readonly clBlack: int;
        readonly clBlue: int;
        readonly clBtnFace: int;
        readonly clBtnHighlight: int;
        readonly clBtnShadow: int;
        readonly clBtnText: int;
        readonly clCaptionText: int;
        readonly clCream: int;
        readonly clDefault: int;
        readonly clDkGray: int;
        readonly clFuchsia: int;
        readonly clGradientActiveCaption: int;
        readonly clGradientInactiveCaption: int;
        readonly clGray: int;
        readonly clGrayText: int;
        readonly clGreen: int;
        readonly clHighlight: int;
        readonly clHighlightText: int;
        readonly clHotLight: int;
        readonly clInactiveBorder: int;
        readonly clInactiveCaption: int;
        readonly clInactiveCaptionText: int;
        readonly clInfoBk: int;
        readonly clInfoText: int;
        readonly clLime: int;
        readonly clLtGray: int;
        readonly clMaroon: int;
        readonly clMedGray: int;
        readonly clMenu: int;
        readonly clMenuBar: int;
        readonly clMenuHighlight: int;
        readonly clMenuText: int;
        readonly clMoneyGreen: int;
        readonly clNavy: int;
        readonly clNone: int;
        readonly clOlive: int;
        readonly clPurple: int;
        readonly clRed: int;
        readonly clScrollBar: int;
        readonly clSilver: int;
        readonly clSkyBlue: int;
        readonly clSystemColor: int;
        readonly clTeal: int;
        readonly clWhite: int;
        readonly clWindow: int;
        readonly clWindowFrame: int;
        readonly clWindowText: int;
        readonly clYellow: int;

        readonly cmpContains: CompareCondition.cmpContains;
        readonly cmpEndsWith: CompareCondition.cmpEndsWith;
        readonly cmpEqual: CompareCondition.cmpEqual;
        readonly cmpGreater: CompareCondition.cmpGreater;
        readonly cmpGreaterOrEqual: CompareCondition.cmpGreaterOrEqual;
        readonly cmpIn: CompareCondition.cmpIn;
        readonly cmpLess: CompareCondition.cmpLess;
        readonly cmpLessOrEqual: CompareCondition.cmpLessOrEqual;
        readonly cmpMatches: CompareCondition.cmpMatches;
        readonly cmpNotContains: CompareCondition.cmpNotContains;
        readonly cmpNotEndsWith: CompareCondition.cmpNotEndsWith;
        readonly cmpNotEqual: CompareCondition.cmpNotEqual;
        readonly cmpNotIn: CompareCondition.cmpNotIn;
        readonly cmpNotMatches: CompareCondition.cmpNotMatches;
        readonly cmpNotStartsWith: CompareCondition.cmpNotStartsWith;
        readonly cmpStartsWith: CompareCondition.cmpStartsWith;

        readonly ctBoolean: int;
        readonly ctDateTime: int;
        readonly ctFloat: int;
        readonly ctHyperlink: int;
        readonly ctImage: int;
        readonly ctInteger: int;
        readonly ctString: int;

        ExtendedColorsCount: int;

        readonly ldtPicture: int;
        readonly ldtTable: int;
        readonly ldtText: int;

        readonly lesCurrentProject: int;
        readonly lesCurrentTestItem: int;
        readonly lesFull: int;

        readonly lmError: int;
        readonly lmMessage: int;
        readonly lmNone: int;
        readonly lmWarning: int;

        readonly lsHTML: int;
        readonly lsMHT: int;
        readonly lsXML: int;
        readonly ltfHTML: int;
        readonly ltfPlain: int;
        readonly ltfURL: int;
        readonly ltfXML: int;

        readonly mbAbort: int;
        readonly mbAbortIgnore: int;
        readonly mbAbortRetryIgnore: int;
        readonly mbAll: int;
        readonly mbCancel: int;
        readonly mbHelp: int;
        readonly mbIgnore: int;
        readonly mbNo: int;
        readonly mbNoToAll: int;
        readonly mbOK: int;
        readonly mbOKCancel: int;
        readonly mbRetry: int;
        readonly mbYes: int;
        readonly mbYesAllNoAllCancel: int;
        readonly mbYesNoCancel: int;
        readonly mbYesToAll: int;

        readonly mrAbort: int;
        readonly mrAll: int;
        readonly mrCancel: int;
        readonly mrIgnore: int;
        readonly mrNo: int;
        readonly mrNone: int;
        readonly mrNoToAll: int;
        readonly mrOk: int;
        readonly mrRetry: int;
        readonly mrYes: int;
        readonly mrYesToAll: int;

        readonly mtConfirmation: int;
        readonly mtCustom: int;
        readonly mtError: int;
        readonly mtInformation: int;
        readonly mtWarning: int;

        // Priority levels:
        readonly pmLowest: Priority.pmLowest;
        readonly pmLower: Priority.pmLower;
        readonly pmNormal: Priority.pmNormal;
        readonly pmHigher: Priority.pmHigher;
        readonly pmHighest: Priority.pmHighest;

        readonly propAccessRead: int;
        readonly propAccessWrite: int;

        StandardColorsCount: int;

        readonly varAny: int;
        readonly varArray: int;
        readonly varBoolean: int;
        readonly varByRef: int;
        readonly varByte: int;
        readonly varCurrency: int;
        readonly varDate: int;
        readonly varDispatch: int;
        readonly varDouble: int;
        readonly varEmpty: int;
        readonly varError: int;
        readonly varInt64: int;
        readonly varInteger: int;
        readonly varLongWord: int;
        readonly varNull: int;
        readonly varOleStr: int;
        readonly varShortInt: int;
        readonly varSingle: int;
        readonly varSmallint: int;
        readonly varStrArg: int;
        readonly varString: int;
        readonly varTypeMask: int;
        readonly varUnknown: int;
        readonly varVariant: int;
        readonly varWord: int;

        CreateVariantArray(Param1: int, Param2: int): any;
        CreateVariantArray2(Param1: int, Param2: int, Param3: int, Param4: int): any;
        CreateVariantArray3(
            Param1: int, Param2: int, Param3: int, Param4: int,
            Param5: int, Param6: int): any;
        GetOrd(Param1: any): any;
        InputBox(Caption: string, Prompt: string, Default: string): string;
        InputQuery(Param1: string, Param2: string, Param3: string): boolean;
        Log(Param1: int): int;
        MessageDlg(Param1: string, Param2: int, Param3: int, Param4: int): int;
        ParamCount(): int;
        ParamStr(Param1: int): string;
        SendMail(
            Param1: string, Param2: string, Param3: string, Param4: string,
            Param5: string, Param6: string, Param7: string): boolean;
        ShowMessage(Param1: string): void;
        VarArrayHighBound(Param1: any, Param2: int): int;
        VarArrayLowBound(Param1: any, Param2: int): int;
        VarArrayRedim(Param1: any, Param2: int): void;
        VarClear(Param1: any): void;
    }

    interface Runner {
        Start(): void;

        /**
         * Use the Stop method to stop the test execution. Unlike Runner.Halt,
         * this method does not post messages to the test log.
         */
        Stop(CurrentTestOnly: boolean): void;
        Halt(ErrorString: string): void;
        CallMethod(ComplexName: string): void;
        CallObjectMethodAsync(Obj: any, MethodName: any): any;
        SetObjectPropertyAsync(Obj: any, PropertyName: any): any;

        /** Pauses the test execution and activates the debugger. */
        Pause(): void;
    }

    interface slPacker {
        Pack(FileList: string, ArchiveRootPath: string, ArchivePath: string): boolean;
        PackCurrentTest(ArchivePath: string): boolean;
        GetFileListFromFolder(FolderName: string): string;
    }

    interface DDTDriver {
        readonly ColumnCount: int;
        readonly ColumnName: string;
        readonly Name: string;

        Value(Index: any): any;
        DriveMethod(Name: string): void;
        EOF(): boolean;
        First(): void;
        Next(): void;
    }

    interface ADODriver extends DDTDriver { }

    interface DDT {
        /** Returns the last created driver. */
        readonly CurrentDriver: DDTDriver;

        /** Returns a driver specified by its name. */
        DriverByName(Name: string): DDTDriver;

        /** Creates a driver for a database table or recordset
         that can be accessed via Microsoft's ADO DB. */
        ADODriver(ConnectionString: string, TableName: string): ADODriver;

        /** Closes the driver’s connection to data and frees all
        resources associated with the driver. */
        CloseDriver(Name: string): void;

        /** Creates a driver for a comma-value separated file. */
        CSVDriver(FileName: string): DDTDriver;

        /** Create a DDT driver for a sheet of an Excel document */
        ExcelDriver(FileName: string, Sheet: string, UseACEDriver?: boolean /* false */): DDTDriver;
    }

    interface JavaClasses {
        tests: {
            EmailService: {
                acceptInvite(): void;
                clearOldMessages(): void;
                checkIssueAssignedNotification(): void;
                checkIssueWatcherAddedNotification(): void;
                checkIssueUpdatedNotification(): void;
                checkNewCommentNotification(): void;
                checkIssueReport(): void;
                checkIssuesHistory(): void;
                checkReceiveMonthlyIssueReports(): void;
            }
        }
    }

    interface Section {
        readonly Name: string;
        readonly OptionCount: int;
        readonly SectionCount: int;

        GetOption(OptionName: string, DefaultValue: any): any;
        SetOption(OptionName: string, NewValue: any): void;
    }

    interface Storages {
        Registry(Key: string, RootKey: int, RegistryType: Win32API.Registry, ReadOnly?: boolean /* false */): Section;
    }

    /**
     * Modificator keys values.
     * NOTE: no actual values given in TestComplete help book. Adding ones to comply with TypeScript checks */
    enum ShiftKey {
        skShift = 0, // shift key is pressed
        skAlt = 1, // alt key is pressed
        skCtrl = 2, // ctrl key is pressed
        skNoShift = 3, // neither ctrl, shift nor alt key pressed
    }

    /** Object that represent single test case */
    interface TestCase {
        /** Name of the test case */
        readonly Name: string;
    }

    /** Allows marking arbitrary parts of your script code as test cases */
    interface aqTestCase {
        /** Information on the test case that is currently running */
        readonly CurrentTestCase: TestCase;

        /**
         * Sets the starting point for the code fragment you want to include
         * in the Summary report as a separate test case or whose results
         * you want to send to an external test management system, or both.
         */
        Begin(TestName: string, ExternalTestCase?: string): void;

        /**
         * Sets the ending point for the code fragment marked as a separate
         * test case by the Begin method.
         */
        End(): void;
    }

    /** Provides programming access to text files.
     * The objects of this type are returned by the OpenTextFile method. */
    interface aqTextFile {
        Cursor: int;
        Column: int;
        Line: int;
        LinesCount: int;

        Close(): boolean;
        IsEndOfFile(): boolean;
        ReadLine(): string;
        ReadAll(): string;
        Write(Value: string): boolean;
        WriteLine(Value: string): boolean;
    }

    /** Provides a scripting interface to object properties that you can see on the Properties page of the Object Browser panel.
     * To obtain the aqObjProperty object in scripts, use the GetProperties method of the aqObject object. */
    interface aqObjProperty {
        /** Integer value that corresponds to the access type of the property
        that the given aqObjPropertyObj object provides information about */
        readonly Access: int;

        /** Returns the property name. */
        readonly Name: String;

        /** Total number of parameters of the property that the given
        aqObjPropertyObj object provides information about */
        readonly ParamCount: int;

        /** Specifies the property value. */
        readonly Value: any;

        /** Returns the data type of the property value. */
        readonly ValueType: any;

        /** Returns the name of the property parameter specified by its index */
        ParamName(Index: int): string;

        /** Type of the property parameter specified by its index */
        ParamType(Index: int): int;
    }

    interface TestedAppBaseParams {
        /** Specifies a string of command-line arguments to be passed to the tested application on startup. */
        CommandLineParameters: string,

        /** Returns the name of the run mode that correspond to the parameters. */
        Name: string,

        /** Specifies a working folder for the tested application. */
        WorkFolder: string,

        /** Activates an appropriate run mode and applies parameters to the tested application. */
        Activate(): never,

        /** Specifies whether a parameter collection is currently active (that is, whether an appropriate run mode is selected). */
        IsActive(): boolean,
    }

    interface TestedAppSimpleParams extends TestedAppBaseParams {}
    interface TestedAppDebugParams extends TestedAppBaseParams {}

    /** A tested application can be run in RunAs mode.
     * In this mode, TestComplete launches the tested application under a user account
     * that differs from the account that TestComplete is running under. */
    interface TestedAppRunAsParams extends TestedAppBaseParams {
        /** Specifies the domain or computer that the user account specified by the UserName property belongs. */
        Domain: string,

        /** Specifies the password of the desired user account. */
        Password: string,

        /** Specifies the password of the desired user account. */
        UserName: string,
    }
    interface TestedAppProfileParams extends TestedAppBaseParams {}

    /**
     * Provides a scripting interface to parameters of applications defined in your project.
     * It contains properties that let your work with parameters of tested AIR, Java, ClickOnce and Web applications,
     * as well as with parameters of applications run in Simple, RunAs, Debug and Profile run modes.
     * The object also provides an interface to the parameters of the currently selected mode.
     */
    interface TestedAppParams {
        /** Provides a scripting interface to the parameters of the currently selected run mode. */
        ActiveParams: TestedAppSimpleParams
                    | TestedAppDebugParams
                    | TestedAppProfileParams
                    | TestedAppRunAsParams;

        /** Provides a scripting interface to Debug run mode parameters. */
        DebugParams: TestedAppDebugParams,

        /** Provides a scripting interface to parameters of the RunAs run mode. */
        RunAsParams: TestedAppRunAsParams,

        /** Provides a scripting interface to parameters of the Simple run mode. */
        SimpleParams: TestedAppSimpleParams,
    }

    interface AppDomain {
        /** Returns the number of child objects of the given object.  */
        readonly ChildCount: int;
        /** Returns an AppDomain object corresponding to the application
        domain that contains the given object.  */
        readonly ClrAppDomain: AppDomain;
        /** Returns the short class name of an object.  */
        readonly ClrClassName: string;
        /** Returns the full class name (including the namespace) of an object.  */
        readonly ClrFullClassName: string;
        /** Returns the .NET runtime version of the domain.  */
        readonly ClrVersion: string;
        /** Provides access to all .NET namespaces, classes and class members
        defined in .NET assemblies loaded into the domain.  */
        readonly dotNET: any;
        /** Tells you whether an object exists in the system.  */
        readonly Exists: boolean;
        /** Specifies the full name that uniquely identifies the object in TestComplete.  */
        readonly FullName: string;
        /** Returns the object’s identifier.  */
        readonly Id: int;
        /** Returns the custom name that is mapped to the original object name
        and is used to address the object in scripts.  */
        readonly MappedName: string;
        /** Returns the object name.  */
        readonly Name: string;
        /** Returns a child object stored in the Name Mapping repository (by its index). */
        readonly NamedChild: int;
        /** Returns the number of child objects of an object stored in the Name Mapping repository. */
        readonly NamedChildCount: int;
        /** Returns the description of an object stored in the Name Mapping repository. */
        readonly NodeDescription: string;
        /** Returns the parent object of the given object.  */
        readonly Parent: RuntimeObject;
    }

    interface Process extends RuntimeObject {
        AppDomain(Name: string, ClrVersion?: string): AppDomain;
        Form(Caption: string): Form;

        /** Closes the specified application process by sending
        the WM_SYSCOMMAND message with the SC_CLOSE parameter to the main window of the process. */
        Close(WaitTimeOut?: int /* 60000 */): void;

        /** Tries to terminate all instances of the given application that were launched by TestComplete */
        Terminate(): boolean;
    }

    enum ObjectSearchStrategyType {
        searchDepthFirst = "Depth-first",
        searchBreadthFirst = "Breadth-first",
    }

    interface Options {
        readonly Run: {
            /** Use case-sensitive parameters option.  */
            readonly CaseSensitive: boolean;

            /** Click on focused control option in the On Unexpected Window group. */
            readonly ClickOnButton: boolean;

            /** Delay between events option. */
            Delay: int;

            /** Show a notification when an unhandled script exception occurs option */
            readonly ErrorDialog: boolean;

            /** Ignore overlapping window option in the On Overlapping Window group */
            readonly IgnoreOverWindow: boolean

            ObjectSearchStrategy: ObjectSearchStrategyType;

            /** Auto-wait timeout option. */
            Timeout: int;
        }
    }

    interface aqFileInfo { }
    interface aqFolderInfo { }
    interface aqObjField { }
    interface aqObjEvent { }
    interface aqObjMethod { }
}

/**
 * Declarations
 * These allow you to use TestComplete keywords in TypeScript, e.g.
 *     var today = aqDateTime.Today()
 */

// declare const Aliases: TestComplete.Aliases
declare const aqConvert: TestComplete.aqConvert;
declare const aqDateTime: TestComplete.aqDateTime;
declare const aqEnvironment: TestComplete.aqEnvironment;
declare const aqFile: TestComplete.aqFile;
declare const aqFileSystem: TestComplete.aqFileSystem;
declare const aqObject: TestComplete.aqObject;
declare const aqPerformance: TestComplete.aqPerformance;
declare const aqString: TestComplete.aqString;
declare const aqTestCase: TestComplete.aqTestCase;
declare const aqUtils: TestComplete.aqUtils;
declare const BuiltIn: TestComplete.BuiltIn;
declare const Browsers: TestComplete.Browsers;
declare const Consts: TestComplete.Consts;
declare const DDT: TestComplete.DDT;
declare const Indicator: TestComplete.Indicator;
declare const JavaClasses: TestComplete.JavaClasses;
declare const Log: TestComplete.Log;
declare const NameMapping: TestComplete.NameMapping;
declare const Options: TestComplete.Options;
// declare const Project: TestComplete.Project;
declare const ProjectSuite: TestComplete.ProjectSuite;
declare const Runner: TestComplete.Runner;
declare const slPacker: TestComplete.slPacker;
declare const Storages: TestComplete.Storages;
declare const Sys: TestComplete.Sys;
// declare const TestedApps: TestComplete.TestedApps;
declare const Utils: TestComplete.Utils;
declare const DBTables: TestComplete.DBTables;
declare const Files: TestComplete.Files;
declare const Objects: TestComplete.Objects;
declare const Regions: TestComplete.Regions;
declare const Tables: TestComplete.Tables;
declare const WebTesting: TestComplete.WebTesting;
declare const XML: TestComplete.XML;

declare function Delay(count: int): void;
declare function CheckProperty(
    Object: TestComplete.RuntimeObject,
    Property: string,
    Condition: int,
    Value: any,
    CaseSensitive?: boolean /* true */): boolean;


/**
 * Use the getActiveXObject function to get a reference to an OLE object
 * by its name and the name of the machine where it is running.
 * To specify the OLE server running on a local machine, do not specify the MachineName parameter.
 */
declare function getActiveXObject(OleObject: string, MachineName?: string): any;
