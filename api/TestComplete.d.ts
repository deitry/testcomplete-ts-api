/**
 * Declaration for TestComplete internal types
 * - With the help of https://github.com/falafelsoftware/testcomplete-typescript
 * - Allows intellisense in external editors such as VS Code
 */

// NOTE: without `& {}` `int` reveals in hovers as `number`
/** Synthetic type for integer numbers. */
declare type int = number & {};
/** Synthetic type for floating-point numbers */
declare type float = number & {};
/** Synthetic type for double precision floating-point numbers */
declare type double = number & {};

declare namespace TestComplete {

    type Variant = string | int | double | DateTime;

    /* Generic abstractions */

    /**
     * Common properties for all processes, windows, controls and onscreen objects.
     */
    interface RuntimeObject {
        readonly Name: string;

        /** The Exists property tells whether a given object still exists in the system.
         * If it does not exist, Exists is `false`; else, `true`. */
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
         * @param {int} [WaitTime = -1] The number of milliseconds to wait for the specified property value.
         * If WaitTime is 0, the method does not wait and returns immediately.
         * If WaitTime is -1, the waiting time is specified by the Auto-wait timeout project property.
         *
         * @returns If the property achieves the specified value within the timeout, the method returns `true`.
         * Otherwise, if the timeout elapses before the property achieves the specified value, the method returns `false`.
         * Also, `false` if the object does not have the specified property.
         */
        WaitProperty(PropertyName: string, PropertyValue: Variant, WaitTime?: int): boolean;
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
        Click(ClientX?: int, ClientY?: int, Shift?: ShiftStateEnum /** skNoShift */): void;
        DblClick(ClientX?: int, ClientY?: int, Shift?: ShiftStateEnum /* skNoShift */): void;
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

    /**
     * The OSInfo object holds the operating system information: the operating system name, version and edition,
     * service pack version, .NET Framework count and versions, system folder paths and so on.
     */
    interface OSInfo {
        /** The edition of the operating system: Professional, Enterprise, Server and so on. */
        Edition: string;
        /** The full name of the operating system. It includes the company name, the operating system name and information about the installed service packs. */
        FullName: string;
        /** Indicates whether you are working under an operating system that includes Windows Media Center. */
        MediaCenter: boolean;
        /** The short name of the operating system. */
        Name: string;
        /** The number of different versions of Microsoft .NET Framework common language runtimes (CLRs) installed on the local computer. */
        NetCoreCount: int;
        /** Returns the version of a .NET Framework CLR by its index. */
        NetCoreVersion: string;
        /** Indicates whether TestComplete is running in a remote session. */
        RemoteSession: boolean;
        /** The version of the installed service pack. */
        ServicePackVersion: string;
        /** Returns the path to the Windows system folder. */
        SystemDirectory: string;
        /** Indicates whether TestComplete is running on the Windows XP Tablet PC Edition operating system. */
        TabletPC: boolean;
        /** Returns the path to the Windows temporary folder. */
        TempDirectory: string;
        /** Operating system version. */
        Version: string;
        /** Indicates whether TestComplete is running on a Virtual PC virtual machine. */
        VirtualPC: boolean;
        /** Indicates whether TestComplete is running on a VMware virtual machine. */
        VMWare: boolean;
        /** Indicates whether TestComplete is running on a 64-bit version of the Windows operating system. */
        Windows64bit: boolean;
        /** The directory in which the operating system is installed. */
        WindowsDirectory: string;
    }

    /**
     * The Sys object "represents"”" the system in your tests -- everything outside TestComplete.
     * Its methods and properties allow you to control test execution, interact with active windows, simulate key presses, and so on.
     */
    interface Sys extends Element, IDispatch {
        /** Returns the number of child objects of the given object. */
        ChildCount: int;
        /** Puts text or images to the clipboard or retrieves the clipboard data. */
        Clipboard: Variant;
        /** Stores the model and frequency of the computer's processor(s). */
        CPU: string;
        /** Returns the number of CPUs installed on your computer. */
        CPUCount: int;
        /** Returns the current approximate percentage of CPU time used by the operating system and all running processes.  */
        CPUUsage: int;
        /** Returns the desktop as the Desktop object. */
        readonly Desktop: Desktop;
        /** Returns the name of the domain to which the current computer belongs. */
        DomainName: string;
        /** Tells you whether an object exists in the system. */
        Exists: boolean;
        /** Specifies the full name that uniquely identifies the object in TestComplete. */
        FullName: string;
        /** The name of the current computer. */
        HostName: string;
        /** Returns the object's identifier. */
        Id: int;
        /** Returns the custom name that is mapped to the original object name and is used to address the object in scripts. */
        MappedName: string;
        /** Returns the integral size of memory occupied by the processes which are children of the sys object. */
        MemUsage: int;
        /** Returns the object name. */
        Name: string;
        /** Returns a child object stored in the Name Mapping repository (by its index). */
        NamedChild(Index: int): Object;
        /** Returns the number of child objects of an object stored in the Name Mapping repository. */
        NamedChildCount: int;
        /** Returns the information on the currently installed operating system as OSInfo object. */
        OSInfo: OSInfo;
        /** Returns the parent object of the given object. */
        Parent: Element;
        /** The name of the user under whose account you are currently working. */
        UserName: string;

        /** Returns an OLE server by its name and the name of the machine on which it is running.
         * To specify the OLE server running on the local machine, do not specify the MachineName parameter.
         * NOTE: You cannot use TestComplete as a client application for in-process OLE objects, the bitness of which is different than the bitness of TestComplete.
         * NOTE: TestComplete does not release instances of OLE objects created via the Sys.OleObject method at design time,
         * that is, when this method is used to explore the object in the Object Browser or to get code completion for the object's methods and properties.
         * For example, creating a Word.Application object launches Microsoft Word and it keeps running after you have finished working with the object in the Object Browser or the Code Editor.
         * To release the used OLE object instance, you need to manually close the process that the object is running in or to execute the script code that would release that object.
         * @param OleObject ProgID or CLSID of the OLE server you want to access.
         * For example, "Word.Application" or "{000209FF-0000-0000-C000-000000000046}".
         * @param MachineName Specifies the name of the machine on which the specified OLE server is running.
         * To get the OLE server running on the local machine, leave the value of this parameter empty. */
        OleObject(OleObject: string, MachineName?: string): Ole.OleObject;
        /**
         * Lets you access a running web browser application.
         * You can use it to access a specific web browser, for example, Sys.Browser("iexplore"), or an arbitrary browser as in Sys.Browser()
         * @param BrowserName Browser process name. Possible values are:
         * - `*`: Default. The asterisk wildcard matches the currently used browser, that is,
         * the one that was launched previously using the Run Browser keyword test operation or the BrowserInfo.Run scripting method.
         * - `iexplore` - Microsoft Internet Explorer
         * - `edge` - Microsoft Edge
         * - `firefox` - Mozilla Firefox
         * - `chrome` - Google Chrome
         * @param BrowserIndex The browser process index (1-based) among other browser processes with the same name.
         */
        Browser(BrowserName?: "*" | "iexplore" | "edge" | "firefox" | "chrome", BrowserIndex?: int): BrowserProcess;
        BrowserWindow(Index: int): Window;
        /** Returns a child object by its index. */
        Child(Index: int): RuntimeObject;

        /** Searches for a child object that has the specified property values. */
        Find(
            PropNames: Array<string>,
            PropValues: Array<any>,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): any;
        /** Returns an array of child objects that have the specified property values. */
        FindAll(
            PropNames: Array<string>,
            PropValues: Array<any>,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): any;
        /** Returns an array of child objects that have the specified property values. */
        FindAllChildren(
            PropNames: Array<string> | string,
            PropValues: Array<any> | any,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */): any;

        /** Searches for a child object that has the specified property values. */
        FindChild(
            PropNames: Array<string>,
            PropValues: Array<any>,
            Depth?: int /* 0 */,
            RefreshTree?: boolean /* true */): any;

        /** Searches for a child object that has the specified property values during the specified timeout period. */
        FindChildEx(
            PropNames: Array<string>,
            PropValues: Array<any>,
            Depth?: int /* 0 */,
            RefreshTree?: boolean /* true */,
            Timeout?: int /* 0 */): any;

        /** Searches for a child object that has the specified property values during the specified timeout period. */
        FindEx(
            PropNames: Array<string>,
            PropValues: Array<any>,
            Depth?: int /* 1 */,
            RefreshTree?: boolean /* true */,
            Timeout?: int /* 0 */): any;
        /** Returns a child object by its identifier. */
        FindId(Id: int, RefreshTree: boolean): any;
        /** Highlights a visible onscreen object with a flashing color rectangle. */
        HighlightObject(Object: any, HighlightCount: int, Color: int): void;
        /** Sends key presses to the currently active window. */
        Keys(Keys: string): void;
        /** Returns the object displayed at the specified coordinates on the screen.  */
        ObjectFromPoint(X: int, Y: int, FindTransparent: boolean): any;
        /**
         * Returns a Process object by its application name and index.
         *
         * If the process is not found, the method returns an empty object and posts
         * the message "The process … was not found"”" to the test log. You can call Exists
         * to determine whether the returned object is a process in the system.
         * To obtain the process object without posting any messages to the test log, use Sys.WaitProcess or WaitChild.
         *
         * NOTE: The Process method does not launch the specified process.
         * It simply searches for it among all processes that currently exist in the system.
         *
         * @param {int} [ProcessIndex = 1]
         * @see Sys.WaitProcess
         */
        Process(ProcessName: string, ProcessIndex?: int): Process;
        /** Refreshes the child object list. */
        Refresh(): void;
        /** Instructs TestComplete to re-identify the mapped object using the identification information specified in Name Mapping. */
        RefreshMappingInfo(): void;
        /** Deletes the specified child mapped object from Name Mapping. */
        RemoveNamedChild(Index: int): void;
        /** Restarts the computer. */
        Restart(): void;
        /** Shuts down the computer. */
        Shutdown(): void;
        /** Waits until the specified Browser object becomes available during the timeout period. */
        WaitBrowser(BrowserName?: string, Timeout?: int, BrowserIndex?: int): BrowserProcess;
        /** Waits until the specified child object becomes available during the timeout period. */
        WaitChild(ChildName: string, WaitTime: int): any;
        /** Waits until a child object with the specified mapped name becomes available during the timeout period. */
        WaitNamedChild(MappedChildName: string, WaitTime?: int): any;

        /**
         * Delays script execution until the specified process appears in the list of processes or the specified time limit is reached.
         * To determine whether the returned object is an extant process, call Exists.
         * @param {int} [Timeout = 0] Milliseconds to delay the script execution in order to allow the process to start.
         * If Timeout is 0, the method searches for the desired process once and then returns immediately.
         * If Timeout is -1, the waiting time is infinite.
         * @param {int} [ProcessIndex = 1] The index of the process instance among those started by the same executable.
         * The first process has index 1, the second - 2, etc. 1 is the default value.
         * If you obtain several processes with the same name and the process with the lowest index is terminated,
         * the indexes of other processes will be decreased by one.
         */
        WaitProcess(ProcessName: string, Timeout?: int, ProcessIndex?: int): Process;
        /** Waits until the specified object property achieves the specified value during the timeout period. */
        WaitProperty(PropertyName: string, PropertyValue: any, WaitTime: int): boolean;
        /** Returns a window by its handle. */
        WindowFromHandle(Handle: int): Window;
    }

    /**
     * lets you work with different Windows desktop properties.
     * It provides properties and methods that allow you to get or set
     * the current mouse coordinates, obtain a screenshot of a definite area of the screen,
     * get the active or focused window and so on.
     */
    interface Desktop extends Element {
        /** Gets or sets the horizontal position of the mouse pointer. */
        MouseX: int;
        /** Gets or sets the vertical position of the mouse pointer. */
        MouseY: int;

        /**  	Returns the desktop width. */
        readonly Width: int;
        /** Returns the desktop height. */
        readonly Height: int;

        /**
         * Returns the image of the rectangular area around the mouse pointer.
         * @param Mouse If `true` (default), the captured image includes the mouse cursor image;
         * if `false`, the image of the mouse cursor is not included.
         */
        PictureUnderMouse(Width: int, Height: int, Mouse?: boolean): Picture;
        /** Returns the image of the specified screen area. */
        Picture(ClientX?: int, ClientY?: int, Width?: int, Height?: int, Mouse?: boolean): Picture;

        /** Returns the top-level window. */
        ActiveWindow(): Window;
        /** Returns the focused window. */
        FocusedWindow(): Window;
        /** Returns the onscreen object that contains the pixel with the specified screen coordinates. */
        ObjectFromPoint(X: int, Y: int, FindTransparent?: boolean): RuntimeObject;
        /** Returns a window by its handle. */
        WindowFromHandle(Handle: int): Window;

        /**
         * Simulates the pressing of the specified mouse button.
         * @param VirtualKeyCode Specifies the button to be pressed.
         * You can use the following values for the parameter:
         * - `VK_LBUTTON` - `1` - The left mouse button.
         * - `VK_RBUTTON` - `2` - The right mouse button.
         * - `VK_MBUTTON` - `4` - The middle mouse button.
         *
         * If the Win32API plugin is installed in TestComplete, you can refer
         * to the constants using their names without defining them in scripts.
         */
        MouseDown(VirtualKeyCode: 1 | 2 | 4, X: int, Y: int): any;
        /** Simulates the releasing of the specified mouse button.
         * @see `MouseDown`
         */
        MouseUp(VirtualKeyCode: 1 | 2 | 4, X: int, Y: int): any;

        /** Simulates the pressing of the specified key. */
        KeyDown(VirtualKeyCode: int): void;
        /** Simulates one or several keypresses. */
        Keys(Keys: string): void;
        /** Simulates the releasing of the specified key. */
        KeyUp(VirtualKeyCode: int): void;
    }

    /**
     * All the Win32 application windows are accessed through window objects in TestComplete tests:
     * top-level, child and popup windows. Top-level and popup windows belong to a process object;
     * child windows belong to a parent window (popup windows, of course, have no children.)
     * Both process and window objects have a method, Window, that returns any window they own by specifying its class
     * and, optionally, its caption (that is, its index within siblings of the same class)
     */
    interface Window extends Element {
        readonly ControlId: int;
        readonly Focused: boolean;

        Handle: int;
        Height: int;
        HScroll: any;
        Id: int;
        Index: int;
        Left: int;
        MainMenu: Menu;
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
        Button(Name: string): Button;

