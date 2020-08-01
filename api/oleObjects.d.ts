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

    interface OleShell {
        Exec(command: string): OleShellResult;
    }

    type OleObject = OleHttpObject & OleShell;
}
