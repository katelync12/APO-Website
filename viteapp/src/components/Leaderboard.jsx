const Leaderboard = ({ data, title }) => {
  // Sort the data by total (descending) and then by name (alphabetically) in case of ties
  const sortedData = data.sort((a, b) => {
    if (b.total === a.total) {
      return a.name.localeCompare(b.name);
    }
    return b.total - a.total;
  });

  const columnHeaderStyles =
    "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-base font-bold text-gray-900 tracking-wider";

  const cellStyles = "px-5 py-2 border-b border-gray-200 text-base";

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal text-black">
          <thead>
            <tr>
              <th className={`${columnHeaderStyles} text-left`}>Rank</th>
              <th className={`${columnHeaderStyles} text-center`}>Member</th>
              <th className={`${columnHeaderStyles} text-left`}>Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-sky-50"}
              >
                <td className={`${cellStyles} text-center w-1/8`}>
                  #{index + 1}
                </td>
                <td className={`${cellStyles} text-left w-3/4`}>{item.name}</td>
                <td className={`${cellStyles} text-center w-1/8`}>
                  {item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
