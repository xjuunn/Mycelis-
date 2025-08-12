import Quill, { type QuillOptions } from "quill";

export class CustomQuill extends Quill {
    constructor(container: HTMLElement | string, options?: QuillOptions) {
        super(container, options);
    }
}