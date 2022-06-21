import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import DragonRenderer from "./components/dragonRenderer";
import _color from "./assets/images/bg/9.png";

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);

  console.log(data);

  const mintDragon = (_account, _name) => {
    setLoading(true);
    blockchain.dragonAge.methods
      .createRandomDragon(_name)
      .send({
        from: _account,
        value: blockchain.web3.utils.toWei("0.01", "ether"),
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };

  const levelUpDragon = (_account, _id) => {
    setLoading(true);
    blockchain.dragonAge.methods
      .levelUp(_id)
      .send({
        from: _account,
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      });
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.dragonAge !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.dragonAge]);
  return (
    <s.Screen image={_color}>
      {blockchain.account === "" || blockchain.dragonAge === null ? (
        <s.Container
          flex={1}
          ai={"center"}
          jc={"center"}
          style={{ backgroundColor: "green" }}
        >
          <s.TextTitle>Connect To The Game</s.TextTitle>
          <s.SpacerSmall></s.SpacerSmall>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            Connect
          </button>
        </s.Container>
      ) : (
        <s.Container
          ai={"center"}
          style={{
            padding: "24px",
          }}
        >
          <s.TextTitle>Welcome To The Game</s.TextTitle>
          <s.SpacerSmall></s.SpacerSmall>
          <button
            disabled={loading ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              mintDragon(blockchain.account, "Unknown");
            }}
          >
            CREATE DRAGON
          </button>
          <s.SpacerMedium></s.SpacerMedium>
          <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }}>
            {data.allDragons.map((item, index) => {
              return (
                <s.Container key={index} style={{ padding: "15px" }}>
                  <DragonRenderer dragon={item}></DragonRenderer>
                  <s.SpacerXSmall></s.SpacerXSmall>
                  <s.Container>
                    <s.TextDescription>ID : {item.id}</s.TextDescription>
                    <s.TextDescription>DNA : {item.dna}</s.TextDescription>
                    <s.TextDescription>LEVEL : {item.level}</s.TextDescription>
                    <s.TextDescription>NAME : {item.name}</s.TextDescription>
                    <s.TextDescription>
                      RARITY : {item.rarity}
                    </s.TextDescription>
                    <s.SpacerXSmall></s.SpacerXSmall>
                    <button
                      disabled={loading ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        levelUpDragon(blockchain.account, item.id);
                      }}
                    >
                      Level Up
                    </button>
                  </s.Container>
                </s.Container>
              );
            })}
          </s.Container>
        </s.Container>
      )}
    </s.Screen>
  );
}

export default App;
