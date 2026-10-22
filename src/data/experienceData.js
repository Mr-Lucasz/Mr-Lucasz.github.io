import levvaLogo from "../../src/assets/levva_logo.png";
import iatecLogo from "../../src/assets/iatec_logo.png";
import beesLogo from "../../src/assets/bees_logo.png";
import cognyteLogo from "../../src/assets/cognyte_logo.png";
import youdevelopLogo from "../../src/assets/you_logo.png";

export function getExperienceData(t) {
  const logos = [levvaLogo, iatecLogo, beesLogo, youdevelopLogo, cognyteLogo, cognyteLogo];
  const list = t("experiences_list", { returnObjects: true });
  return list.map((exp, idx) => ({
    ...exp,
    logo: logos[idx]
  }));
}
