
const isshow = ref(false);
const text = ref('');

export const useSearchModal = () => {

    function init() {
        onKeyStroke('Escape', () => {
            if (isshow.value) {
                useSearchModal().closeModal();
                useEmitt().emitter.emit('search-modal-close');
            }
        }, { dedupe: true });
    }

    function openModal() {
        isshow.value = true;
    }

    function closeModal() {
        text.value = '';
        isshow.value = false;
    }

    function setText(newText: string) {
        text.value = newText;
    }

    return {
        init,
        isshow,
        openModal,
        closeModal,
        setText,
        text
    }
}

