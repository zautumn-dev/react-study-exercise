function Pizza(props) {
  console.log(props);
  return (
    <li className={["pizza", props.soldOut && "sold-out"].join(" ")}>
      <img src={props.photoName} alt="这是一张披萨照片" />
      <h3>{props.name}</h3>
      <p>{props.ingredients}</p>
      <span>{props.price}</span>
    </li>
  );
}

export default Pizza;
