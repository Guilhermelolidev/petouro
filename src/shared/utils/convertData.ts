export const convertData = (date: Date) => {
    const newDate = new Date(date)
    return new Date(newDate.toISOString().split('T')[0])
}