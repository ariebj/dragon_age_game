// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let allDragons = await store
        .getState()
        .blockchain.dragonAge.methods.getDragons()
        .call();
      let allOwnerDragons = await store
        .getState()
        .blockchain.dragonAge.methods.getOwnerDragons(account)
        .call();

      dispatch(
        fetchDataSuccess({
          allDragons,
          allOwnerDragons,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
