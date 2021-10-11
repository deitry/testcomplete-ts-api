/**
 * Type declaration for WPF and .NET objects
 */

declare namespace System {
    interface Object {
        ToString(): string;
    }
}

declare namespace System.Windows.Controls {
    interface ItemCollection<T extends Object> extends Object {
        Count: int;
        CurrentItem: T;
        CurrentPosition: int;
        readonly IsEmpty: boolean;

        GetItemAt(index: int): T;
        IndexOf(item: T): int;
    }
}
