export default function useSocketOperation(
    callback: (onError: (res: { data: any, error: string }) => void) => void,
    successCallback: () => void,
    operation: { running: boolean, error: string }
) {
    operation.error = ''
    operation.running = true
    callback(response => {
        operation.running = false
        if (response.data) successCallback()
        if (response.error) operation.error = response.error
    })
}