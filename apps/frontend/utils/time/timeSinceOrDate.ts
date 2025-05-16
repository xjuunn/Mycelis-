import timeSince from "./timeSince";

export default function timeSinceOrDate(time: Date | string | undefined) {
    if (!time) return '';
    const date = new Date(time);
    if (Date.now() - new Date(date).getTime() <= 36000000) return timeSince(date);
    if (new Date().toLocaleDateString() === new Date(date).toLocaleDateString())
        return new Date(date).toLocaleTimeString();
    else return new Date(date).toLocaleString();
}
