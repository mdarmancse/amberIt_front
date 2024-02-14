export default function isLastChild(
    arr: Array<unknown>,
    index: number | string
) {
    return arr.length === index + 1
}
