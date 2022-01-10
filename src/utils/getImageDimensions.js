export default async function getImageDimensions(file) {
    return new Promise((resolved) => {
        const i = new Image()
        i.onload = () => {
            resolved({
                w: i.width,
                h: i.height,
            })
        }
        i.src = file
    })
}
