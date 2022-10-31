export default function clearQuotes(str: string) {
    for (const l of str) {
        if (l === `"`) {
            const index = str.indexOf(l)
            str = str.slice(0, index) + str.slice(index + 1)
        }
    }
    str = str[0].toUpperCase() + str.slice(1)
    return str
}