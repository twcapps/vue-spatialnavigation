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
    constructor();
    setupKeyBoardEvents(): void;
    setupMouseEvents(): void;
    private findFocusable(target);
    private spatialNavigationAction(action);
    registerFocusElement(focusElement: FocusElement): void;
    deRegisterFocusElement(focusElement: FocusElement): void;
    getFocusElementInFocus(): FocusElement | undefined;
    getFocusElementById(id: string): FocusElement | undefined;
    getFocusElementIsDefault(): FocusElement | undefined;
    blurAllFocusElements(): void;
}
