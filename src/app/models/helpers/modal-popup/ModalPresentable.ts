export interface ModalPresentable {
    // If your modal requires an input, it should be provided with this variable
    argument: any;
    // When you want the modal to close, call this callback fn
    onClose: () => void;
}
