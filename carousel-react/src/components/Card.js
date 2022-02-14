const Card = ({ item }) => {
  const { id, name, profession, description, hobbies, image, active } = item;
  return (
    <div className={`item ${active ? "active" : ""}`} key={id}>
      <div className="image">
        <img src={image} alt={name} />
      </div>
      <div className="info">
        <span className="name">{name}</span>
        <span className="profession">{profession}</span>
        <span className="description">{description}</span>
        {hobbies && (
          <article>
            {hobbies.split(",").map((hobbie) => (
              <span key={hobbie} className="hobbies">
                {hobbie}
              </span>
            ))}
          </article>
        )}
      </div>
    </div>
  );
};

export default Card;
