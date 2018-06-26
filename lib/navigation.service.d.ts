import { FocusElement } from "./focus.directive";
export declare enum NavigationServiceDirection {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right",
    Enter = "enter",
}
export declare class NavigationService {
    keyCodes: {
        [key: number]: string;
    };
    focusAbleElements: Array<FocusElement>;
    lastElementIdInFocus: string;
    blockAllSpatialNavigation: boolean;
    constructor(keys: {
        [key: string]: number | Array<number>;
    });
    setupKeyBoardEvents(): void;
    setupMouseEvents(): void;
    findFocusable(target: Element): FocusElement | undefined;
    spatialNavigationAction(action: NavigationServiceDirection): void;
    registerFocusElement(focusElement: FocusElement): void;
    deRegisterFocusElement(focusElement: FocusElement): void;
    getFocusElementInFocus(): FocusElement | undefined;
    getFocusElementById(id: string): FocusElement | undefined;
    getFocusElementIsDefault(): FocusElement | undefined;
    blurAllFocusElements(): void;
}