        /**
         * This action brings the window to the top (that is, in front of other windows)
         * if it is a top-level window or an MDI-child window. If the window is minimized,
         * `Activate` first brings it back to the normal state. This action has no effect
         * on popup windows and controls, except that an error message is inserted into the test log.
         */
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
        /** Returns the path to the folder that holds the configuration files of the current project. */
        ConfigPath: string;
        /** Returns the name of the current project's .mds file. */
        FileName: string;
        /** Returns the LogResults object that provides access to the project's logs. */
        Logs: LogResults;
        /** Returns the path to the current project's .mds file. */
        Path: string;
        /** Returns the TestItems object which provides access to the project's test items. */
        TestItems: ProjectTestItems;
        /** Returns the collection of local variables defined in the current project. */
        Variables: Variables;
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
         * Assigns a value to an object's property given the property name as a string.
         * If the property with the given name was not found, an error occurs.
         *
         * `$set` works similar to `aqObject.SetPropertyValue`, but is easier to use in JavaScript.
         */
        $set(PropertyName: string, Value: Variant): void;
        /**
         * Assigns a value to an object's property given the property name as a string.
         * If the property with the given name was not found, an error occurs.
         *
         * `$set` works similar to `aqObject.SetPropertyValue`, but is easier to use in JavaScript.
         */
        $set(PropertyName: string, Param: Variant, Value: Variant): void;
        /**
         * Assigns a value to an object's property given the property name as a string.
         * If the property with the given name was not found, an error occurs.
         *
         * `$set` works similar to `aqObject.SetPropertyValue`, but is easier to use in JavaScript.
         *
         * NOTE: Last param in `...Params` is a value of property being setted whereas all others are property parameters.
         */
        $set(PropertyName: string, Param1: Variant, Param2: Variant, ...Params: Variant[]): void;

        /**
         * Get an object's property value given the property name as a string.
         * If the property with the given name was not found, an error occurs.
         *
         * `$get` works similar to `aqObject.GetPropertyValue`, but is easier to use in JavaScript.
         *
         * Applies to `IDispatch` objects, for example, TestComplete scripting objects (`Sys`, `Log`),
         * test objects obtained from applications (`Aliases.browser`), COM objects, and others.
         */
        $get(PropertyName: string, ...Param: Variant[]): Variant;

        /**
         * In JavaScript code, you can use $call to call an object's method given the method name as a string.
         * `$call` works similar to `aqObject.CallMethod`, but is easier to use in JavaScript.
         */
        $call(MethodName: string, ...Param: Variant[]): Variant;
    }

    /**
     * The Variables object provides access to a collection of project, project suite, network suite, or keyword test variables.
     */
    interface Variables extends IDispatch {
        /** Returns a variable specified by its name. */
        VariableByName(Name: string): Variant;
        /** Returns the total number of variables in the collection. */
        VariableCount: int;

        /** Adds a new variable to the collection.
         * If the variable with the specified name already exists in the collection, an error occurs.
         * @param VariableName The variable name. This name will be used to address the variable in scripts,
         * so it must match the naming rules of the scripting language you use.
         * @param VariableType One of the following string values:
         * - `"Boolean"` - The variable can store boolean values.
         * - `"Double"` - The variable can store floating-point values and dates.
         * - `"Integer"` - The variable can store integer values.
         * - `"Object"` - The variable can store object references.
         * - `"String"` - The variable can store string values.
         * - `"Password"` - The variable can store encrypted string values.
         * - `"Table"` - The variable can store a two-dimensional table of values
         * (a scripting interface to a table variable is provided by the TableVariable object).
         * - `"DB Table"` (note the space between the words) - The variable can be linked to an external data source,
         * such as a database table or recordset, an Excel spreadsheet or CSV file, and returns values from that source
         * (a scripting interface to a database table variable is provided by the DBTableVariable object).
         */
        AddVariable(VariableName: string, VariableType: "Boolean" | "Double" | "Integer" | "Object" | "String" | "Password" | "Table" | "DBTable"): void;
        /** Returns the variable category. */
        GetVariableCategory(Variable: Variant): string;
        /** Returns the default value of a variable. */
        GetVariableDefaultValue(Variable: Variant): Variant;
        /** Returns the variable description. */
        GetVariableDescription(Variable: Variant): string;
        /** Returns the name of the variable specified by its index in the variable collection. */
        GetVariableName(Index: int): string;
        /** Returns the name of the variable type. */
        GetVariableType(Variable: Variant): string;
        /** Removes the specified variable from the collection. */
        RemoveVariable(VariableName: string): void;
        /** Checks to see if a variable with the specified name exists in the given collection. */
        VariableExists(Name: string): boolean;
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

    interface ProjectSuiteTestItems {
        ItemCount: int;
        TestItem(Index: string): ProjectSuiteTestItem;
        Current: ProjectSuiteTestItem;
    }

    /**
     * Holds one item from the application list.
     * It has methods and properties that can set application attributes, launch or close the application
     */
    interface TestedApp {
        /** Specifies whether TestComplete launches the application automatically when the recording starts. */
        AutorunOnRecording: boolean;
        /** Specifies the number of the application instances to be launched. */
        Count: int;
        /** Returns the date of the application's executable or batch file. */
        Date: DateTime;
        /** Specifies the file name of the tested application (without path). */
        FileName: string;
        /** Specifies the fully-qualified file name of the tested application. */
        FullFileName: string;
        /** Specifies the name of the tested application in the tested application's collection. */
        ItemName: string;
        /** Specifies whether the application should be launched. */
        Launch: boolean;
        /** Provides a scripting interface to parameters that are specific for run modes. */
        Params: TestedAppParams;
        /** Specifies the application path. */
        Path: string
        /** Returns the size of the application's executable or batch file. */
        Size: int;
        /** Returns the time of the tested application's executable or batch file. */
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

    interface Rect {
        /** Get or set the vertical (Y) coordinate of the rectangle’s bottom edge (relative to the screen). */
        Bottom: int;

        /** Get or set the horizontal (X) coordinate of the rectangle’s left edge (relative to the screen). */
        Left: int;

        /** Get or set the horizontal (X) coordinate of the rectangle’s right edge (relative to the screen). */
        Right: int;

        /** Get or get the vertical (Y) coordinate of the rectangle’s top edge (relative to the screen). */
        Top: int;

        /** Returns the rectangle’s height. */
        readonly Height: int;

        /** Returns the rectangle’s width. */
        readonly Width: int;
    }

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
            MessageType?: LogMessageTypeEnum /* lmWarning */): boolean;

        /** Searches pixel-by-pixel for one image */
        Find(
            PictureToSearchIn: Picture | Element,
            PictureToSeachFor: Picture | Element,
            Left?: int /* 0 */,
            Top?: int /* 0 */,
            Transparent?: boolean /* false */,
            Mouse?: boolean /* false */,
            PixelTolerance?: int /* 0 */): Rect;

        /** Searches pixel-by-pixel for one image.
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

    /* TestComplete Utility objects */

    interface ImageConfiguration { }

    /**
     * Provides a scripting interface to an image, which you can use in your testing process.
     */
    interface Picture {
        /** Returns the handle of the given image. */
        Handle: int;
        /** Specifies the color of the image pixel.
         * @returns Integer value. Its low-order byte holds the value of the red component,
         * the subsequent bytes hold values of green and blue components respectively.
         * @see https://support.smartbear.com/testcomplete/docs/scripting/colors.html */
        Pixels(X: int, Y: int): int;
        /** Lets you get or set the width and height of the given image. */
        Size: any;

        /**
         * Compares the given image with another image and returns `true` or `false`
         * depending on whether they are identical or not.
         *
         * @param Picture The Picture object that represents the image to be compared
         * with the PictureObj image. Alternatively, this can be an object that has
         * the Picture method which returns the desired Picture object.
         * @param Transparent `false` by default. If it is `true`, then the top left pixel
         * of the given image will be treated as the “transparent” (background) color
         * in this image. Therefore, any transparent pixels in the first image will be
         * excluded when being compared to the second image.
         * @param PixelTolerance Lets you ignore slight differences between the bitmaps
         * during the search. If the number of different pixels is less than or equal
         * to PixelTolerance, then TestComplete considers the images to be identical.
         * `0` is the default value; it means that no differences between the bitmaps
         * except for those set by the Transparent parameter are ignored.
         * NOTE: Using the PixelTolerance parameter with non-zero values may slow down the search process.
         * @param Mouse This parameter is only meaningful if --
         * - The Picture parameter specifies an object that has the Picture method that returns a Picture object.
         * and
         * - Picture corresponds to an image that has a mouse pointer on it.
         * If the Mouse parameter is `true`, the `Compare` method includes the mouse
         * pointer in the Picture image. The method will only return `true` if Picture also
         * contains the mouse pointer image in the same position.
         * @param ColorTolerance Allows ignoring hue differences when comparing bitmaps.
         * The parameter specifies an acceptable color difference under which two pixels
         * of a certain color should be treated as identical. The color difference
         * is represented as an integer value within the range `0`…`255` that specifies
         * an acceptable difference for each color component (red, green and blue)
         * of the compared pixels. Two pixels are considered identical if the difference
         * between intensities of each of their color components does not exceed the specified value.
         *
         * When ColorTolerance is `0`, which is the default value, compared pixels
         * are considered identical only if they have exactly the same color.
         * When ColorTolerance is `255`, pixels of any color are considered identical.
         * @param Mask Specifies which areas of bitmaps should be compared. A mask
         * is another Picture object, whose pixels can be either black or white.
         * If a mask is specified, the routine works in the following way:
         * white pixels on the mask are taken into account during the comparison,
         * whereas black pixels are ignored.
         *
         * @see https://support.smartbear.com/testcomplete/docs/testing-with/checkpoints/regions/why-image-comparison-fails.html
         * @see https://support.smartbear.com/testcomplete/docs/testing-with/checkpoints/regions/factors-affecting-image-comparison.html
         */
        Compare(
            Picture: Picture,
            Transparent?: boolean /* false */,
            PixelTolerance?: int /* 0 */,
            Mouse?: boolean /* true */,
            ColorTolerance?: int /* 0 */,
            Mask?: Picture): boolean;
        /** Creates an ImageConfiguration object which you can use to specify image settings
         * that are used to post the image to the test log or to save the image to a file.
         * @param ImageFormat One of the strings:
         * - "BMP" - BMP image configuration
         * - "JPEG" - JPEG image configuration
         * - "PNG" - PNG image configuration
         * - "TIFF" - TIFF image configuration
         * - "GIF" - GIF image configuration
         * - "ICO" - ICO image configuration*/
        CreatePictureConfiguration(ImageFormat: "BMP" | "JPEG" | "PNG" | "TIFF" | "GIF" | "ICO"): ImageConfiguration;
        /**
         * Compares the given image with another image and returns the image
         * that indicates the difference between the compared images.
         *
         * @param Picture The Picture object that represents the image to be compared
         * with the PictureObj image. Alternatively, this can be an object that has
         * the Picture method which returns the desired Picture object.
         * @param Transparent `false` by default. If it is `true`, then the top left pixel
         * of the given image will be treated as the “transparent” (background) color
         * in this image. Therefore, any transparent pixels in the first image will be
         * excluded when being compared to the second image.
         * @param PixelTolerance Lets you ignore slight differences between the bitmaps
         * during the search. If the number of different pixels is less than or equal
         * to PixelTolerance, then TestComplete considers the images to be identical.
         * `0` is the default value; it means that no differences between the bitmaps
         * except for those set by the Transparent parameter are ignored.
         * NOTE: Using the PixelTolerance parameter with non-zero values may slow down the search process.
         * @param Mouse This parameter is only meaningful if --
         * - The Picture parameter specifies an object that has the Picture method that returns a Picture object.
         * and
         * - Picture corresponds to an image that has a mouse pointer on it.
         * If the Mouse parameter is `true`, the `Compare` method includes the mouse
         * pointer in the Picture image. The method will only return `true` if Picture also
         * contains the mouse pointer image in the same position.
         * @param ColorTolerance Allows ignoring hue differences when comparing bitmaps.
         * The parameter specifies an acceptable color difference under which two pixels
         * of a certain color should be treated as identical. The color difference
         * is represented as an integer value within the range `0`…`255` that specifies
         * an acceptable difference for each color component (red, green and blue)
         * of the compared pixels. Two pixels are considered identical if the difference
         * between intensities of each of their color components does not exceed the specified value.
         *
         * When ColorTolerance is `0`, which is the default value, compared pixels
         * are considered identical only if they have exactly the same color.
         * When ColorTolerance is `255`, pixels of any color are considered identical.
         * @param Mask Specifies which areas of bitmaps should be compared. A mask
         * is another Picture object, whose pixels can be either black or white.
         * If a mask is specified, the routine works in the following way:
         * white pixels on the mask are taken into account during the comparison,
         * whereas black pixels are ignored.
         *
         * @returns If the compared images are identical, the Difference method returns an empty value (`null` in JavaScript).
         * If the images differ, the method returns a picture (represented by the Picture object)
         * that shows the difference between the images. The following color highlighting scheme is used:
         * - Identical pixels are filled with white.
         * - The pixels that differ from one image to another are highlighted with red.
         * - The excess areas (when the images' height or width is different) are highlighted with fuchsia.
         * - Dissimilar pixels that were skipped due to the PixelTolerance parameter are highlighted with blue.
         * - The pixels that were skipped due to the Transparent or Mask parameter are filled with gray.
         * - The pixels that were ignored due to the ColorTolerance parameter are highlighted with yellow.
         *
         * @see https://support.smartbear.com/testcomplete/docs/testing-with/checkpoints/regions/why-image-comparison-fails.html
         * @see https://support.smartbear.com/testcomplete/docs/testing-with/checkpoints/regions/factors-affecting-image-comparison.html
         */
        Difference(
            Picture: Picture,
            Transparent?: boolean /* false */,
            PixelTolerance?: int /* 0 */,
            Mouse?: boolean /* true */,
            ColorTolerance?: int /* 0 */,
            Mask?: Picture): Picture;
        /** Returns a definite rectangular area of the given image. */
        Find(
            PictureForSearch: Picture,
            Left?: int /* 0 */,
            Top?: int /* 0 */,
            Transparent?: boolean /* false */,
            PixelTolerance?: int /* 0 */,
            Mouse?: boolean /* true */,
            ColorTolerance?: int /* 0 */,
            Mask?: Picture): Rect;
        /** Returns a new Picture object containing the specified rectangular region of the given picture. */
        GetRect(X: int, Y: int, Width: int, Height: int): any;
        /** Loads the given image from a file. */
        LoadFromFile(FileName: string): boolean;
        /** Copies the given image to the Clipboard. */
        SaveToClipboard(): void;
        /** Saves the given image to a file. */
        SaveToFile(FileName: string, Configuration: ImageConfiguration): boolean;
        /** Resizes the picture to the specified size. */
        Stretch(Width: int, Height: int, UseHalftones: boolean): void;
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

    /** Provides symbolic names for the TestComplete global constants.
     * The descriptions for the constants are given in the descriptions of those methods
     * where the corresponding constants are applied. */
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

    /** Provides a scripting interface used to change the text or visibility of the TestComplete indicator. */
    interface Indicator {
        /** Returns the text being shown by the indicator. */
        Text: string;

        /** Removes all of the strings from the stack and reverts the indicator text to the default one */
        Clear(): void;
        /** Hides the indicator from the screen. */
        Hide(): void;
        /** Restores the indicator text */
        PopText(): void;
        /** Specifies a new text for the indicator. */
        PushText(Value: string): void;
        /** Shows the indicator in the top-right corner of the screen. */
        Show(): void;
    }

