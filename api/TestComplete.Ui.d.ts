/*
 * UI Element types
 */

declare namespace TestComplete {

    interface Button extends Element {
        /** Method will not act on objects that are not buttons */
        ClickButton(): void;
    }

    interface Menu {
        /** Returns the number of items in the specified Menu control. This number includes menu separators. */
        Count: int;
        /**
         * The Menu.Items property returns a MenuItem object that provides access to the menu item specified by its index.
         *
         * If you specify an item by its name, TestComplete will treat this name as case-sensitive
         * or case-insensitive according to the Use case-sensitive parameters project property.
         * You can use wildcards (`*` and `?`) in item names, where the asterisk
         * corresponds to a string of any length and the question mark - to any single character.
         */
        Items(Item: string | int): MenuItem;
        /**
         * Specifies the item you want to click.
         * Submenu items should be specified by the "full path" starting from the top-level menu.
         * To separate items in the "path", use the vertical character (`"|"`).
         * @example
         * w.MainMenu.Click("View|Show Toolbar")
         */
        Click(Item: string | int): void;
        /** Checks or unchecks the specified menu or submenu item. */
        Check(Item: string | int, Checked: boolean): void;
        /** Closes the menu. */
        Close(): void;
        /**
         * Places the mouse pointer over a menu or submenu item.
         * Unlike `Click`, Select does not perform a click on the menu item.
         *
         * Submenu items should be specified by the "full path" starting from the top-level menu.
         * To separate items in the "path", use the vertical character (`"|"`).
         * If you use the index in the path, put the index number in brackets.
         *
         * @example
         * w.MainMenu.Select("View|Show Toolbar")
         * w.MainMenu.Select("Edit|[1]|[0]")
         */
        Select(Item: Variant): void;
    }

    interface Edit extends Element {
        Text: string;

        Clear(): void;
        SetText(text: string): void;
    }

    interface Dialog extends Window {
        /** NOTE: not all dialogs support this */
        OpenFile(path: string, FileType?: any /* -1 */): void;
        /** NOTE: not all dialogs support this */
        SaveFile(path: string): void;
    }

    interface List extends Element {
        SelectItem(Item: any): void;
    }

    interface ComboBox extends Element {
        ClickItem(Item: any): void;
        DropDown(): void;

        SelectItemWithValue(name: string, val: any): void;
    }

    interface List extends Element { }
    interface Control extends Element { }
    interface Form extends Window { }
    interface PageTab extends Window { }
    interface Text extends Element {
        Caption: string;
    }
    interface ProgressBar extends Element { }
    interface Link extends Element { }
    interface Popup extends Menu { }
    interface Static extends Element { }
    interface Panel extends Element { }
    interface Pane extends Element { }
    interface TitleBar extends Element { }
    interface RadioButton extends Button { }
    interface RadioButton extends Button { }
    interface MenuItem extends Element {
        /** Returns the caption of the menu item. */
        Caption: string;
        /** Returns `true` if the menu item is checked. Otherwise - `false`. */
        Checked: boolean;
        /** Returns `true` if the menu item is enabled. Otherwise - `false`. */
        Enabled: boolean;
        /** Returns the identifier of the menu item. */
        Id: int;
        /** Returns `true` if the MFT_BITMAP constant is in the menu item type. Otherwise - `false`. */
        IsBitmap: boolean;
        /** Returns `true` if the MFT_OWNERDRAW constant is in the menu item type. Otherwise - `false`. */
        IsOwnerdraw: boolean;
        /** Returns `true` if the menu item is checkable. Otherwise - `false`. */
        IsRadioCheck: boolean;
        /** Returns `true` if the menu item is a separator. Otherwise - `false`. */
        IsSeparator: boolean;
        /** Returns the item's position (index) in the menu. */
        Position: int;
        /** Returns this sub menu as a Menu object. */
        SubMenu: Menu;
    }
    interface ListItem extends Element { }
    interface ToolWindow extends Element { }
    interface CheckBox extends Button { }
    interface ToolBar extends Element { }
    interface MenuBar extends Element {
        /** Get item */
        MenuItem(Item: string | int): MenuItem;
    }
    interface SplitButton extends Button { }
    interface RibbonItemControl extends Control { }
    interface RevitRibbonControl extends Control { }
    interface ContentPresenter extends Element { }
    interface TextBlock extends Element { }
    interface MainWindow extends Window { }
    interface TabItem extends Element { }
    interface MenuControl extends Element { }
    interface GroupItem extends Element { }
    interface DatePicker extends Element { }
    interface ListBoxItem extends Element { }
    interface Label extends Element { }
    interface RichEdit20W extends Edit { }
    interface StackPanel extends Panel { }
    interface ImageButton extends Button { }
    interface ThreadExceptionDialog extends Dialog { }
    interface MarkersWindow extends Window { }
    interface SheetsWindow extends Window { }
    interface ReportingWindow extends Window { }
    interface SharingControlWindow extends Window { }
    interface AccountControl extends Window { }
    interface ExportWindow extends Window { }
    interface ClashesWindow extends Window { }
    interface MarkersDialogLogin extends Dialog { }
    interface TreeView extends Element {
        ExpandItem(Item: any): void;
        ClickItem(Item: string, Shift?: int /* skNoShift */): void;
        DblClickItem(Item: string, Shift?: int /* skNoShift */): void;
    }
}
