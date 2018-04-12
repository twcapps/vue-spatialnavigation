import { NavigationService } from "./navigation.service";
import { VNode } from "vue";
export declare let navigationService: NavigationService;
export declare class FocusElement {
    static AutoFocus: string;
    private _$el;
    private _left;
    private _right;
    private _up;
    private _down;
    private _listeners;
    id: string;
    isFocus: boolean;
    isSelect: boolean;
    isDefault: boolean;
    constructor(vnode: VNode);
    destroy(): void;
    readonly $el: any;
    focus(): void;
    blur(): void;
    select(): void;
    deSelect(): void;
    left(): void;
    right(): void;
    up(): void;
    down(): void;
    enter(): void;
    private defaultFocusNext();
    private defaultFocusPrevious();
    private doFocusElement(id);
}
declare const _default: {
    install: (Vue: any, options: {
        [key: string]: number | number[];
    } | undefined) => void;
};
export default _default;
