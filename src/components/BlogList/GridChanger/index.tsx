import { ReactComponent as GridIcon } from "../../../assets/img/grid.svg";
import { ReactComponent as ListIcon } from "../../../assets/img/list.svg";

import "./styles.scss";

interface Props {
  handleGridChange: (isGridView: boolean) => void;
  isGridView: boolean;
}

const GridChanger = ({ handleGridChange, isGridView }: Props) => {
  return (
    <div className="grid-changer">
      <button
        onClick={() => handleGridChange(false)}
        className={`grid-changer__button ${
          !isGridView ? "grid-changer__button--active" : ""
        }`}
      >
        <ListIcon />
      </button>
      <button
        onClick={() => handleGridChange(true)}
        className={`grid-changer__button ${
          isGridView ? "grid-changer__button--active" : ""
        }`}
      >
        <GridIcon />
      </button>
    </div>
  );
};

export default GridChanger;