    /** Used to store font and color settings that can be applied to messages and folders in the Test Log. */
    interface LogAttributes extends FontStyle {
        /** Specifies the background color of a test log message or folder. */
        BackColor: int;
        /** Specifies whether the text of a test log message or folder will be displayed in bold font. */
        Bold: boolean;
        /** Specifies whether the extended text of a test log message will be displayed in the HTML format or as plain text. */
        ExtendedMessageAsPlainText: boolean;
        /** Specifies the font color of a test log message or folder. */
        FontColor: int;
        /** Specifies whether the text of a test log message or folder will be displayed in italic. */
        Italic: boolean;
        /** Specifies whether the text of a test log message or folder will be displayed strikeout. */
        StrikeOut: boolean;
        /** Specifies whether the text of a test log message or folder will be displayed underlined. */
        Underline: boolean;
    }

    /**
     * use the CallStackSettings object to specify whether the test engine will collect information
     * about the test execution sequence for messages posted to the test log.
     * After the test run is over, you can view the collected call sequence in the Call Stack panel
     * of the test log and learn the sequence of script routines and keyword tests
     * that led to the execution of the test (or routine) that posted the message to the log.
     */
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

    /**
     * Provides a test log structure that can hold text messages, images, files and file links generated from tests.
     * The test log, which you can view via the Test Log, can store its items as a plain list
     * or have them organized as a tree whose nodes are folders that can include test log items and other folders.
     */
    interface Log extends IDispatch {
        /** Returns the number of information messages posted to the log by the current test item. */
        MsgCount: int;
        /** Returns the number of warning messages posted to the log by the current test item. */
        WrnCount: int;
        /** Returns the number of error messages posted to the log by the current test item. */
        ErrCount: int;
        /** Returns the number of event messages posted to the log by the current test item. */
        EvnCount: int;
        /** Returns the number of image messages posted to the log by the current test item. */
        ImgCount: int;
        /** Returns the number of file messages posted to the log by the current test item. */
        FileCount: int;
        /** Returns the number of file link messages posted to the log by the current test item. */
        LinkCount: int;
        /** Returns the name of the file (including the path) that holds a list of test results. */
        Path: string;
        /** Specifies whether to allow the posting of folders and messages of all kinds to the test log. */
        Enabled: boolean;
        /** Returns the number of informative messages posted to the specified log folder by the current test item. */
        FolderMsgCount: int;
        /** Returns the number of warning messages posted to the specified log folder by the current test item. */
        FolderWrnCount: int;
        /** Returns the number of error messages posted to the specified log folder by the current test item. */
        FolderErrCount: int;
        /** Returns the number of event messages posted to the specified log folder by the current test item. */
        FolderEvnCount: int;
        /** Returns the number of image messages posted to the specified log folder by the current test item. */
        FolderImgCount: int;
        /** Returns the number of files and file links posted to the specified log folder by the current test item. */
        FolderFileAndLinkCount: int;
        /**
         * Provides scripting interfaces to settings that enables or disables
         * the call stack tracing for methods that post messages to the log.
         *
         * NOTE: Property is readonly itself, but specific settings of object are read/write
         */
        readonly CallStackSettings: CallStackSettings;
        /** Returns the number of checkpoint messages posted to the log by the current test item. */
        CheckpointCount: int;
        /** Returns the number of checkpoint messages posted to the specified log folder by the current test item. */
        FolderCheckpointCount: int;

        /** Log MessageText detail,
         * and AdditionalInformation to the Additional Information panel  */
        Message(
            MessageText: string,
            AdditionalInformation?: string,
            Priority?: PriorityEnum, /* pmNormal */
            Attrib?: LogAttributes | null,
            Picture?: Picture | Element | string,
            FolderId?: int): void;
        /** Posts a warning to the test log. */
        Warning(
            MessageText: string,
            AdditionalInformation?: string,
            Priority?: PriorityEnum, /* pmNormal */
            Attrib?: LogAttributes | null,
            Picture?: Picture | Element | string,
            FolderId?: int): void;

        /**
         * If the Log.CallStackSettings.EnableStackOnError property is `true`,
         * then the test engine collects information about the execution
         * sequence of tests that led to the call of the Log.Error method
         * and displays this information in the Call Stack page of the test log
         */
        Error(
            MessageText: string,
            AdditionalInformation?: string,
            Priority?: PriorityEnum, /* pmNormal */
            Attrib?: LogAttributes | null,
            Picture?: Picture | Element | string,
            FolderId?: int): void;
        /** Event message is a message next to which TestComplete displays the Event glyph */
        Event(
            MessageText: string,
            AdditionalInformation?: string,
            Priority?: PriorityEnum, /* pmNormal */
            Attrib?: LogAttributes | null,
            Picture?: Picture | Element | string,
            FolderId?: int): void;
        /** Posts an image to the test log. */
        Picture(
            Picture: Picture | Element,
            MessageText?: string,
            AdditionalInformation?: string,
            Priority?: PriorityEnum, /* pmNormal */
            Attrib?: LogAttributes | null,
            FolderId?: int): string;
        /** Posts a file to the test log. */
        File(
            FileName: string,
            MessageText?: string,
            AdditionalInformation?: string,
            Priority?: PriorityEnum, /* pmNormal */
            Attrib?: LogAttributes | null,
            FolderId?: int): string;
        /** Posts a reference to a file or to any other resource to the test log. */
        Link(
            Link: string,
            MessageText?: string,
            AdditionalInformation?: string,
            Priority?: PriorityEnum, /* pmNormal */
            Attrib?: LogAttributes | null,
            FolderId?: int): void;
        /**
         * Turns off event logging until UnlockEvents is called.
         * The optional Count parameter sets the number of latest events to keep in a safety buffer.
         * They will be added to the log when posting an error or warning message.
         */
        LockEvents(Count: int): void;
        /** Re-enables event logging. See LockEvents() */
        UnlockEvents(): void;
        /** Creates a folder in the test log. This folder can hold messages of different types and subfolders. */
        CreateFolder(
            MessageText: string,
            AdditionalInformation?: string,
            Priority?: PriorityEnum, /* pmNormal */
            Attrib?: LogAttributes | null,
            OwnerFolderId?: int): int;
        /** Returns the number of folders created in the log by the current test item. */
        FolderCount(): int;

        /**
         * Adds the specified folder to the folder stack
         * and makes it the top folder of the stack.
         *
         * NOTE: Consider using `Log.AppendFolder` for newly created folders.
         * @example
         * Log.PushLogFolder(Log.CreateFolder("Start export"));
         *
         * @see Log.AppendFolder
         */
        PushLogFolder(FolderId: int): void;

        /** Pops the top folder of the folder stack out of that stack */
        PopLogFolder(): void;
        /** Saves the current test log results to one or several files in a particular format. */
        SaveResultsAs(
            FileName: string,
            LogFormat?: LogFormatEnum, /* lsXML */
            ExportVisualizerImages?: boolean, /* true */
            LogScope?: int): boolean;
        /** Posts the log contents to an issue-tracking system. */
        CreateIssueFromCurrentLog(): boolean;
        /** Creates a new object that defines font and color settings to be applied to test log messages and folders. */
        CreateNewAttributes(): LogAttributes;
        /** Creates a folder in the test log and activates the folder so that all posted messages are sent to this folder. */
        AppendFolder(
            MessageText: string,
            AdditionalInformation?: string,
            Priority?: PriorityEnum, /* pmNormal */
            Attrib?: LogAttributes | null,
            OwnerFolderId?: int): int;
        /** Posts a checkpoint message to the test log. */
        Checkpoint(
            MessageText: string,
            AdditionalInformation?: string,
            Priority?: PriorityEnum, /* pmNormal */
            Attrib?: LogAttributes | null,
            Picture?: Picture | Element | string,
            FolderId?: int): void;
        /** Generates intermediate test results and saves them to the log item collection. */
        SaveToDisk(): void;
    }

    interface Currency { }

    /**
     * A value that stores a date, time or both date and time.
     * This special type is used to perform various operations over date and time values easily.
     * @see https://support.smartbear.com/testcomplete/docs/scripting/working-with/dates/index.html
     * @see https://support.smartbear.com/testcomplete/docs/scripting/working-with/time/index.html
     */
    interface DateTime { }

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
         * @returns
         * - `-1` if Date1 is earlier than Date2
         * - `0` if dates equal
         * - `1` if Date1 is later than Date2
        */
        Compare(Date1: DateTime, DateTime: DateTime): -1 | 0 | 1;
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

    interface aqPerformance {
        Value(CounterName: string): int;
        Start(CounterName: string, WarnIfExists?: boolean): void;
        Check(
            MaxExecTime: int,
            OperationName?: string /* MaxExecTime */,
            CounterName?: string /* DefaultCounter */): boolean;
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

    interface CallObjectMethodAsyncResult { }

    /**
     * The Runner object is used to control script execution from the script. It includes
     * methods that allow you to stop the script execution and to run routines by their names.
     */
    interface Runner {
        /** Initializes TestComplete subsystems and runs the tests provided by the current project. */
        Start(): void;

        /**
         * Use the Stop method to stop the test execution. Unlike Runner.Halt,
         * this method does not post messages to the test log.
         */
        Stop(CurrentTestOnly: boolean): never;

        /**
         * The `Halt` method stops the script execution and posts an error string specified by `ErrorMsg` to the test log.
         *
         * The methods stops the entire test run, that is, for instance, if you are executing a project
         * or project suite test, the method will stop the entire project or project suite run.
         *
         * TestComplete generates the OnStopTest event when you stop the test run using the Runner.Halt method.
         * You can create a handling routine for this event to perform specific actions when the test stops.
         */
        Halt(ErrorMsg: string): never;

        /** Calls a script routine specified by its name and unit name. */
        CallMethod(ComplexName: string): void;

        /**
         * Calls the method of the specified application object from scripts asynchronously
         * (that is, CallObjectMethodAsync does not pause the script run until the method execution is over).
         * You can also use this method to obtain a property’s value (that is, to call the property’s get method).
         *
         * @param Obj Specifies the object whose method will be called.
         * @param MethodName The name of the desired object method or property.
         * @param Params Specifies the method parameters (if any). If you obtain
         * the value of an indexed property, these parameters specify the index values.
         *
         * @returns the CallObjectMethodAsyncResult object that contains methods and properties
         * allowing you to pause the script execution until the called method returns and providing access to method results.
         */
        CallObjectMethodAsync(Obj: any, MethodName: string, ...Params: Variant[]): CallObjectMethodAsyncResult;

        /**
         * Sets the property of the specified application object from scripts asynchronously
         * (that is, SetObjectPropertyAsync does not pause the script run until the execution of the property’s set method is over).
         */
        SetObjectPropertyAsync(Obj: any, PropertyName: any, ...Params: Variant[]): any;

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

        /** Closes the driver's connection to data and frees all
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

    /**
     * This object has a mechanism that allows you to work with sections and options
     * stored in the system registry, INI, XML and binary files.
     */
    interface Section {
        /** Specifies the section's name. */
        readonly Name: string;
        /** Returns the number of options in the current section. */
        readonly OptionCount: int;
        /** Returns the number of direct subsections in the current section. */
        readonly SectionCount: int;

        /** Deletes the current section and all its subsections, keys and values. */
        Clear(): void;
        /** Deletes a subsection from the current section. */
        DeleteSubSection(SectionName: string): void;
        /** Deletes a subsection specified by its index from the current section. */
        DeleteSubSectionByIndex(Index: int): void
        /** Returns the value of an option in the current section. */
        GetOption(OptionName: string, DefaultValue: Variant): Variant;
        /** Returns the value of an option specified by its index. */
        GetOptionByIndex(Index: int, DefaultValie: Variant): Variant;
        /** Returns the name of an option in the current section. */
        GetOptionName(Index: int): string;
        /** Returns the names of all options in the current section. */
        GetOptionNames(): string;
        /** Returns the name of a subsection in the current section. */
        GetSectionName(Index: int): string;
        /** Returns the names of all subsections in the current section. */
        GetSectionNames(): string;
        /** Returns the Section object for a subsection of the current section. */
        GetSubSection(SectionName: string): Section;
        /** Returns the Section object for a subsection specified by its index. */
        GetSubSectionByIndex(Index: int): Section;
        /** Obtains whether an option belongs to the option list of the current section. */
        OptionExists(OptionName: string): boolean;
        /** Deletes an option from the current section. */
        RemoveOption(OptionName: string): void;
        /** Deletes an option specified by its index from the current section. */
        RemoveOptionByIndex(Index: int): void;
        /** Sets a new value for an option of the current section. */
        SetOption(OptionName: string, NewValue: Variant): void;
        /** Sets a new value for an option specified by its index. */
        SetOptionByIndex(Index: int, NewValue: Variant): void;
        /** Obtains whether a section belongs to the subsection list of the current section. */
        SubSectionExists(SectionName: string): boolean;

    }

    interface FileSection extends Section { }

    /**
     * The Storages object is only available if the Storages plugin is installed.
     *
     * NOTE: The Storages object can successfully read only those binary and XML
     * files that were created via its methods. Also, the Storages object lets you
     * read and change registry values of the REG_DWORD, REG_SZ and REG_EXPAND_SZ types only.
     * The REG_BINARY and REG_MULTI_SZ value types are not supported.
     */
    interface Storages {
        /**
         * Returns the Section object corresponding to the specified registry key.
         *
         * NOTE: The returned Section object lets you obtain and change registry values
         * of the REG_DWORD, REG_SZ and REG_EXPAND_SZ type only.
         * The REG_BINARY and REG_MULTI_SZ value types are not supported.
         *
         * @param Key Specifies the full path to the desired key from the root key.
         * If the key does not exist, the method will create it.
         * @param {Win32API.Registry} [RootKey = HKEY_CURRENT_USER]
         * @param {int} [RegistryType = AQRT_32_BIT] This parameter is significant
         * if you use TestComplete on a 64-bit operating system.
         * It specifies which registry view, 32-bit or 64-bit, the method will access.
         * You can use one of the following constants:
         * - `AQRT_32_BIT` - `0` - 32-bit registry (default)
         * - `AQRT_64_BIT` - `1` - 64-bit registry
         * @param {boolean} [ReadOnly = false] If this parameter's value is `true`,
         * the Registry key will be opened in read-only mode.
         * Otherwise, it is opened in read-write mode.
         *
         * @example
         * let key = Storages.Registry("Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Shell Folders", HKEY_CURRENT_USER);
         */
        Registry(Key: string, RootKey?: Win32API.Registry, RegistryType?: AQRT_32_BIT | AQRT_64_BIT, ReadOnly?: boolean): Section;
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
        ParamType(Index: VarTypeEnum): int;
    }

    interface TestedAppBaseParams {
        /** Specifies a string of command-line arguments to be passed to the tested application on startup. */
        CommandLineParameters: string,

        /** Returns the name of the run mode that correspond to the parameters. */
        Name: string,

        /** Specifies a working folder for the tested application. */
        WorkFolder: string,

        /** Activates an appropriate run mode and applies parameters to the tested application. */
        Activate(): void,

        /** Specifies whether a parameter collection is currently active (that is, whether an appropriate run mode is selected). */
        IsActive(): boolean,
    }

