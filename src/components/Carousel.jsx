import { useEffect, useState } from "react";
import { shortList, longList, list } from "../data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Carousel = () => {
  const [displayedList, setDisplayedList] = useState(list);
  const [currentPerson, setCurrentPerson] = useState(0);

  const handleChange = (indicator) => {
    let newIndex;
    if (indicator === "prev") {
      newIndex =
        currentPerson === 0 ? displayedList.length - 1 : currentPerson - 1;
    } else if (indicator === "next") {
      newIndex =
        currentPerson === displayedList.length - 1 ? 0 : currentPerson + 1;
    }
    setCurrentPerson(newIndex);
  };

  useEffect(() => {
    let sliderId = setInterval(() => {
      handleChange("next");
    }, 2000);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentPerson]);
  return (
    <section className="slider-container">
      {displayedList.map((person, personIndex) => {
        const { name, title, quote, image } = person;
        return (
          <div
            key={name}
            className="slide"
            style={{
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? "visible" : "hidden",
            }}
          >
            <img className="person-img" src={image} alt="name" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </div>
        );
      })}

      <button
        onClick={() => {
          handleChange("prev");
        }}
        className="prev"
      >
        <FiChevronLeft />
      </button>
      <button
        onClick={() => {
          handleChange("next");
        }}
        className="next"
      >
        <FiChevronRight />
      </button>
    </section>
  );
};
export default Carousel;
