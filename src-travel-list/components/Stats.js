export default function Stats({ state }) {
  //
  //               ""
  //

  return (
    <footer className="stats">
      <em>
        {state.itemNum > 0
          ? ` 💼 You have ${state.itemNum} items on your list, and you already packed ${state.packedNum} (${state.packedScale}%)`
          : "You got everything! Ready to go ✈️"}
      </em>
    </footer>
  );
}
