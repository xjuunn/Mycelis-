import mitt from 'mitt';
const emitter = mitt();
export const useEmitt = () => {

    return {
        emitter
    }
}