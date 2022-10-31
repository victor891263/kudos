export default async function useSubmit(callback: () => Promise<void>, operation: { running: boolean, error: string }) {
    operation.error = ''
    operation.running = true
    try {
        await callback()
    } catch (error: any) {
        operation.error = (error.response && error.response.data) || error.message || 'Unknown error occurred'
    }
    operation.running = false
}