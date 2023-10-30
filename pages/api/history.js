const history = {
  2023: 4,
  2022: 3,
  2021: 2,
  2020: 5,
  2019: 1,
  2018: 2,
  2017: 6,
};

export default function handler(req, res) {
//   setTimeout(() => {
    res.status(200).json(history);
//   }, 500);
}
