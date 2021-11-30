export const getRandomColor = () => {
  const RGB = [];
  for (let i = 0; i < 3; i++) {
    const randomNum = Math.floor(Math.random() * 256);
    RGB.push(randomNum);
  }
  /*----------- text color and background color contrast problem--------------*/

  //   let isDark = false;
  //   if (RGB[0] * 0.299 + RGB[1] * 0.578 + RGB[2] * 0.114 >= 192) {
  //     const isDark = false;
  //   } else {
  //     const isDark = true;
  //   }

  const color = "rgb(" + RGB[0] + "," + RGB[1] + "," + RGB[2] + ")";

  return color;
};
