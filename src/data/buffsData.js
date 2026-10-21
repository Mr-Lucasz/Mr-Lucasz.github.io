import tdcStage from "../assets/buff-tdc-stage.jpg";
import tdcPanel from "../assets/buff-tdc-panel.jpg";
import semeso from "../assets/buff-semeso.jpg";

const images = [tdcStage, tdcPanel, semeso];

export function getBuffsData(t) {
  const list = t("buffs_list", { returnObjects: true });
  return list.map((item, idx) => ({
    ...item,
    image: images[idx],
  }));
}