    interface TestedAppSimpleParams extends TestedAppBaseParams { }
    interface TestedAppDebugParams extends TestedAppBaseParams { }

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
    interface TestedAppProfileParams extends TestedAppBaseParams { }

    /**
     * Provides a scripting interface to parameters of applications defined in your project.
     * It contains properties that let your work with parameters of tested AIR, Java, ClickOnce and Web applications,
     * as well as with parameters of applications run in Simple, RunAs, Debug and Profile run modes.
     * The object also provides an interface to the parameters of the currently selected mode.
     */
    interface TestedAppParams {
        /** Provides a scripting interface to the parameters of the currently selected run mode. */
        ActiveParams: TestedAppSimpleParams | TestedAppDebugParams | TestedAppProfileParams | TestedAppRunAsParams;

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
        /** Returns the object's identifier.  */
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

    /** Any mapped processes, windows, controls and the Aliases object. */
    interface MappedObject {
        /**
         * Use the `WaitAliasChild` method to delay the test execution until the object
         * specified by its alias appears in the system or until the specified time limit is reached.
         * If the specified object is found, the method returns it;
         * otherwise it returns an "empty" stub object that only has the `Exists` property.
         *
         * @param ChildName The alias of the desired child object, as it is defined
         * in the Aliases section of the NameMapping editor. This alias must be a child item of the AliasObj in the Aliases tree.
         *
         * NOTE: The alias is always case-insensitive, in spite of the value of the Use case-sensitive parameters project option.
         *
         * @param WaitTime The time period, in milliseconds, to wait until the specified object becomes available.
         * If WaitTime is `0`, the method searches for the specified object once and returns immediately.
         * If WaitTime is `-1`, the waiting time is specified by the Auto-wait timeout project setting.
         */
        WaitAliasChild(ChildName: string, WaitTime?: int): TestComplete.RuntimeObject | { readonly Exists: false };
    }

    /**
     * Everything outside of TestComplete itself is accessed by tests as an element of a Windows process. The object through which all outside access to tests is obtained, Sys, has Process children, each with a unique, two-part ID:
     * - The name of the executable file that starts the process.
     * - The index of the process instance. An application can have several instances running simultaneously.
     * The first (earliest launched instance) has index 1, the second - index 2, etc.
     * If you obtain several processes with an identical name and the process with the lowest index is terminated,
     * the indexes of the other processes will be decreased by one.
     */
    interface Process extends RuntimeObject {

        /** Returns the number of child objects of the given object. */
        readonly ChildCount: int;

        /**
         * Returns the command line passed to the process at the moment of process creation.
         * The first argument of this command line is the name of the executable that started the process.
         */
        readonly CommandLine: string;

        /** Returns the approximate percentage of CPU time spent on executing the process. */
        readonly CPUUsage: int;

        /**
         * Specifies the application name users see it in the operating system.
         * NOTE: Applied only to the process objects that correspond to Windows Store applications.
         */
        readonly FriendlyName: string;

        /** Specifies the full name that uniquely identifies the object in TestComplete. */
        readonly FullName: string;

        /** Index of the process among other processes started by the same executable. */
        readonly Index: int;

        /** Specifies whether the process is an Open Application (TestComplete can access methods, properties and events of internal application’s objects). */
        readonly IsOpen: boolean;

        /** Returns the custom name that is mapped to the original object name and is used to address the object in scripts. */
        readonly MappedName: string;

        /** Returns the total amount of memory (in kilobytes) allocated by the process. */
        readonly MemUsage: int;

        /** Specifies the executable’s path and name that started the process. */
        readonly Path: string;

        /** Specifies the priority of the process in the operating system. */
        readonly Priority: int;

        /** Name of the executable that started the process. */
        readonly ProcessName: string;

        /** Specifies whether the process is a 32- or 64-bit process. */
        readonly ProcessType: string;

        /** Returns the identifier of a session in which the process is running. */
        readonly SessionId: int;

        /**
         * The System indicates whether the specified application process is a system process.
         * System processes are, for example, those running under the System, Local Service and Network Service accounts.
         */
        readonly System: boolean;

        /** Returns the number of the active threads in the process. */
        readonly ThreadCount: int;

        /** Returns the name of the user account that started the process. */
        readonly UserName: string;

        /** Returns the amount of virtual memory (in kilobytes) committed to the process. */
        readonly VMSize: int;

        AppDomain(Name: string, ClrVersion?: string): AppDomain;
        Form(Caption: string): Form;

        /**
         * Closes the specified application process by sending the `WM_SYSCOMMAND` message
         * with the `SC_CLOSE` parameter to the main window of the process. When called for multi-process
         * web browsers, the method closes the main process of the browser as well as its auxiliary processes.
         *
         * The method also checks whether the process is showing a window that asks you to save the changes.
         * If it is, the method stops waiting for the process. In this case,
         * it will not close it and post an informative message to the test log.
         *
         * If `Close` fails to stop the process, use `Terminate`. Specifies a timeout, in milliseconds,
         * to wait for the process to close. The test execution will pause for the specified time
         * or until the process closes. When the method is called for the `Browser` object,
         * it pauses the test execution for the specified time or until the main and child processes are closed.
         *
         * @param {int} [WaitTimeOut = 60000]
         *
         * @see `Process.Terminate`
         */
        Close(WaitTimeOut?: int): void;

        /**
         * Tries to terminate all instances of the given application that were launched by TestComplete.
         *
         * NOTE: When a process is closed by the Windows `TerminateProcess` function,
         * destructors and other finalization code of the application are not called.
         * So, you should use the `Terminate` method when `Close` cannot stop the application.
         *
         * @see `Process.Close`
         */
        Terminate(): boolean;

        /**
         * The Refresh method updates the tree of currently running processes, their windows and child objects
         * which you can access either using the Sys object, or using the Object Browser panel.
         * This helps you ensure that the tree corresponds to the actual processes running in the system,
         * the windows they have and the objects that belong to these windows.
         */
        Refresh(): void;

        /**
         * Saves the process dump (minidump) to the specified .dmp file.
         * Dumps created by this method include the following information:
         * - stack traces for all threads existing in the process,
         * - recently unloaded modules,
         * - data referenced by locals or other stack memory.
         * - (optional) the entire memory of the process.
         *
         * @param FileName The fully-qualified path to the .dmp file to create. If the file already exists, TestComplete overwrites it.
         * @param FullMemory Specifies whether to include the entire memory of the process in the dump. Defaults to `false`
         */
        SaveDumpToFile(FileName: string, FullMemory?: boolean): void;

        /**
         * Creates a process dump (a .dmp file) in the project’s Log folder and adds the link to the dump file to the test log.
         * This methods creates dumps in the minidump format. The dump includes the following information:
         * - stack traces for all threads existing in the process,
         * - recently unloaded modules,
         * - data referenced by locals or other stack memory.
         * - (optional) the entire memory of the process.
         *
         * @param FullMemory Specifies whether to include the entire memory of the process in the dump. Defaults to `false`
         */
        SaveDumpToLog(FullMemory?: boolean): void;

        /**
         * This method returns the AppDomain object that is a wrapper for the AppDomain object of .NET Framework.
         * You can use this object to retrieve information about application domains existing in the ProcessObj process
         * and to get access to static non-visual objects that exist in that domain (you can get the access through the dotNET property).
         *
         * @param Name The friendly name of the application domain. This name is specified by the domain’s native FriendlyName property value.
         * The friendly name of the default application domain is the same as the file name of the application executable.
         * For example, if the application file name is Orders.exe, the friendly name of its default domain is "Orders.exe".
         * Note that a process can have multiple application domains with different names.
         * @param ClrVersion This parameter is only used if the application hosts multiple CLR versions in the same process,
         * for example, .NET 4.0 runtime and .NET 2.0 runtime. It specifies the CLR version of the application domain
         * that you wish to obtain. The version number string must have the "major_version.minor_version" format.
         * For example, "4.0" or "2.0".
         */
        AppDomain(Name: string, ClrVersion?: string): AppDomain;
    }

    /**
     * The AppDomain object provides access to .NET application domains that exist within an application process.
     * It also allows you to access namespaces, classes and class members in assemblies loaded into the corresponding domain.
     *
     * @see https://support.smartbear.com/testcomplete/docs/reference/test-objects/controls/misc/appdomain/index.html
     */
    interface AppDomain {
        // TODO
    }

    enum ObjectSearchStrategyType {
        /**
         * Search as deep as possible in each branch of the object tree before moving to the next branch.
         * This is the default setting for projects created in TestComplete versions up to 11.
         */
        searchDepthFirst = "Depth-first",
        /**
         * Search level by level: start at a given object, search its direct child objects,
         * then move to the next level child objects, and so on.
         * This is the default setting for projects created in TestComplete 14.
         */
        searchBreadthFirst = "Breadth-first",
    }

    interface Options {
        /** This group provides access to the Playback project properties. */
        readonly Run: {
            /** Use case-sensitive parameters option. */
            readonly CaseSensitive: boolean;

            /** Click on focused control option in the On Unexpected Window group. */
            readonly ClickOnButton: boolean;

            /**
             * Delay between events option.
             *
             * Milliseconds to wait after the test simulates any user action
             * (click, keystroke, window command, and so on) during playback.
             * The default is 0; any positive integer can be specified to slow down test execution.
             *
             * @default 0
             */
            Delay: int;

            /** Show a notification when an unhandled script exception occurs option */
            readonly ErrorDialog: boolean;

            /** Ignore overlapping window option in the On Overlapping Window group */
            readonly IgnoreOverWindow: boolean

            /**
             * Specifies the order in which TestComplete traverses the object tree
             * when searching for an object using the Find methods (Find, FindEx, FindChild, and FindChildEx).
             */
            ObjectSearchStrategy: ObjectSearchStrategyType;

            /**
             * Auto-wait timeout option.
             *
             * When a test gets a reference to a process or window object, or when it activates an object
             * (for example, opening a minimized window), the object may not be available immediately.
             * Similarly, when a test changes the onscreen state of a window (for example, an open window is minimized),
             * or when attempts to close an unexpected window, the change may not occur instantaneously.
             *
             * Auto-wait timeout is the number of milliseconds TestComplete waits for an object to become available
             * or for the object state to change before posting a timeout error message to the test log.
             * If the object becomes available or the desired change occurs within the delay allowed, the test proceeds immediately.
             * If the timeout elapses, the error message is posted to the test log. What happens next
             * depends on the On error and On object recognition error properties.
             *
             * Auto-wait timeout affects the following test methods that return references to new objects:
             * - Sys.Process
             * - Sys.Browser
             * - Process.Window
             * - Window.Window
             * - Mobile.Device
             * - Mobile.Device.Process
             *
             * @default 10000
             */
            Timeout: int;
        }
    }

    /** Provides detailed information about any drive of the computer, no matter whether the drive is physical or logical.  */
    interface aqDriveInfo {
        /** Returns the letter of the given drive. */
        readonly DriveLetter: string;
        /** Indicates the type of the specified drive: fixed, removable, network and so on. */
        readonly DriveType: int;
        /** Returns the collection of files in the drive's root folder. */
        readonly Files: aqObjIterator<aqFileInfo>;
        /** Returns the name of a disk's file system. */
        readonly FileSystem: string;
        /** Returns the collection of drive folders. */
        readonly Folders: aqObjIterator<aqFolderInfo>;
        /** Returns the amount of free space on the given drive (in bytes). */
        readonly FreeSpace: double;
        /** Returns the unique serial number of a disk. */
        readonly SerialNumber: double;
        /** Returns the drive's total capacity (in bytes). */
        readonly TotalSize: double;
    }

    /** Common interface for objects that could be used in aqObjIterator. */
    interface IIterable { }

    /** Provides various information about a file */
    interface aqFileInfo extends IIterable {
        /** Returns the file's attributes. See aqFileSystem.fa* constants.
         * To check if a file has a specific attribute set, perform the bitwise AND check
         * on the Attribute property value and the value corresponding to the desired attribute.
         * Alternatively, you can use the aqFileSystem.CheckAttributes method.
         */
        readonly Attributes: int;
        /** Returns an aqFileCertificateInfo object that provides information about the file's authentication certificate. */
        readonly CertificateInfo: aqFileCertificateInfo;
        /** Returns the file's creation date. */
        readonly DateCreated: DateTime;
        /** Returns the date the file was last accessed. */
        readonly DateLastAccessed: DateTime;
        /** Returns the date the file was last modified. */
        readonly DateLastModified: DateTime;
        /** Returns the drive where the file is located. */
        readonly Drive: string;
        /** Specifies whether the file exists. */
        readonly Exists: boolean;
        /** Returns the file's name and extension. */
        readonly Name: string;
        /** Returns the file's name without the extension. */
        readonly NameWithoutExtension: string;
        /** Returns the object that describes the file's parent folder. */
        readonly ParentFolder: aqFolderInfo;
        /** Returns the full path to the file. */
        readonly Path: string;
        /** Returns the file name in the 8.3 format. */
        readonly ShortName: string;
        /** Returns the path to the file in the 8.3 format. */
        readonly ShortPath: string;
        /** Returns the file size in bytes. */
        readonly Size: int;
        /** Returns an aqFileVersionInfo object that provides version information about the file. */
        readonly VersionInfo: aqFileVersionInfo;
    }

    /**
     * Provides detailed information about a folder.
     */
    interface aqFolderInfo extends IIterable {
        /** Returns the folder's attributes. */
        readonly Attributes: int;
        /** Returns the folder's creation date. */
        readonly DateCreated: DateTime;
        /** Returns the date the folder was last accessed. */
        readonly DateLastAccessed: DateTime
        /** Returns the date the folder was last modified. */
        readonly DateLastModified: DateTime;
        /** Returns the drive where the folder is located. */
        readonly Drive: string;
        /** Specifies whether the folder exists. */
        readonly Exists: boolean;
        /** Returns the collection of files stored in the given folder. */
        readonly Files: aqObjIterator<aqFileInfo>;
        /** Indicates whether the folder is a root folder. */
        readonly IsRootFolder: boolean;
        /** Returns the name of the folder. */
        readonly Name: string;
        /** Returns the object that describes the parent folder of the given folder. */
        readonly ParentFolder: aqFolderInfo;
        /** Returns the full path to the folder. */
        readonly Path: string;
        /**
         * Sets the folder's attributes.
         *
         * @returns If the folder attributes have been changed successfully, the method returns `0`.
         * Otherwise, it returns a Windows error code. To get the error description, use the `aqUtils.SysErrorMessage` method.
         * For the complete list of error codes, refer to the System Error Codes article in the MSDN library.
        */
        SetAttributes(fAttr: int): int;
        /** Returns the folder name in the 8.3 format. */
        readonly ShortName: string;
        /** Returns the path to the folder in the 8.3 format. */
        readonly ShortPath: string;
        /** Returns the total size of the folder. */
        Size: double;
        /** Returns the collection of subfolders of the given folder. */
        SubFolders: aqObjIterator<aqFolderInfo>;

