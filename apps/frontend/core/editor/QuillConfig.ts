import Quill, { Delta, Range, type EmitterSource, type QuillOptions } from 'quill'
export class QuillConfig {
    quillInstance: Quill
    constructor(quillInstance: Quill) {
        this.quillInstance = quillInstance
        this.initPasteEvent();
    }

    initPasteEvent() {
        // this.quillInstance.clipboard.addMatcher(Node.TEXT_NODE, (node, delta) => {
        //     console.log("粘贴文本", delta);
        //     return delta
        // });
        // this.quillInstance.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        //     console.log("ELEMENT_NODE");
        //     return delta
        // });
        this.quillInstance.root.addEventListener('paste', this.onCapturePaste)

    }

    onCapturePaste(e: any) {
        console.log(1);

        // if (e.defaultPrevented || !this.quillInstance.isEnabled()) return;
        console.log(2);

        e.preventDefault();
        console.log(3);

        const html = e.clipboardData.getData('text/html');
        const text = e.clipboardData.getData('text/plain');
        const files = Array.from(e.clipboardData.files || []);
        if (!html && files.length > 0) {
            console.log(1100);
        } else {
            console.log(1200);
        }
    }
}
