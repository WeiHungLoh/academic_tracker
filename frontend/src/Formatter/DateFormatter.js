const DateFormatter = (dueDate) => {
    const date = new Date(dueDate)

    const formattedDate = date.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })

    // Returns the remaining time in ms
    const dateDiff = date - Date.now()

    if (dateDiff <= 0) {
        return { formattedDate, timeRemaining: 'Past due' }
    }

    const seconds = Math.floor(dateDiff / (1000))
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    const remainingHours = hours % 24
    const remainingMinutes = minutes % 60
    const timeRemaining = `${days} days ${remainingHours} hours ${remainingMinutes} minutes`

    return { formattedDate, timeRemaining }
}

export default DateFormatter