        /** Copies the related folder to a new location. */
        Copy(NewPath: string, RenameOnCollision?: boolean): boolean;
        /** Deletes the specified folder. */
        Delete(Confirm?: boolean): boolean;
        /** Moves the related folder to a new location. */
        Move(NewPath: string, RenameOnCollision?: boolean): boolean;
        /** Assigns a new name to the related folder. */
        Rename(NewPath: string): boolean;
    }

    /**
     * provides a scripting interface to object fields that you can see on the Fields page of the Object Browser panel.
     * To obtain the `aqObjField` object in scripts, use the `GetFields` method of the `aqObject` object.
     */
    interface aqObjField extends IIterable {
        /** Returns the access type of the field. */
        readonly Category: "private" | "protected" | "public";
        /** Returns the field name. */
        readonly Name: string;
        /** Specifies the field's value. */
        Value: Variant;
    }

    /**
     * Provides a scripting interface to object events that you can see on the Events page of the Object Browser panel.
     * To obtain the `aqObjEvent` object in scripts, use the `GetEvents` method of the `aqObject` object.
     */
    interface aqObjEvent extends IIterable {
        /** Returns the event name. */
        readonly Name: string;
        /** Returns the total number of event parameters. */
        readonly ParamCount: int;
        /** Returns the name of the event parameter by its index. */
        ParamName(Index: int): string;
    }

    /**
     * Provides a scripting interface to object methods that you can see on the Methods page of the Object Browser panel.
     * To obtain the `aqObjMethod` object in scripts, use the GetMethods method of the `aqObject` object.
     */
    interface aqObjMethod extends IIterable {
        /** Returns the method name. */
        readonly Name: string;
        /** Returns the total number of method parameters. */
        readonly ParamCount: int;
        /** Returns the name of the method parameter by its index. */
        ParamName(Index: int): string;
        /** Returns the data type of the specified method parameter. */
        ParamType(Index: int): VarTypeEnum;
        /** Returns the data type of the method's return value. */
        ValueType(Index: int): VarTypeEnum;

        /** Specifies whether the method has a return value. */
        HasRetValue(): boolean;
    }
    interface aqFileCertificateInfo { }

    /**
     * Provides various version information about a file.
     * To get this object in your tests, use the aqFileInfo.VersionInfo property.
     * Note, that version information can be included only in binary files
     * (for example, executables, DLLs and so on); text files do not have version information.
     */
    interface aqFileVersionInfo {
        /** Returns the code page identifier of a particular version information block. */
        CodePage: int;
        /** Returns the comments on the file. */
        Comments: string;
        /** Returns the name of the company that produced the file. */
        CompanyName: string;
        /** Returns the build part of the file's version number. */
        FileBuildVersion: int;
        /** Returns the file description. */
        FileDescription: string;
        /** Returns the module attributes. */
        FileFlags: int;
        /** Returns the file version number. */
        FileFullVersion: string;
        /** Returns the major part of the file's version number. */
        FileMajorVersion: int;
        /** Returns the minor part of the file's version number. */
        FileMinorVersion: int;
        /** Returns the revision part of the file's version number. */
        FileRevisionVersion: int;
        /** Allows you to get additional information about a device driver, font file or virtual device file.
         * This property returns 0 for a file of another type (for example, an executable).
         * Returned value is one of the Win32API's VFT2_* constants.
         * If the file is a virtual device (that is, if FileType is VFT_VXD),
         * the property returns the virtual-device identifier included in the virtual-device control block.
         * If the file is an application, a dynamic-link library, a static-link library or a file of an unknown type
         * (that is, if FileType is either VFT_APP, VFT_DLL, VFT_STATIC_LIB or VFT_UNKNOWN), the property returns 0.*/
        FileSubType: int;
        /** Indicates the general type of the file. Returns one of the Win32API.VFT_* constants. */
        FileType: int;
        /** Returns the file's internal name. If none exists, the property returns the file's original name (the OriginalFilename value) without the extension.
         * @param Index A file can contain multiple version information blocks translated in different languages.
         * This parameter specifies a zero-based index of the desired version information translation, among those included in the file.
         * The default value is 0, which means the default version information block.
         * To get the total number of version information translations in a file, use the Languages property. */
        InternalName(Index?: int): string;
        /** Returns the language of a particular version information block.
         * @param Index A zero-based index of the desired version information block. Default is 0.
         * To get the total number of version information translations in the file, use the Languages property. */
        Language(Index?: int): string;
        /** Returns the number of version information translations included in the file. */
        Languages: int;
        /** Returns the copyright notice for the file. */
        LegalCopyright(Index?: int): string;
        /** Returns the legal trademarks for the file. */
        LegalTrademarks(Index?: int): string;
        /** Returns the file's original name. */
        OriginalFilename(Index?: int): string;
        /** Indicates the operating system that the file was designed for. */
        OSFile: int;
        /** Returns the private build information for the file. */
        PrivateBuild(Index?: int): string;
        /** Returns the build number of the product that the file is associated with. */
        ProductBuildVersion: int;
        /** Returns the version of the product that the file is associated with. */
        ProductFullVersion: int;
        /** Returns the major version number of the product that the file is associated with. */
        ProductMajorVersion: int;
        /** Returns the minor version number of the product that the file is associated with. */
        ProductMinorVersion: int;
        /** Returns the name of the product that the file is associated with. */
        ProductName(Index?: int): string;
        /** Returns the revision number of the product that the file is associated with. */
        ProductRevisionVersion: int;
        /** Returns the special build information for the file. */
        SpecialBuild(Index?: int): string;
    }

    /** Provides a common interface for operations performed over several similar objects.
     * This object is returned by a number of scripting methods and properties */
    interface aqObjIterator<Type extends IIterable> {
        /** Returns the number of items in the collection. */
        Count: int;

        /** Indicates whether an object follows the current one. */
        HasNext(): boolean;
        /** Returns an item with the specified index. */
        Item(Index: int): Type;
        /** Returns the next object in the collection. */
        Next(): Type;
        /** Moves to the first object in the collection. */
        Reset(): void;
        /** Increases the index indicating the iterator's position by the specified number and returns the object by the result index. */
        Skip(SkipCount: int): Type;
    }

    interface Set { }

    /**
     * The TestItem object provides access to a test item defined in your project and allows you to get the test item's property values.
     * Note that all of the TestItem object properties are read-only and cannot be changed during the test run.
     * To set up the project's test items, use the Test Items page of the project editor.
     */
    interface ProjectTestItem {
        /** Returns the number of times the test item is to be run. */
        Count: int;
        /** Returns the test item's description. */
        Description: string;
        /** Returns a TestItemElement object corresponding to the test run by the test item. */
        ElementToBeRun: TestItemElement;
        /** Returns whether the test item is to be executed during the project run. */
        Enabled: boolean;
        /** Returns the total number of child test items. */
        ItemCount: int;
        /** Returns the current iteration of the test item run. */
        Iteration: int;
        /** Returns the test item's name. */
        Name: string;
        /** Returns the parent test item. */
        Parent: ProjectTestItem
        /** Specifies what TestComplete will do when an error occurs during a test run.
         * Possible options: the test run will be stopped, the error will be ignored, the test item where the error occurred will be skipped.
         * - `0` - Proceed with project execution as if no errors have occurred.
         * Corresponds to the Continue running value of the test item's On Error column on the Test Items page.
         * - `1` - Stop the whole project run.
         * Corresponds to the Stop project value of the test item's On Error column on the Test Items page.
         * - `2` - Stop the current test item run (including all its iterations and child items)
         * and proceed with subsequent sibling items. Corresponds to the Stop current item value of the test item's On Error column on the Test Items page.
         * - `3` - Corresponds to the Use project's 'On error' property value of the test item's On Error column on the Test Items page.
         * The item uses the project's Error handling > On Error property value. It can be Continue running, Stop current item, or Stop project.
         */
        readonly StopOnError: 0 | 1 | 2 | 3;
        /** Specifies what TestComplete will do when an exception occurs during a test run.
         * Possible options: the test will be stopped, the exception will be ignored, the test item where the error occurred will be skipped.
         * - `0` - Proceed with the test run as if no exception has occurred.
         * Corresponds to the Continue running value of the test item's On exception column on the Test Items page.
         * - `1` - Stop the execution of the whole project.
         * Corresponds to the Stop project value of the test item's On exception column on the Test Items page.
         * - `2` - Stop the execution of the current test item (including its child items
         * and further iterations of the current item), and proceed with the execution of the subsequent sibling items.
         * Corresponds to the Stop current item value of the test item's On exception column on the Test Items page.
         */
        readonly StopOnException: 0 | 1 | 2;
        /** Returns the child test item specified by its index. */
        TestItem(Index: int): ProjectTestItem;
        /** Returns the test item's timeout value, in minutes. */
        Timeout: int;
    }

    /**
     * The TestItem object provides access to a test item defined in your project
     * and allows you to get the test item's property values. Note that all
     * of the TestItem object properties are read-only and cannot be changed during the test run.
     * To set up the project's test items, use the Test Items page of the project editor.
     */
    interface ProjectTestItems {
        /** Returns the test item that is currently running. */
        readonly Current: ProjectTestItem;
        /** Returns the total number of top-level test items. */
        readonly ItemCount: int;
        /** Returns a top-level test item by its index. */
        TestItem(Index: int): ProjectTestItem;
    }

    /** The scheme holds the dataset name and describes the type and structure of the stored data. */
    interface LogDataScheme {
        /** Returns the scheme of the child dataset by its index. */
        Child(Index: int): LogDataScheme | LogTableDataScheme;
        /** Returns the total number of child datasets in the dataset that the given scheme describes. */
        ChildCount: int;
        /** Returns the type of data in the dataset that the given scheme describes. */
        DataType: ldtText | ldtPicture | ldtTable;
        /** Returns the name of the dataset that the given scheme describes. */
        Name: string;
    }

    interface LogTableDataScheme extends LogDataScheme { }

    interface LogData {
        /** Scheme of the log data. */
        Scheme: LogDataScheme;
    }

    interface LogTableData extends LogData {
        /** Returns the total number of rows in the current table. */
        RowCount: int;
        /** Returns the table row by index. */
        Rows: LogTableRow;
        /** Returns the LogTableDataScheme object holding the table scheme. */
        Scheme: LogTableDataScheme;
    }

    interface LogColumn { }

    /**
     * The tables in the TestComplete test log can be two types: common tables
     * and tree-like tables (for example, the Test Log table in the generic script log).
     * Each row of the test log table, including child rows of tree-like tables, is represented as the LogTableRow object.
     */
    interface LogTableRow {
        /** Returns the child dataset for the given row by its scheme. */
        ChildData(DataScheme: LogDataScheme): LogTableData | TextLogData | PictureLogData;
        /** Returns the child dataset for the given row by the dataset’s index. */
        ChildDataByIndex(Index: int): LogTableData | TextLogData | PictureLogData;
        /** Returns the child dataset for the given row by the panel name where this data is displayed. */
        ChildDataByName(DataName: string): LogTableData | TextLogData | PictureLogData;
        /** Returns the child row by its index. */
        ChildRow(Index: int): LogTableRow;
        /** Returns the total number of child rows for a given row. */
        ChildRowCount: int;
        /** Returns the value stored in the specified column. */
        Value(Column: LogColumn): Variant;
        /** Returns the value stored in the column specified by its index. */
        ValueByIndex(Index: int): Variant;
        /** Returns the value stored in the column with the specified name. */
        ValueByName(ColumnName: string): Variant;
    }

    interface TextLogData extends LogData {
        /** Returns the format of the stored text. */
        Format: ltfPlain | ltfHTML | ltfXML | ltfURL;
        /** Returns the LogDataScheme object holding the scheme of the text data. */
        Scheme: LogDataScheme;
        /** Returns the stored text. */
        Text: string;
    }

    /** The PictureLogData object lets you work with a picture stored in the log.
     * This can be, for example, the picture displayed in the Picture panel of the Test Log page. */
    interface PictureLogData extends LogData {
        /** Returns the Picture object holding the stored picture. */
        Picture: Picture;
        /** Returns the LogDataScheme object holding the scheme of the picture data. */
        Scheme: LogDataScheme;
    }

    /**
     * provides a scripting interface to a project's log item. Log items are displayed in the test log panel.
     * They are organized in a tree-like structure. At that, each log item of any level
     * (topmost log items as well as child items) are represented as the LogItem object.
     *
     * The LogItem object also contains properties that let you access a log item's dataset,
     * that is, results displayed for the given log item in additional log panels.
     * To obtain the log item's dataset, use the Data property.
     */
    interface LogItem {
        /** Returns the child log item by its index. */
        Child(Index: int): LogItem;
        /** Returns the total number of child log items of the current log item. */
        ChildCount: int;
        /** Returns the log item's dataset by its index. */
        Data(Index: int): LogData;
        /** Returns the total number of datasets in the given log item. */
        DataCount: int;
        /** Returns the log item's caption. */
        Name: string;
        /**
         * Returns the log item's status.
         *
         * One of the following constants that specify the log item status:
         * - `0` - The log item contains only informative messages.
         * - `1` - The log item contains warning and informative messages and does not contain error messages.
         * - `2` - The log item contains one or more error messages.
         */
        Status: 0 | 1 | 2;
    }

    /**
     * Provides a scripting interface to a project's logs that are displayed under the
     * `Project_Suite_Name Logs` | `Project_Name Logs` node in the Project Explorer panel.
     * These are top-level log items that can hold result of test runs for a whole project,
     * its test items or project item's elements (for instance, single script routines, low-level procedures, and so on).
     *
     * The `LogResults` object maintains the list of a project's top-level log items and contains properties
     * that let you iterate through log items and access single top-level log items from scripts.
     * This helps you process test results in a specific manner, for instance, to export them to a custom file format.
     */
    interface LogResults {
        /** Returns the project's top-level log item by its index. */
        LogItem(Index: int): LogItem;
        /** Returns the total number of project's top-level log items. */
        LogItemsCount(): int;
    }

    /** The FontStyle object represents a collection of font styles that can be used to display
     * the message in the test log. To get the FontStyle object, access the LogParams.FontStyle property. */
    interface FontStyle {
        /** Specifies whether the text of the test log message will be displayed in bold. */
        Bold: boolean;
        /** Specifies whether the text of the test log message will be displayed in italic. */
        Italic: boolean;
        /** Specifies whether the text of the test log message will be striked out. */
        StrikeOut: boolean;
        /** Specifies whether the text of the test log message will be underlined. */
        Underline: boolean;
    }

    /**
     * The LogParams object is used in project events that occur upon posting messages to the test log.
     * This object contains a number of properties that specify text and attributes of the posted message.
     * You can modify these properties within an event handler to change message text, its color, font style and other attributes.
     *
     * For example: suppose that TestComplete posts an error message to notify you that an unexpected window has appeared.
     * Before TestComplete posts this message, it creates the LogParams object, fills its properties with data,
     * generates the OnUnexpectedWindow event and passes this LogParams object as a parameter to the event handler.
     * Properties of the LogParams object specify text, priority, font style and other attributes of the posted message.
     * The event handler can modify these properties, so TestComplete will post text specified in the event handler, but not the text used by default.
     */
    interface LogParams {
        /** Specifies the text to be displayed in the Details pane of the Test Log. */
        AdditionalText: string;
        /** Specifies the background color of the message in the Test Log. */
        Color: int;
        /** Specifies the font color used to display the message in the Test Log panel. */
        FontColor: int;
        /** Specifies the font style used to display the message in the Test Log panel. */
        FontStyle: FontStyle;
        /** Set this property to `true` to cancel the posting of a message to the test log. */
        Locked: boolean
        /** Specifies the text posted to the test log, to the Message column of the Messages pane. */
        MessageText: string;
        /** Specifies the priority of the posted message. */
        Priority: PriorityEnum;
    }

