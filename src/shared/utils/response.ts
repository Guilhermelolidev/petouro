const retSuccessBody = (message: string, data: unknown) => ({
    statusCode: 200,
    message,
    data
})

const retSuccess = (message: string) => ({
    statusCode: 200,
    message
})

export {
    retSuccess,
    retSuccessBody
}