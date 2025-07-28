
const isshow = ref(false);
const text = ref('');

export const useSearchModal = () => {

    function init() {
        onKeyStroke('Escape', () => {
            if (isshow.value) useSearchModal().closeModal();
        }, { dedupe: true });
    }

    function openModal() {
        isshow.value = true;
    }

    function closeModal() {
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

