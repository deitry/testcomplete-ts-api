/*
 * Interfaces for used OleObjects.
 * They are merged into single interface so it can be used instead of `any` type
 * when getting OleObject
 */

declare namespace TestComplete {
    interface OleHttpObject {
        readyState: int;
        responseText: string;
        Status: int;
        StatusText: string;
        ResponseBody: string;

        open(method: string, url: string, val: boolean): void;
        send(val?: string): void;
        setRequestHeader(header: string, value: string): void;
    }

    /**
     * Facilitates sequential access to file.
     * @see https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/312a5kbt(v=vs.84)
     */
    interface TextStream {
        /** Returns true if the file pointer is positioned immediately before the end-of-line marker in a TextStream file; false if it is not. */
        readonly AtEndOfLine: boolean;
        /** Returns true if the file pointer is at the end of a TextStream file; false if it is not. */
        readonly AtEndOfStream: boolean;

        /** Closes an open TextStream file. */
        Close(): void;
        /** Reads an entire TextStream file and returns the resulting string. */
        ReadAll(): string;
        /** Reads an entire line (up to, but not including, the newline character) from a TextStream file and returns the resulting string. */
        ReadLine(): string;

        // FIXME: there are more
    }

    /**
     * Provides status information about a script run with Exec along with access to the StdIn, StdOut, and StdErr streams.
     * @see https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/2f38xsxe(v=vs.84)
     */
    interface WshScriptExec {
        /** Provides status information about a script run with the Exec() method.
         * 0 - command is running, 1 - command is finished */
        readonly Status: int;
        /** Returns the exit code set by a script or program run using the Exec() method. */
        readonly ExitCode: int;
        /** The process ID (PID) for a process started with the WshScriptExec object. */
        readonly ProcessID: int;
        readonly StdOut: TextStream;
        /** Exposes the stdin input stream of the Exec object. */
        readonly StdIn: TextStream;
        /** Provides access to the stderr output stream of the Exec object. */
        readonly StdErr: TextStream;
    }

    /**
     * Provides access to the native Windows Shell
     * TestComplete also allows to use a WshShell object instead of the Sys.OleObject(WScript.Shell).
     * Examples:
     * - Run a script: `WshShell.Run("powershell -file C:\\MyScript.ps1");`
     * - Run one command: `WshShell.Run("powershell -command echo Test");`
     *
     * TODO: more methods here: https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/ahcz2kh6(v=vs.84)
     */
    interface OleShell {
        /** Retrieves or changes the current active directory. */
        CurrentDirectory: string;
        /** Optional. Specifies the location of the environment variable. */
        Environment(strType: string): WshEnvironment;
        /** Runs an application in a child command-shell, providing access to the StdIn/StdOut/StdErr streams. */
        Exec(command: string): WshScriptExec;
        /** Returns a SpecialFolders object (a collection of special folders).
         * The WshSpecialFolders object is a collection. It contains the entire set of Windows special folders,
         * such as the Desktop folder, the Start Menu folder, and the Personal Documents folder.
         * The special folder name is used to index into the collection to retrieve the special folder you want.
         * The SpecialFolders property returns an empty string if the requested folder (strFolderName) is not available.
         * @param objWshSpecialFolders The name of the special folder.
         * The following special folders are available:
         * - `AllUsersDesktop`
         * - `AllUsersStartMenu`
         * - `AllUsersPrograms`
         * - `AllUsersStartup`
         * - `Desktop`
         * - `Favorites`
         * - `Fonts`
         * - `MyDocuments`
         * - `NetHood`
         * - `PrintHood`
         * - `Programs`
         * - `Recent`
         * - `SendTo`
         * - `StartMenu`
         * - `Startup`
         * - `Templates`
        */
        SpecialFolders(objWshSpecialFolders?: string): any;
        /**
         * Runs a program in a new process.
         * @param strCommand String value indicating the command line you want to run.
         * You must include any parameters you want to pass to the executable file.
         * @param intWindowStyle Optional. Integer value indicating the appearance of the program's window.
         * Note that not all programs make use of this information.
         * @param bWaitOnReturn Optional. Boolean value indicating whether the script should wait
         * for the program to finish executing before continuing to the next statement in your script.
         * If set to true, script execution halts until the program finishes, and Run returns any error code
         * returned by the program. If set to false (the default), the Run method returns immediately after starting the program, automatically returning 0 (not to be interpreted as an error code
         * @see https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/d5fk67ky(v=vs.84)
         */
        Run(strCommand: string, intWindowStyle?: int, bWaitOnReturn?: boolean): int;
    }

    type OleObject = OleHttpObject & OleShell;
}

interface WshEnvironment {
    /** Exposes a specified item from a collection.
     * @param natIndex Item to retrieve. Item is the default property for each collection.
     * For EnumNetworkDrive and EnumPrinterConnections collections, index is an integer;
     * for the Environment and SpecialFolders collections, index is a string. */
    Item(natIndex: int | string): any;
    /** Returns the number of Windows environment variables on the local computer system (the number of items in an Environment collection). */
    Length: int;
    /** Returns the number of members in an object. */
    Count(): int;
    /**
     * Removes an existing environment variable.
     * The Remove method removes environment variables from the following types of environments: PROCESS, USER, SYSTEM, and VOLATILE.
     * Environment variables removed with the Remove method are not removed permanently; they are only removed for the current session.
     * @param strName String value indicating the name of the environment variable you want to remove.
     */
    Remove(strName: string): void;
}

/** Provides access to the native Windows Shell. It is similar to the Sys.OleObject["WScript.Shell"] object and fully inherits its features. */
declare const WshShell: TestComplete.OleShell;
