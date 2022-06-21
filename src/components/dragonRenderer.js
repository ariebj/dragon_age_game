import React from "react";
// cards
import { parts } from "../parts/parts";
import _r1 from "../assets/images/rarity/_rarity_1.png";
import _r2 from "../assets/images/rarity/_rarity_2.png";
import _r3 from "../assets/images/rarity/_rarity_3.png";

const DragonRenderer = ({ dragon = null, size = 200, style }) => {
  if (!dragon) {
    return null;
  }
  let rarity = _r1;

  if (dragon.rarity >= 80) {
    rarity = _r2;
  }
  if (dragon.rarity >= 95) {
    rarity = _r3;
  }

  let dnaStr = String(dragon.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  let dragonDeatils = {
    bg: dnaStr.substring(0, 2) % 15,
    body: dnaStr.substring(2, 4) % 20,
    eyes: dnaStr.substring(4, 6) % 20,
    face: dnaStr.substring(6, 8) % 20,
    acc: dnaStr.substring(8, 10) % 17,
    name: dragon.name,
  };

  const dragonStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
        background: "blue",
        position: "relative",
        ...style,
      }}
    >
      <img alt={"bg"} src={parts.bg[dragonDeatils.bg]} style={dragonStyle} />
      <img
        alt={"body"}
        src={parts.body[dragonDeatils.body]}
        style={dragonStyle}
      />
      <img
        alt={"eyes"}
        src={parts.eyes[dragonDeatils.eyes]}
        style={dragonStyle}
      />
      <img alt={"acc"} src={parts.acc[dragonDeatils.acc]} style={dragonStyle} />
      <img alt={"rarity"} src={rarity} style={dragonStyle} />
    </div>
  );
};

export default DragonRenderer;