    // Simulate type enums. Used to simplify stating this as param type.
    // Will be expanded in hovers

    type PriorityEnum = pmLowest | pmLower | pmNormal | pmHigher | pmHighest;
    type ShiftStateEnum = skNoShift | skShift | skAlt | skCtrl;
    type LogMessageTypeEnum = lmNone | lmMessage | lmWarning | lmError;
    type VarTypeEnum = varEmpty | varNull | varSmallInt | varInteger | varSingle
        | varDouble | varCurrency | varDate | varOleStr | varDispatch | varError
        | varBoolean | varVariant | varUnknown | varShortInt | varByte | varWord
        | varLongWord | varInt64 | varStrArg | varString | varAny | varArray | varByRef;
    type FileAttributesEnum = aqFileSystem.faReadOnly | aqFileSystem.faHidden | aqFileSystem.faSystem
        | aqFileSystem.faArchive | aqFileSystem.faNormal | aqFileSystem.faTemporary
        | aqFileSystem.faOffline | aqFileSystem.faNotContentIndexed;
    type LogFormatEnum = lsXML | lsHTML | lsJUnit | lsMHT | lsPackedHTML | lsZip;
}

/**
 * Allows to manage files as well as read from and write to text and binary files.
 * This object complements the aqFileSystem object, but unlike the latter it lets you deal with files only.
 */
declare namespace aqFile {
    const faWrite: faWrite;
    const faRead: faRead;
    const faReadWrite: faReadWrite;

    type faWrite = 10;
    type faRead = 11;
    type faReadWrite = 12;

    const ctANSI: ctANSI;
    const ctUnicode: ctUnicode;
    const ctUTF8: ctUTF8;
    type ctANSI = 20 & { Tag: "CodingType" };
    /** UTF-16 */
    type ctUnicode = 21 & { Tag: "CodingType" };
    type ctUTF8 = 22 & { Tag: "CodingType" };

    /** Returns the time when the specified file was created. */
    function GetCreationTime(PathToFile: string): any;
    /** Returns the time when the specified file was last accessed. */
    function GetLastAccessTime(PathToFile: string): any;
    /** Returns the time when the specified file was last modified. */
    function GetLastWriteTime(PathToFile: string): any;
    /** Returns the size of the specified file. */
    function GetSize(PathToFile: string): int;
    /** Copies the specified file to a new location. */
    function Copy(
        PathToExistingFile: string,
        PathToNewFile: string,
        RenameOnCollision?: boolean /* true */): boolean;
    /** Deletes the specified file. */
    function Delete(PathToFile: string): boolean;
    /** Creates a new file with the specified name. NOTE: The folder where you want to create a file must exist. */
    function Create(PathToFile: string): int;
    /** Indicates whether the specified file, folder or drive exists. */
    function Exists(Path: string): boolean;
    /** Renames the specified file. */
    function Rename(
        OldPath: string,
        NewPath: string,
        RenameOnCollision?: boolean /* true */): boolean;
    /** Moves the specified file to a new location. */
    function Move(
        PathToExistingFile: string,
        PathToNewFile: string,
        RenameOnCollision?: boolean /* true */): boolean;
    /** Compares two specified files. */
    function Compare(PathToFile1: string, PathToFile2: string): boolean;
    /** Sets a new creation time for the specified file. */
    function SetCreationTime(Path: string, Time: TestComplete.DateTime): boolean;
    /** Sets a new time when the file was last accessed. */
    function SetLastAccessTime(Path: string, Time: TestComplete.DateTime): boolean;
    /** Sets a new time when the file was last written to. */
    function SetLastWriteTime(Path: string, Time: TestComplete.DateTime): boolean;
    /** Returns the attributes of the specified file. */
    function GetFileAttributes(PathToFile: string): int;
    /** Assigns new attributes to the specified file. */
    function SetFileAttributes(Path: string, fAttr: TestComplete.FileAttributesEnum): int;
    /** Opens the specified file in binary mode. */
    function OpenBinaryFile(Path: string, FileAccess: int, OverwriteOrCreate: boolean): any;
    /** Opens the specified file in text mode. */
    function OpenTextFile(
        Path: string,
        FileAccess: int,
        TextCodingType: ctANSI | ctUnicode | ctUTF8,
        OverwriteOrCreate?: boolean /* false */): TestComplete.aqTextFile;
    /**
     * Reads the whole contents of the specified text file into a single string.
     *
     * @param TextCodingType
     * - `aqFile.ctANSI` - `20` - ANSI
     * - `aqFile.ctUnicode` - `21` - Unicode (UTF-16)
     * - `aqFile.ctUTF8` - `22` - UTF8
     */
    function ReadWholeTextFile(Path: string, TextCodingType: ctANSI | ctUnicode | ctUTF8): string;
    /** Writes a string to the specified text file. */
    function WriteToTextFile(
        Path: string,
        String: string,
        TextCodingType: ctANSI | ctUnicode | ctUTF8,
        OverwriteOrCreate?: boolean /* false */): boolean;
}

/**
 * The aqUtils object provides various helper routines that let you extend tests with additional functionality.
 */
declare namespace aqUtils {
    /** Generates a simple tone using the PC speakers. */
    function Beep(Freq: int, Duration: int): void;
    /** Delays the test execution for the specified time period in milliseconds. */
    function Delay(ms: int, Str?: string): void;
    /** Returns the path to the specified COM server. */
    function GetCOMServerPath(Server: string, Is64bit: boolean): string;
    /** Indicates whether the specified string is a valid JavaScript, JScript, Python, C++Script, C#Script or DelphiScript identifier. */
    function IsValidIdent(Ident: string): boolean;
    /** Converts the specified OS error code into the corresponding error message string. */
    function SysErrorMessage(ErrorCode: int): string;
    /** Checks a Windows API call's return value and raises an appropriate exception when this call fails. */
    function Win32Check(ExitCode: boolean): boolean;
}

/** Lets to perform various operations on string values */
declare namespace aqString {
    /** Leading spaces will be trimmed. */
    const stLeading: stLeading;
    type stLeading = 1 & { Tag: "TrimType" };

    /** Trailing spaces will be trimmed. */
    const stTrailing: stTrailing;
    type stTrailing = 2 & { Tag: "TrimType" };
    /** Both leading and trailing spaces will be trimmed. */
    const stAll: stAll;
    type stAll = 3 & { Tag: "TrimType" };

    /** Specifies a character used to separate individual values in a list. */
    var QuoteSymbol: string;
    /** Specifies a symbol used as a quotation mark. */
    var ListSeparator: string;

    /** Removes spaces and control characters from the specified string. */
    function Trim(InputString: string, Space: stLeading | stTrailing | stAll): string;
    /** Concatenates two specified strings. */
    function Concat(String1: string, String2: string): string;
    /** Encloses the specified string in quotes. */
    function Quote(InputString: string): string;
    /** Converts a quoted string to an unquoted string. */
    function Unquote(InputString: string): string;
    /** Returns the number of characters in a string. */
    function GetLength(SourceString: string): int;
    /** Converts the specified string to upper case. */
    function ToUpper(InputString: string): string;
    /** Converts the specified string to lower case. */
    function ToLower(InputString: string): string;
    /** Inserts one string to another at the specified position. */
    function Insert(InputString: string, InsertString: string, InsertPosition: int): string;
    /** Retrieves a substring from the input string. */
    function SubString(InputString: string, StartPosition: int, Length: int): string;
    /** Retrieves a single character from the input string. */
    function GetChar(InputString: string, Position: int): string;
    /** Removes a number of characters from the input string. */
    function Remove(InputString: string, StartPosition: int, Length: int): string;
    /**
     * Searches for a substring within the given string.
     * If the input string holds several occurrences of a substring, the method returns the position of the first matching substring.
     * To search for another occurrence, set a different starting point via the StartPosition parameter.
     *
     * @returns If the substring was found, the method returns the number of the first matching character, otherwise, it returns `-1`.
     */
    function Find(
        InputString: string,
        SubString: string,
        StartPosition?: int,
        CaseSensitive?: boolean /* true */): int;
    /** Searches for the last occurrence of the substring within the given string. */
    function FindLast(
        InputString: string,
        SubString: string,
        CaseSensitive?: boolean /* true */): int;
    /** Compares two specified strings. */
    function Compare(String1: string, String2: string, CaseSensitive: boolean): int;
    /**
     * Replaces all the occurrences of one substring with another substring.
     *
     * @param InputString Specifies the string to be processed.
     * @param StringToReplace Specifies the substring whose occurrences should be replaced.
     * @param SubsString Specifies the string to be substituted.
     * @param {boolean} [CaseSensitive = true] Specifies whether the comparison should be case-sensitive or not.
     *
     * @example
     * var str = "Hi, Bob. Have you seen Bob Robinson?";
     * str = aqString.Replace(str, "Bob", "Jack");
     * Log.Message(str); // "Hi, Jack. Have you seen Jack Robinson?"
     */
    function Replace(
        InputString: string,
        StringToReplace: string,
        SubsString: string,
        CaseSensitive?: boolean): string;
    /** Checks whether a string contains a substring that matches the specified regular expression. */
    function StrMatches(ExprStr: string, Str: string): boolean;
    /** Returns the number of items in the string list. */
    function GetListLength(List: string): int;
    /** Returns an individual item from the list passed through the input string. */
    function GetListItem(List: string, Index: int): string;
    /** Adds a new item to a string list. */
    function AddListItem(List: string, NewItem: string, Index: int): string;
    /** Removes an item with the given index from a string list. */
    function DeleteListItem(List: string, Index: int): string;
    /** Changes the value of the string list item with the given index. */
    function ChangeListItem(List: string, NewItem: string, Index: int): string;
    /** Generates a formatted string. */
    function Format(Format: string): string;
}

/**
 * Contains named constants and helper routines for manipulating various data,
 * display message dialogs or prompt for user input.
 *
 * NOTE: Most of routines of this object are obsolete and replaced with analogs from aqNNN objects.
 */
declare namespace BuiltIn {
    // CheckBox state:
    const cbUnchecked: cbUnchecked;
    const cbChecked: cbChecked;
    const cbGrayed: cbGrayed;

    // Colors:
    const cl3DDkShadow: int;
    const cl3DLight: int;
    const clActiveBorder: int;
    const clActiveCaption: int;
    const clAppWorkSpace: int;
    const clAqua: int;
    const clBackground: int;
    const clBlack: int;
    const clBlue: int;
    const clBtnFace: int;
    const clBtnHighlight: int;
    const clBtnShadow: int;
    const clBtnText: int;
    const clCaptionText: int;
    const clCream: int;
    const clDefault: int;
    const clDkGray: int;
    const clFuchsia: int;
    const clGradientActiveCaption: int;
    const clGradientInactiveCaption: int;
    const clGray: int;
    const clGrayText: int;
    const clGreen: int;
    const clHighlight: int;
    const clHighlightText: int;
    const clHotLight: int;
    const clInactiveBorder: int;
    const clInactiveCaption: int;
    const clInactiveCaptionText: int;
    const clInfoBk: int;
    const clInfoText: int;
    const clLime: int;
    const clLtGray: int;
    const clMaroon: int;
    const clMedGray: int;
    const clMenu: int;
    const clMenuBar: int;
    const clMenuHighlight: int;
    const clMenuText: int;
    const clMoneyGreen: int;
    const clNavy: int;
    const clNone: int;
    const clOlive: int;
    const clPurple: int;
    const clRed: int;
    const clScrollBar: int;
    const clSilver: int;
    const clSkyBlue: int;
    const clSystemColor: int;
    const clTeal: int;
    const clWhite: int;
    const clWindow: int;
    const clWindowFrame: int;
    const clWindowText: int;
    const clYellow: int;

    const cmpContains: TestComplete.CompareCondition.cmpContains;
    const cmpEndsWith: TestComplete.CompareCondition.cmpEndsWith;
    const cmpEqual: TestComplete.CompareCondition.cmpEqual;
    const cmpGreater: TestComplete.CompareCondition.cmpGreater;
    const cmpGreaterOrEqual: TestComplete.CompareCondition.cmpGreaterOrEqual;
    const cmpIn: TestComplete.CompareCondition.cmpIn;
    const cmpLess: TestComplete.CompareCondition.cmpLess;
    const cmpLessOrEqual: TestComplete.CompareCondition.cmpLessOrEqual;
    const cmpMatches: TestComplete.CompareCondition.cmpMatches;
    const cmpNotContains: TestComplete.CompareCondition.cmpNotContains;
    const cmpNotEndsWith: TestComplete.CompareCondition.cmpNotEndsWith;
    const cmpNotEqual: TestComplete.CompareCondition.cmpNotEqual;
    const cmpNotIn: TestComplete.CompareCondition.cmpNotIn;
    const cmpNotMatches: TestComplete.CompareCondition.cmpNotMatches;
    const cmpNotStartsWith: TestComplete.CompareCondition.cmpNotStartsWith;
    const cmpStartsWith: TestComplete.CompareCondition.cmpStartsWith;

    const ctBoolean: int;
    const ctDateTime: int;
    const ctFloat: int;
    const ctHyperlink: int;
    const ctImage: int;
    const ctInteger: int;
    const ctString: int;

    var ExtendedColorsCount: int;

    const ldtPicture: int;
    const ldtTable: int;
    const ldtText: int;

    const lesCurrentProject: int;
    const lesCurrentTestItem: int;
    const lesFull: int;

    const lmError: lmError;
    const lmMessage: lmMessage;
    const lmNone: lmNone;
    const lmWarning: lmWarning;

    const lsHTML: lsHTML;
    const lsMHT: lsMHT;
    const lsXML: lsXML;

    const ltfHTML: ltfHTML;
    const ltfPlain: ltfPlain;
    const ltfURL: ltfURL;
    const ltfXML: ltfXML;

    const mbAbort: mbAbort;
    const mbAbortIgnore: mbAbortIgnore;
    const mbAbortRetryIgnore: mbAbortRetryIgnore;
    const mbAll: mbAll;
    const mbCancel: mbCancel;
    const mbHelp: mbHelp;
    const mbIgnore: mbIgnore;
    const mbNo: mbNo;
    const mbNoToAll: mbNoToAll;
    const mbOK: mbOK;
    const mbOKCancel: mbOKCancel;
    const mbRetry: mbRetry;
    const mbYes: mbYes;
    const mbYesAllNoAllCancel: mbYesAllNoAllCancel;
    const mbYesNoCancel: mbYesNoCancel;
    const mbYesToAll: mbYesToAll;
    // values below may not represent actual values
    type mbAbort = 0;
    type mbAbortIgnore = 1;
    type mbAbortRetryIgnore = 2;
    type mbAll = 3;
    type mbCancel = 4;
    type mbHelp = 5;
    type mbIgnore = 6;
    type mbNo = 7;
    type mbNoToAll = 8;
    type mbOK = 9;
    type mbOKCancel = 10;
    type mbRetry = 11;
    type mbYes = 12;
    type mbYesAllNoAllCancel = 13;
    type mbYesNoCancel = 14;
    type mbYesToAll = 15;

