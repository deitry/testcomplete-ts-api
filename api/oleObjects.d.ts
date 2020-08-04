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

    interface OleShellResult {
        Status: int;
        ExitCode: int;
    }

    /**
     * Provides access to the native Windows Shell
     * TestComplete also allows to use a WshShell object instead of the Sys.OleObject(WScript.Shell).
     * Examples:
     * - Run a script: `WshShell.Run("powershell -file C:\\MyScript.ps1");`
     * - Run one command: `WshShell.Run("powershell -command echo Test");`
     */
    interface OleShell {
        /** Retrieves or changes the current active directory. */
        CurrentDirectory: string;
        /** Optional. Specifies the location of the environment variable. */
        Environment(strType: string): WshEnvironment;
        Exec(command: string): OleShellResult;
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
