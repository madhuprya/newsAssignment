const updateState = (oldState, updatedValues) => ({
  ...oldState,
  ...updatedValues,
  loading: false,
});
export default updateState;