    const mrAbort: mrAbort;
    const mrAll: mrAll;
    const mrCancel: mrCancel;
    const mrIgnore: mrIgnore;
    const mrNo: mrNo;
    const mrNone: mrNone;
    const mrNoToAll: mrNoToAll;
    const mrOk: mrOk;
    const mrRetry: mrRetry;
    const mrYes: mrYes;
    const mrYesToAll: mrYesToAll;

    const mtConfirmation: mtConfirmation;
    const mtCustom: mtCustom;
    const mtError: mtError;
    const mtInformation: mtInformation;
    const mtWarning: mtWarning;

    // Priority levels:
    const pmLowest: pmLowest;
    const pmLower: pmLower;
    const pmNormal: pmNormal;
    const pmHigher: pmHigher;
    const pmHighest: pmHighest;

    const propAccessRead: int;
    const propAccessWrite: int;

    var StandardColorsCount: int;

    const varEmpty: varEmpty;
    const varNull: varNull;
    const varSmallInt: varSmallInt;
    const varInteger: varInteger;
    const varSingle: varSingle;
    const varDouble: varDouble;
    const varCurrency: varCurrency;
    const varDate: varDate;
    const varOleStr: varOleStr;
    const varDispatch: varDispatch;
    const varError: varError;
    const varBoolean: varBoolean;
    const varVariant: varVariant;
    const varUnknown: varUnknown;
    const varShortInt: varShortInt;
    const varByte: varByte;
    const varWord: varWord;
    const varLongWord: varLongWord;
    const varInt64: varInt64;
    const varStrArg: varStrArg;
    const varString: varString;
    const varAny: varAny;
    const varArray: varArray;
    const varByRef: varByRef;

    /** Creates an array of Variant elements. */
    function CreateVariantArray(Param1: int, Param2: int): any;
    /** Creates a two-dimensional array of Variant elements. */
    function CreateVariantArray2(Param1: int, Param2: int, Param3: int, Param4: int): any;
    /** Creates a three-dimensional array of Variant elements. */
    function CreateVariantArray3(
        Param1: int, Param2: int, Param3: int, Param4: int,
        Param5: int, Param6: int): any;
    /** Returns the ordinal value of an ordinal-type expression. */
    function GetOrd(Param1: any): any;
    /** Displays a window with an edit box and two buttons: OK and Cancel.
     * Use this function to quickly get a value from the user. */
    function InputBox(Caption: string, Prompt: string, Default: string): string;
    /**
     * Displays a window that lets the user specify a value that can be used in script.
     *
     * NOTE: It is supported for VBScript and DelphiScript only.
     */
    function InputQuery(Param1: string, Param2: string, Param3: string): boolean;
    /** Returns the natural logarithm of a number. */
    function Log(Param1: number): number;
    /**
     * Displays a dialog box.
     * @param Message The message to be displayed.
     * @param BoxType It can be any of the following constants:
     * - `mtWarning` - The message box will contain the exclamation point icon.
     * - `mtError` - The message box will contain the red stop icon.
     * - `mtInformation` - The message box will contain the information icon.
     * - `mtConfirmation` - The message box will contain the question mark icon.
     * - `mtCustom` - The message box will not contain any bitmap.
     * @param Buttons Specifies the buttons to be displayed in the message box.
     * This parameter can be any combination of the following values:
     * - `mbYes` - "Yes" button
     * - `mbNo` - "No" button
     * - `mbOK` - "OK" button
     * - `mbCancel` - "Cancel" button
     * - `mbAbort` - "Ignore" button
     * - `mbRetry` - "Retry" button
     * - `mbIgnore` - "Ignore" button
     * - `mbAll` - "All" button
     * - `mbYesToAll` - "Yes to All" button
     * - `mbNoToAll` - "No to All" button
     * - `mbHelp` - "Help" button
     * - `mbYesNoCancel` - "Yes", "No" and "Cancel" buttons
     * - `mbOKCancel` - "OK" and "Cancel" buttons
     * - `mbAbortRetryIgnore` - "Abort", "Retry" and "Ignore" buttons
     * NOTE: To specify the Buttons parameter, you should create a set value using the MkSet function (see the example below).
     * Use of MkSet is obligatory. You are not allowed to skip it.
     * @param Reserved Parameter is reserved. You may pass `0`.
     *
     * @returns one of the constants that indicates which button the user pressed in the message box:
     * - `mrYes`
     * - `mrAll`
     * - `mrYesToAll`
     * - `mrNo`
     * - `mrAbort`
     * - `mrNoToAll`
     * - `mrOK`
     * - `mrRetry`
     * - `mrIgnore`
     * - `mrCancel`
     * @example
     * var i;
     * i = MkSet(mbYes, mbYesToAll, mbNo, mbCancel);
     * i = MessageDlg("Message text", mtConfirmation, i, 0);
     */
    function MessageDlg(
        Message: string,
        BoxType: mtWarning | mtError | mtInformation | mtConfirmation | mtCustom,
        Buttons: TestComplete.Set,
        Reserved: int): mrYes | mrAll | mrYesToAll | mrNo | mrAbort | mrNoToAll | mrOk | mrRetry | mrCancel | mrIgnore;
    /** Returns a number of command-line arguments passed to TestComplete at startup. */
    function ParamCount(): int;
    /**
     * Returns a TestComplete command-line argument specified by its index.
     * @param Index The index of the arguments is not zero-based. However,
     * you can use the 0 index to access the fully-qualified name of the TestComplete executable.
     */
    function ParamStr(Index: int): string;
    /** Sends an e-mail message using the Simple Mail Transfer Protocol (SMTP). */
    function SendMail(
        Param1: string, Param2: string, Param3: string, Param4: string,
        Param5: string, Param6: string, Param7: string): boolean;
    /** Displays a simple message box with the specified string and the OK button. */
    function ShowMessage(Param1: string): void;
    /** Returns the high bound of the specified dimension of a Variant array. */
    function VarArrayHighBound(Param1: any, Param2: int): int;
    /** Returns the low bound of the specified dimension of a Variant array. */
    function VarArrayLowBound(Param1: any, Param2: int): int;
    /** Resizes a Variant array. It is supported for VBScript and DelphiScript. */
    function VarArrayRedim(Param1: any, Param2: int): void;
    /** Sets the OLEVariant value to empty. */
    function VarClear(Param1: any): void;
}

/**
 * Provides unified methods for operating objects' members at run time.
 */
declare namespace aqObject {
    const varEmpty: varEmpty;
    const varNull: varNull;
    const varSmallInt: varSmallInt;
    const varInteger: varInteger;
    const varSingle: varSingle;
    const varDouble: varDouble;
    const varCurrency: varCurrency;
    const varDate: varDate;
    const varOleStr: varOleStr;
    const varDispatch: varDispatch;
    const varError: varError;
    const varBoolean: varBoolean;
    const varVariant: varVariant;
    const varUnknown: varUnknown;
    const varShortInt: varShortInt;
    const varByte: varByte;
    const varWord: varWord;
    const varLongWord: varLongWord;
    const varInt64: varInt64;
    const varStrArg: varStrArg;
    const varString: varString;
    const varAny: varAny;
    const varArray: varArray;
    const varByRef: varByRef;

    /** Returns an empty object. */
    const EmptyObject: Object;
    /** Returns an empty Variant value. */
    const EmptyVariant: TestComplete.Variant;

    /** Returns the data type of the specified Variant value. */
    function GetVarType(VarParam: TestComplete.Variant): int;
    /** Indicates whether the specified object has a member with the given name. */
    function IsSupported(IObject: any, MemberName: string): boolean;
    /** Returns the value of an object's property. */
    function GetPropertyValue(IObject: any, PropertyName: string): TestComplete.Variant;
    /** Assigns a new value to an object's property. */
    function SetPropertyValue(IObject: any, PropertyName: string, Value: TestComplete.Variant): void;
    /** Calls the specified method of a particular object. */
    function CallMethod(IObject: any, MethodName: string): any;
    /** Generates a certain event of a particular object. */
    function RaiseEvent(IObject: any, EventName: string): boolean;

    /** Returns the collection of events of the given object. */
    function GetEvents(SourceObject: any, ShowHidden?: boolean): TestComplete.aqObjIterator<TestComplete.aqObjEvent>;
    /** Returns the collection of fields of the given object.  */
    function GetFields(SourceObject: any, ShowHidden?: boolean): TestComplete.aqObjIterator<TestComplete.aqObjField>;
    /** Returns the collection of methods of the given object. */
    function GetMethods(SourceObject: any, ShowHidden?: boolean): TestComplete.aqObjIterator<TestComplete.aqObjMethod>;
    /**
     * Lists all the properties of the desired object
     * @param {boolean} [ShowHidden = false]
     */
    function GetProperties(SourceObject: any, ShowHidden?: boolean): TestComplete.aqObjIterator<TestComplete.aqObjProperty>;
    /**
     * Verifies an object's property value according to the specified condition.
     * @param {boolean} [CaseSensitive = true]
     * @param {int} [MessageType = lmWarning]
     */
    function CompareProperty(
        Property: any,
        Condition: int,
        Value: any,
        CaseSensitive?: boolean,
        MessageType?: TestComplete.LogMessageTypeEnum): boolean;
    /**
     * Saves information about the specified object to a file.
     * @param {boolean} [SaveRecursive = false]
     * @param {boolean} [SaveAllProperties = false]
     * @param {boolean} [SaveFields = false]
     * @param {boolean} [SaveMethods = false]
     * @param {int} [Depth = 2]
     */
    function SaveObjectSnapshotToFile(
        AObject: any,
        FileName: string,
        SaveRecursive?: boolean,
        SaveAllProperties?: boolean,
        AdditionalProperties?: string,
        SaveFields?: boolean,
        SaveMethods?: boolean,
        Depth?: int): boolean;
    /**
     * Verifies an object's property value according to the specified condition.
     * @param {boolean} [CaseSensitive = true]
     */
    function CheckProperty(
        Object: TestComplete.RuntimeObject,
        Property: string,
        Condition: int,
        Value: TestComplete.Variant,
        CaseSensitive?: boolean): boolean;
}

/** Lets you work with the computer's file system: obtain information about drives,
 * folders and files as well as to add, modify and remove files and folders. */
declare namespace aqFileSystem {
    /** Returns the collection of disk drives of the current computer. */
    var Drives: any;

    const fattrSet: int;
    const fattrInvert: int;
    const fattrFree: int;

    /** A read-only file. */
    const faReadOnly: faReadOnly;
    /** A hidden file. */
    const faHidden: faHidden;
    /** A system file. */
    const faSystem: faSystem;
    const faDirectory: int;
    /** An archive file. */
    const faArchive: faArchive;
    const faDevice: int;
    /** A normal file (that is, a file without any other attributes set). */
    const faNormal: faNormal;
    /** A temporary file. */
    const faTemporary: faTemporary;
    /** A sparse file. */
    const faSparseFile: int;
    /** A link or shortcut file, or a file that has an associated reparse point. */
    const faReparsePoint: int;
    /** A compressed file. */
    const faCompressed: int;
    /** A file whose data is physically moved to offline storage. */
    const faOffline: faOffline;
    /** A file that is not indexed by the content indexing service. */
    const faNotContentIndexed: faNotContentIndexed;
    /** An encrypted file. */
    const faEncrypted: int;
    /** A virtual file. */
    const faVirtual: int;

    /** A read-only file. */
    type faReadOnly = 1;
    /** A hidden file. */
    type faHidden = 2;
    /** A system file. */
    type faSystem = 4;
    /** An archive file. */
    type faArchive = 32;
    /** A file that does not have any other attributes set. */
    type faNormal = 128;
    /** A file that is used for temporary storage. */
    type faTemporary = 256;
    /** A file whose data is physically moved to offline storage. */
    type faOffline = 4096;
    /** A file that is not to be indexed by the content indexing service. */
    type faNotContentIndexed = 8192;

