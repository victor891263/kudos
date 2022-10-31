export default function calcTime(dateTime: string) {
    let time = (new Date().getTime() - new Date(dateTime).getTime())/1000;
    if (time < 60) return "Now";

    time = time / 60;
    if (time < 60) return `${Math.floor(time)}min`;

    time = time / 60;
    if (time < 24) return `${Math.floor(time)}h`;

    time = time / 24;
    return `${Math.floor(time)}d`;
}