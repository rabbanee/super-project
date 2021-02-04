export const showAlert = (alert) => {
  return {
    type: 'SHOW_ALERT',
    alert,
  }
}

export const closeAlert = () => {
  return {
    type: 'CLOSE_ALERT'
  }
}