    /** Modifies the attribute(s) of the specified file or folder. */
    function ChangeAttributes(Path: string, Attribute: int, Action: int): int;
    /** Indicates whether the specified file or folder has certain attribute(s). */
    function CheckAttributes(Path: string, Attribute: int): boolean;
    /** Copy one or several files to a new location */
    function CopyFile(PathToExistingFile: string, PathToNewFile: string, RenameOnCollision?: boolean /* true */): boolean;
    /**
     * Copies the specified folder(s) to another location.
     *
     * @param Source The path to the folder to be copied. Both fully-qualified and relative paths are acceptable.
     * This path must not include a trailing backslash (to remove it from the path,
     * you can use the `aqFileSystem.ExcludeTrailingBackSlash` method).
     *
     * To copy several folders, use wildcards (`*` and `?`) to specify the mask.
     * Note, that wildcards are only allowed in the last component of the path.
     *
     * @param Destination The path to the folder where the folder(s) specified
     * by the `Source` parameter will be copied along with their contents.
     * Both fully-qualified and relative paths are acceptable.
     * This path may or may not include a trailing backslash.
     * If the destination folder does not exist, it will be created.
     *
     * Note that if the `Source` mask does not match any folder, the destination folder is not created.
     *
     * @param RenameOnCollision Specifies the method behavior in case the Destination folder
     * already contains a subfolder with the same name as the Source folder.
     * If `RenameOnCollision` is `true` (which is the default value), the method creates
     * the Copy of <FolderName> subfolder in the `Destination` folder and copies the `Source`’s contents to that subfolder.
     * Otherwise, the method copies the Source folder’s contents to the existing destination subfolder replacing the files having the same name.
     *
     * @returns `true` if all the specified folders were copied successfully, and `false` otherwise.
     *
     * If the Source folder was not found, the method returns `false`. However,
     * if the Source mask that uses wildcards does not match any folder, the method returns `true`.
     *
     * @example
     * aqFileSystem.CopyFolder(".\\orig", ".\\copy");
     * // ".\\copy\\orig"
     */
    function CopyFolder(Source: string, Destination: string, RenameOnCollision?: boolean /* true */): boolean;
    /**
     * Creates a new folder.
     * @param Path Specifies the fully qualified path where a new folder should be created.
     * If the path includes folders that do not exist, they will be created as well.
     *
     * @returns If the creation succeeds, the method returns `0`, otherwise, it returns the error code.
     * To get a description that corresponds to the given error code, you can use the `aqUtils.SysErrorMessage` method.
     * A complete list of error codes is provided in the System Error Codes article in the MSDN library.
     */
    function CreateFolder(Path: string): int;
    /** Deletes the specified file(s). */
    function DeleteFile(PathToFile: string): boolean;
    /**
     * Deletes the specified folder(s).
     * @param Path The fully qualified path to the folder to be deleted.
     * To delete several folders, use wildcards (`*` and `?`) to specify the mask.
     * Note, that wildcards are only allowed in the last component of the path.
     * The path may or may not include a trailing backslash (`\`).
     * An empty string or `undefined` means the current working folder,
     * which can be read and set by using the `aqFileSystem.GetCurrentFolder` and `aqFileSystem.SetCurrentFolder` methods, respectively.
     * @param {boolean} [RemoveNonEmpty = false] Specifies whether the method should remove non-empty folders.
     * If the parameter is `false`, the method removes a folder only if it does not contain any files.
     * If the parameter is `true`, the method removes non-empty folders as well.
     */
    function DeleteFolder(Path: string, RemoveNonEmpty?: boolean): boolean;
    /** Discards connection to the specified network folder. */
    function DisconnectNetworkDrive(Name: string, Force: boolean, Remember: boolean): int;
    /** Removes the trailing path delimiter from the specified path. */
    function ExcludeTrailingBackSlash(PathToFolder: string): string;
    /** Indicates whether the specified drive, folder or file exists. */
    function Exists(Path: string): boolean;
    /** Converts the given relative file name into a fully qualified path name. */
    function ExpandFileName(InPath: string): string;
    /** Converts the given relative file name into a fully qualified path name using Universal Naming Convention. */
    function ExpandUNCFileName(InPath: string): string;
    /** Searches a folder for files matching the specified pattern. */
    function FindFiles(Path: string, SearchPattern: string, SearchInSubDirs?: boolean /* false */): TestComplete.aqObjIterator<TestComplete.aqFileInfo>;
    /** Searches a folder for subfolders matching the specified pattern. */
    function FindFolders(Path: string, SearchPattern: string, SearchInSubDirs?: boolean /* false */): TestComplete.aqObjIterator<TestComplete.aqFolderInfo>;
    /** Returns the fully qualified name of the current folder. */
    function GetCurrentFolder(): string;
    /** Retrieves detailed information about the specified drive volume. */
    function GetDriveInfo(Drive: string): TestComplete.aqDriveInfo;
    /** Extracts the drive part from the specified path. */
    function GetFileDrive(PathToFile: string): string;
    /** Returns the extension part of the specified path. */
    function GetFileExtension(PathToFile: string): string;
    /** Extracts the folder path from the full path. */
    function GetFileFolder(PathToFile: string): string;
    /** Returns an aqFileInfo object that provides information about the specified file. */
    function GetFileInfo(Path: string): TestComplete.aqFileInfo;
    /** Returns the name and extension parts of the specified path. */
    function GetFileName(PathToFile: string): string;
    /** Returns the file name, which is part of the specified path, without the extension. */
    function GetFileNameWithoutExtension(PathToFile: string): string;
    /** Returns an aqFolderInfo object that provides information about the specified folder. */
    function GetFolderInfo(Path: string): any;
    /** Converts a fully qualified path name into a relative path name. */
    function GetRelativePath(CurrentFolder: string, AbsoluteFileName: string): string;
    /** Returns the given path in the short 8.3 format. */
    function GetShortPathName(longPath: string): string;
    /** Ensures that the specified path ends with a trailing path delimiter. */
    function IncludeTrailingBackSlash(PathToFolder: string): string;
    /** Establishes connection to the specified network folder. */
    function MapNetworkDrive(LocalName: string, Path: string, User: string, Password: string, Remember: boolean): int;
    /** Moves the specified file(s) to a new location. */
    function MoveFile(PathToExistingFile: string, PathToNewFile: string, RenameOnCollision?: boolean /* true */): boolean;
    /** Moves the specified folder(s) to another location. */
    function MoveFolder(Source: string, Destination: string, RenameOnCollision?: boolean /* true */): boolean;
    /** Renames the specified file. */
    function RenameFile(OldPath: string, NewPath: string, RenameOnCollision?: boolean /* true */): boolean;
    /** Renames the specified folder or moves it to another folder. */
    function RenameFolder(OldPath: string, NewPath: string): boolean;
    /** Sets the specified folder as the current folder. */
    function SetCurrentFolder(DirStr: string): boolean;
}

/** Provides unified methods for converting between various data types. */
declare namespace aqConvert {
    /**
     * Converts a currency value to a string using the specified format settings.
     * @param C Specifies the currency value to be converted to a string.
     * @param iNumDigits Specifies the number of digits after the decimal point.
     * If the value has fewer digits after the point, trailing zeros are added.
     * Set this parameter to `-1` in order to use the default number of digits
     * after the decimal point that is specific to the current locale.
     * @param iLncLead Specifies whether to add leading digits to broken numbers.
     * The acceptable values are `0` (`false`), `-1` (`true`) and `-2` (use a system value specific to the locale).
     * @param iUseParens Specifies whether to hide the minus sign and enclose negative numbers in parenthesis.
     * The acceptable values are `0` (`false`), `-1` (`true`) and `-2` (use a system value specific to the locale).
     * @param iGroup Specifies whether to use thousand separators and group the resulting value by thousands.
     * The acceptable values are `0` (`false`), `-1` (`true`) and `-2` (use a system value specific to the locale).
     */
    function CurrencyToFormatStr(C: any, iNumDigits: int, iLncLead: 0 | -1 | -2 | boolean, iUseParens: 0 | -1 | -2 | boolean, iGroup: 0 | -1 | -2 | boolean): string;
    /** Converts a currency value to a string. */
    function CurrencyToStr(C: TestComplete.Currency): string;
    /**
     * Converts a Date value to a string whose format is defined by the FormatStr parameter.
     * @param D Specifies the value that contains the desired date and time.
     * @param FormatStr Specifies the format that should be used for the conversion. Can contain"
     * - `%a` - Abbreviated weekday name.
     * - `%A` - Full weekday name.
     * - `%b` - Abbreviated month name.
     * - `%B` - Full month name.
     * - `%c` - Date and time representation appropriate for locale. If the `#` flag (`%#c`) precedes the specifier, long date and time representation is used.
     * - `%d` - Day of month as a decimal number (01 – 31). If the `#` flag (`%#d`) precedes the specifier, the leading zeros are removed from the number.
     * - `%H` - Hour in 24-hour format (00 – 23). If the `#` flag (`%#H`) precedes the specifier, the leading zeros are removed from the number.
     * - `%I` - Hour in 12-hour format (01 – 12). If the `#` flag (`%#I`) precedes the specifier, the leading zeros are removed from the number.
     * - `%j` - Day of year as decimal number (001 – 366). If the `#` flag (`%#j`) precedes the specifier, the leading zeros are removed from the number.
     * - `%m` - Month as decimal number (01 – 12). If the `#` flag (`%#m`) precedes the specifier, the leading zeros are removed from the number.
     * - `%M` - Minute as decimal number (00 – 59). If the `#` flag (`%#M`) precedes the specifier, the leading zeros are removed from the number.
     * - `%p` - Current locale's A.M./P.M. indicator for 12-hour clock.
     * - `%S` - Second as decimal number (00 – 59). If the `#` flag (`%#S`) precedes the specifier, the leading zeros are removed from the number.
     * - `%U` - Week of year as decimal number, with Sunday as first day of week (00 – 53). If the `#` flag (`%#U`) precedes the specifier, the leading zeros are removed from the number.
     * - `%w` - Weekday as decimal number (0 – 6; Sunday is 0). If the `#` flag (`%#w`) precedes the specifier, the leading zeros are removed from the number.
     * - `%W` - Week of year as decimal number, with Monday as first day of week (00 – 53). If the `#` flag (`%#W`) precedes the specifier, the leading zeros are removed from the number.
     * - `%x` - Date representation for current locale. If the `#` flag (`%#x`) precedes the specifier, long date representation is enabled.
     * - `%X` - Time representation for current locale.
     * - `%y` - Year without century, as decimal number (00 – 99). If the `#` flag (`%#y`) precedes the specifier, the leading zeros are removed from the number.
     * - `%Y` - Year with century, as decimal number. If the `#` flag (`%#Y`) precedes the specifier, the leading zeros are removed from the number.
     * - `%z` - %Z 	Either the time-zone name or time zone abbreviation, depending on registry settings; no characters if time zone is unknown.
     * - `%%` - Percent sign.
     * */
    function DateTimeToFormatStr(D: TestComplete.DateTime, FormatStr: string): string;
    /** Converts a date value to a string. */
    function DateTimeToStr(D: TestComplete.DateTime): string;
    /** Converts a floating-point value to a string. */
    function FloatToStr(F: float): string;
    /** Converts a number to a string. */
    function IntToStr(Int: int): string;
    /** Converts the specified string to a currency value. */
    function StrToCurrency(S: string): TestComplete.Currency;
    /** Converts the specified string to a date value. */
    function StrToDate(S: string): TestComplete.DateTime;
    /** Converts the specified string to a date/time value. */
    function StrToDateTime(S: string): TestComplete.DateTime;
    /** Converts the specified string to a floating-point value. */
    function StrToFloat(S: string): float;
    /** Converts the specified string to an integer value. */
    function StrToInt(S: string): int;
    /** Converts the specified string to a long integer value. */
    function StrToInt64(S: string): bigint;
    /** Converts the specified string to a time value. */
    function StrToTime(S: string): TestComplete.DateTime;
    /** Converts a date/time value to the number of passed days, hours, minutes and seconds. */
    function TimeIntervalToStr(Interval: TestComplete.DateTime): string;
    /** Converts the specified variant value to Boolean value. */
    function VarToBool(V: TestComplete.Variant): boolean;
    /** Converts the specified variant value to floating-point value. */
    function VarToFloat(V: TestComplete.Variant): number;
    /** Converts the specified variant value to an integer value. */
    function VarToInt(V: TestComplete.Variant): int;
    /** Converts the specified variant value to a string. */
    function VarToStr(V: TestComplete.Variant): string;
}

declare namespace Aliases {
    /**
     * Pauses the test execution until the specified object property
     * achieves the specified value or until the specified timeout elapses
     * @param {int} [WaitTime = -1] The number of milliseconds to wait for the specified property value.
     * If WaitTime is 0, the method does not wait and returns immediately.
     * If WaitTime is -1, the waiting time is specified by the Auto-wait timeout project property.
     *
     * @returns If the property achieves the specified value within the timeout, the method returns `true`.
     * Otherwise, if the timeout elapses before the property achieves the specified value, the method returns `false`.
     * Also, `false` if the object does not have the specified property.
     */
    function WaitProperty(PropertyName: string, PropertyValue: TestComplete.Variant, WaitTime?: int): boolean;

    /**
     * Use the `WaitAliasChild` method to delay the test execution until the object
     * specified by its alias appears in the system or until the specified time limit is reached.
     * If the specified object is found, the method returns it;
     * otherwise it returns an "empty" stub object that only has the `Exists` property.
     *
     * @param ChildName The alias of the desired child object, as it is defined
     * in the Aliases section of the NameMapping editor. This alias must be a child item of the AliasObj in the Aliases tree.
     *
     * NOTE: The alias is always case-insensitive, in spite of the value of the Use case-sensitive parameters project option.
     *
     * @param WaitTime The time period, in milliseconds, to wait until the specified object becomes available.
     * If WaitTime is `0`, the method searches for the specified object once and returns immediately.
     * If WaitTime is `-1`, the waiting time is specified by the Auto-wait timeout project setting.
     */
    function WaitAliasChild(ChildName: string, WaitTime?: int): TestComplete.RuntimeObject | { readonly Exists: false };
}

/*
 * Declarations
 * These allow you to use TestComplete keywords in TypeScript, e.g.
 *     var today = aqDateTime.Today()
 */

// declare const Aliases: TestComplete.Aliases
declare const aqDateTime: TestComplete.aqDateTime;
declare const aqEnvironment: TestComplete.aqEnvironment;
declare const aqPerformance: TestComplete.aqPerformance;
declare const aqTestCase: TestComplete.aqTestCase;
declare const Browsers: TestComplete.Browsers;
/** Provides symbolic names for the TestComplete global constants . The descriptions for the constants are given in the descriptions of those methods where the corresponding constants are applied. */
declare const Consts: TestComplete.Consts;
declare const DDT: TestComplete.DDT;
/** Provides a scripting interface used to change the text or visibility of the TestComplete indicator. */
declare const Indicator: TestComplete.Indicator;
declare const JavaClasses: TestComplete.JavaClasses;
/**
 * Provides a test log structure that can hold text messages, images, files and file links generated from tests.
 * The test log, which you can view via the Test Log, can store its items as a plain list
 * or have them organized as a tree whose nodes are folders that can include test log items and other folders.
 */
declare const Log: TestComplete.Log;

/** Name mapping */
declare namespace NameMapping {
    var TimeOutWarning: boolean;
    var ConfigurationCount: int;
    var CurrentConfigurationName: string;
    function ConfigurationNames(Index: int): any;
}

declare const Options: TestComplete.Options;
// declare const Project: TestComplete.Project;
declare const ProjectSuite: TestComplete.ProjectSuite;
declare const Runner: TestComplete.Runner;
declare const slPacker: TestComplete.slPacker;
declare const Storages: TestComplete.Storages;
/**
 * The Sys object "represents"”" the system in your tests -- everything outside TestComplete.
 * Its methods and properties allow you to control test execution, interact with active windows, simulate key presses, and so on.
 */
declare const Sys: TestComplete.Sys;
declare const Utils: TestComplete.Utils;
declare const DBTables: TestComplete.DBTables;
declare const Files: TestComplete.Files;
declare const Objects: TestComplete.Objects;
declare const Regions: TestComplete.Regions;
declare const Tables: TestComplete.Tables;
declare const WebTesting: TestComplete.WebTesting;
declare const XML: TestComplete.XML;

/**
 * Delays the test execution for the specified time period in milliseconds.
 *
 * @deprecated: Use `aqUtils.Delay` instead
 */
declare function Delay(count: int): void;

/**
 * @deprecate Use `aqObject.CheckProperty` instead
 */
declare function CheckProperty(
    Object: TestComplete.RuntimeObject,
    Property: string,
    Condition: int,
    Value: any,
    CaseSensitive?: boolean): boolean;

/**
 * Use the getActiveXObject function to get a reference to an OLE object
 * by its name and the name of the machine where it is running.
 * To specify the OLE server running on a local machine, do not specify the MachineName parameter.
 */
declare function getActiveXObject(OleObject: string, MachineName?: string): any;
/**
 * Creates a set of the given members.
 * Sets in TestComplete are implemented as collections of bits, similar to Standard Pascal.
 * @param Params Specifies the member names or member values to be contained in the set.
 * NOTE: A set can have no more than 32 members.
 */
declare function MkSet(...Params: any): TestComplete.Set;
/** Checks whether a particular set has a definite member. */
declare function InSet(Member: any, SetName: TestComplete.Set): boolean;

/**
 * Compares two expressions to determine if they are equal, and returns true or false.
 * If the compared expressions are not of the same type, TestComplete attempts
 * to convert them to the same type (such as string, number, or boolean)
 * before the comparison.
 */
declare function equal(a: TestComplete.Variant, b: TestComplete.Variant): boolean;
