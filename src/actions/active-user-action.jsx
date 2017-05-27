export function setUserInfo(info) {
  return {
    type: 'SET_USER_INFO',
    payload: info
  }
}

export function setRole(role) {
  return {
    type: 'SET_ROLE',
    payload: role
  }
}