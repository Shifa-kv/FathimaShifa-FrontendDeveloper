// action for storing rocket data
const addCapsules = (capsules) => ({
  type: 'ADD_CAPSULES',
  payload: capsules,
});
const setLoading = (isLoading) => ({
  type: 'SET_LOADING',
  payload: isLoading,
});
export { addCapsules,setLoading }